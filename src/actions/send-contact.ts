"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";
import { ContactFormPayload } from "@/types/domain";

export interface SendContactResponse {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormPayload, string>>;
}

// sanitizacion basica para evitar inyeccion html en el cuerpo del correo
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// server action para validar, respaldar en supabase y enviar correo con resend
export async function sendContactAction(
  payload: ContactFormPayload
): Promise<SendContactResponse> {
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormPayload, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormPayload | undefined;
      if (field && !fieldErrors[field]) {
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

  const data = parsed.data;

  // respaldo en supabase tolerante a fallos si la tabla aun no fue creada
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
    // continuamos con el envio de correo aunque falle el respaldo en bd
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      message: "Falta configurar el servicio de correo en el servidor.",
    };
  }

  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL || "contacto@890arq.cl";

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
      from: "890 ARQ Web <onboarding@resend.dev>",
      to: [receiverEmail],
      replyTo: data.correo,
      subject: `[890 ARQ] ${data.asunto} - ${data.nombre}`,
      html: htmlContent,
    });

    if (error) {
      return {
        success: false,
        message:
          error.message ||
          "No fue posible enviar el mensaje en este momento. Inténtalo de nuevo.",
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
