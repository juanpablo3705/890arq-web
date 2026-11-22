"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { contactSchema, isContactField } from "@/lib/validators";
import { ContactFormPayload, ContactSubmissionPayload } from "@/types/domain";

export interface SendContactResponse {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormPayload, string>>;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 500;
const MIN_FILL_TIME_MS = 1200;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// evita inyeccion de saltos de linea en asunto de correo
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function getClientIp(reqHeaders: Headers): string {
  const cfIp = reqHeaders.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const forwarded = reqHeaders.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return reqHeaders.get("x-real-ip")?.trim() || "unknown";
}

function isSameOriginRequest(reqHeaders: Headers): boolean {
  const fetchSite = reqHeaders.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return false;
  }

  const origin = reqHeaders.get("origin");
  const host = (
    reqHeaders.get("x-forwarded-host") || reqHeaders.get("host")
  )?.toLowerCase();

  if (origin && host) {
    try {
      const originHost = new URL(origin).host.toLowerCase();
      if (originHost !== host) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
}

function isRateLimited(ip: string, now: number): boolean {
  // poda entradas vencidas para evitar crecimiento indefinido en memoria
  if (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
    if (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value;
      if (oldestKey) rateLimitStore.delete(oldestKey);
    }
  }

  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

// valida, filtra spam, respalda en supabase y envia correo con resend
export async function sendContactAction(
  payload: ContactSubmissionPayload
): Promise<SendContactResponse> {
  if (!payload || typeof payload !== "object") {
    return {
      success: false,
      message: "Por favor completa todos los campos obligatorios correctamente.",
    };
  }

  const reqHeaders = await headers();
  if (!isSameOriginRequest(reqHeaders)) {
    return {
      success: false,
      message: "No se pudo validar el origen de la solicitud.",
    };
  }

  // trampa honeypot invisible para descartar bots sin gastar cuota
  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return {
      success: true,
      message: "Mensaje enviado con éxito. Te responderemos a la brevedad.",
    };
  }

  const now = Date.now();
  if (
    typeof payload.startedAt === "number" &&
    (now - payload.startedAt < MIN_FILL_TIME_MS ||
      payload.startedAt > now + 60_000)
  ) {
    return {
      success: false,
      message: "Espera un momento antes de enviar el mensaje.",
    };
  }

  const parsed = contactSchema.safeParse({
    nombre: payload.nombre,
    correo: payload.correo,
    asunto: payload.asunto,
    telefono: payload.telefono,
    comuna: payload.comuna,
    mensaje: payload.mensaje,
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormPayload, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (isContactField(field) && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    const firstError =
      parsed.error.issues[0]?.message ||
      "Por favor completa todos los campos obligatorios correctamente.";

    return {
      success: false,
      message: firstError,
      fieldErrors,
    };
  }

  const clientIp = getClientIp(reqHeaders);
  if (isRateLimited(clientIp, now)) {
    return {
      success: false,
      message:
        "Has enviado demasiados mensajes en poco tiempo. Intenta nuevamente en unos minutos.",
    };
  }

  const data = parsed.data;

  // respaldo en supabase tolerante a fallos
  try {
    await supabase.from("contact_messages").insert({
      nombre: data.nombre,
      correo: data.correo,
      asunto: data.asunto,
      telefono: data.telefono,
      comuna: data.comuna,
      mensaje: data.mensaje,
    });
  } catch {
    // continua con el envio de correo si falla el respaldo en bd
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      message:
        "El servicio de contacto no está disponible en este momento. Intenta por nuestros canales directos.",
    };
  }

  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL || "contacto@890arq.cl";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "890 ARQ Web <onboarding@resend.dev>";

  const htmlContent = `
    <div style="font-family: 'Courier New', Courier, monospace; color: #000000; background-color: #ffffff; padding: 24px; max-width: 640px;">
      <div style="border: 2px solid #000000; padding: 20px;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid #000000; padding-bottom: 10px;">
          890 / ARQ — Nuevo Mensaje de Contacto
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #000000;">
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; width: 140px; background-color: #f5f5f5;">Nombre</td>
              <td style="border: 1px solid #000000; padding: 10px 12px;">${escapeHtml(data.nombre)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; background-color: #f5f5f5;">Correo</td>
              <td style="border: 1px solid #000000; padding: 10px 12px;">${escapeHtml(data.correo)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; background-color: #f5f5f5;">Asunto</td>
              <td style="border: 1px solid #000000; padding: 10px 12px;">${escapeHtml(data.asunto)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; background-color: #f5f5f5;">Teléfono</td>
              <td style="border: 1px solid #000000; padding: 10px 12px;">${escapeHtml(data.telefono)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; background-color: #f5f5f5;">Comuna</td>
              <td style="border: 1px solid #000000; padding: 10px 12px;">${escapeHtml(data.comuna)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 10px 12px; font-weight: bold; vertical-align: top; background-color: #f5f5f5;">Mensaje</td>
              <td style="border: 1px solid #000000; padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(data.mensaje)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: data.correo,
      subject: `[890 ARQ] ${sanitizeHeaderValue(data.asunto)} - ${sanitizeHeaderValue(data.nombre)}`,
      html: htmlContent,
    });

    if (error) {
      return {
        success: false,
        message:
          "No fue posible enviar el mensaje en este momento. Inténtalo de nuevo o escríbenos por nuestros canales directos.",
      };
    }

    return {
      success: true,
      message: "Mensaje enviado con éxito. Te responderemos a la brevedad.",
    };
  } catch {
    return {
      success: false,
      message: "Ocurrió un error al enviar el mensaje. Intenta nuevamente.",
    };
  }
}
