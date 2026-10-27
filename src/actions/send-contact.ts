'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/lib/validators';
import type { ActionResponse, ContactPayload } from '@/types/domain';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function resolveSuggestedDivision(serviceType: ContactPayload['serviceType']): string {
  switch (serviceType) {
    case 'Arquitectura':
    case 'Regularización':
      return '890 ARQ Ltda. (Diseño, Proyectos y Gestión Normativa DOM)';
    case 'Construcción':
    case 'Industrial':
    case 'Comercial':
      return '890 ARQ SpA (Ejecución de Obras, Construcción e Infraestructura)';
    default:
      return 'Evaluación Técnica Integral (890 ARQ Ltda. / SpA)';
  }
}

function buildTechnicalSheetHtml(payload: ContactPayload): string {
  const safeName = escapeHtml(payload.fullName);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone);
  const safeService = escapeHtml(payload.serviceType);
  const safeComuna = escapeHtml(payload.locationComuna);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');
  const suggestedDivision = escapeHtml(resolveSuggestedDivision(payload.serviceType));
  const timestamp = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Santiago',
  }).format(new Date());

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ficha de Solicitud Técnica — 890 ARQ</title>
</head>
<body style="margin:0;padding:32px 16px;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#09090b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background-color:#ffffff;border:2px solid #09090b;border-collapse:collapse;">
    <tr>
      <td style="background-color:#09090b;color:#ffffff;padding:24px 28px;border-bottom:2px solid #09090b;">
        <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a1a1aa;margin-bottom:6px;">
          DOCUMENTO DE INGRESO // PORTAL WEB
        </div>
        <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.02em;text-transform:uppercase;">
          890 ARQ — Ficha de Solicitud Técnica
        </h1>
      </td>
    </tr>

    <tr>
      <td style="padding:16px 28px;background-color:#fafafa;border-bottom:1px solid #e4e4e7;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;color:#52525b;">
        <strong>FECHA DE EMISIÓN:</strong> ${escapeHtml(timestamp)}<br />
        <strong>DIVISIÓN SUGERIDA:</strong> ${suggestedDivision}
      </td>
    </tr>

    <tr>
      <td style="padding:24px 28px;">
        <h2 style="margin:0 0 16px 0;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;letter-spacing:0.14em;text-transform:uppercase;color:#52525b;border-bottom:1px solid #09090b;padding-bottom:8px;">
          01. Antecedentes del Mandante y Proyecto
        </h2>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;background-color:#fafafa;width:36%;font-weight:600;color:#404046;">
              Mandante / Contacto
            </td>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;color:#09090b;">
              ${safeName}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;background-color:#fafafa;font-weight:600;color:#404046;">
              Correo Electrónico
            </td>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;color:#09090b;">
              <a href="mailto:${safeEmail}" style="color:#09090b;text-decoration:underline;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;background-color:#fafafa;font-weight:600;color:#404046;">
              Teléfono
            </td>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;color:#09090b;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
              <a href="tel:${safePhone}" style="color:#09090b;text-decoration:none;">${safePhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;background-color:#fafafa;font-weight:600;color:#404046;">
              Especialidad / Servicio
            </td>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;color:#09090b;">
              <span style="display:inline-block;padding:2px 8px;background-color:#09090b;color:#ffffff;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;text-transform:uppercase;">
                ${safeService}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;background-color:#fafafa;font-weight:600;color:#404046;">
              Comuna / Emplazamiento
            </td>
            <td style="padding:10px 12px;border:1px solid #e4e4e7;color:#09090b;font-weight:600;">
              ${safeComuna}
            </td>
          </tr>
        </table>

        <h2 style="margin:28px 0 12px 0;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;letter-spacing:0.14em;text-transform:uppercase;color:#52525b;border-bottom:1px solid #09090b;padding-bottom:8px;">
          02. Memoria Descriptiva del Requerimiento
        </h2>

        <div style="padding:16px;border:1px solid #09090b;background-color:#fafafa;font-size:14px;line-height:1.65;color:#18181b;">
          ${safeMessage}
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding:16px 28px;background-color:#141416;color:#a1a1aa;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;text-align:between;">
        890 ARQ — ARQUITECTURA, INGENIERÍA Y CONSTRUCCIÓN // REGIÓN DE VALPARAÍSO, CHILE
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function extractRawPayload(
  prevStateOrPayload: ActionResponse | FormData | ContactPayload | null | undefined,
  maybeFormData?: FormData
): Record<string, unknown> {
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrPayload instanceof FormData
        ? prevStateOrPayload
        : null;

  if (formData) {
    return {
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      serviceType: String(formData.get('serviceType') ?? ''),
      locationComuna: String(formData.get('locationComuna') ?? ''),
      message: String(formData.get('message') ?? ''),
    };
  }

  if (
    prevStateOrPayload &&
    typeof prevStateOrPayload === 'object' &&
    'fullName' in prevStateOrPayload
  ) {
    return prevStateOrPayload as unknown as Record<string, unknown>;
  }

  return {};
}

export async function sendContactAction(
  prevStateOrPayload: ActionResponse | FormData | ContactPayload | null | undefined,
  maybeFormData?: FormData
): Promise<ActionResponse> {
  const rawData = extractRawPayload(prevStateOrPayload, maybeFormData);
  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Por favor revisa los campos del formulario.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data: ContactPayload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('┌──────────────────────────────────────────────────────────────┐');
    console.log('│ [890 ARQ] SIMULACIÓN DE FICHA DE CONTACTO (SIN RESEND_API_KEY) │');
    console.log('└──────────────────────────────────────────────────────────────┘');
    console.log({
      timestamp: new Date().toISOString(),
      mandante: data.fullName,
      email: data.email,
      telefono: data.phone,
      servicio: data.serviceType,
      comuna: data.locationComuna,
      mensaje: data.message,
    });

    return {
      success: true,
      message: 'Mensaje recibido correctamente (Modo Simulación Local).',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim() || 'contacto@890arq.cl';
    const senderEmail = process.env.RESEND_FROM_EMAIL?.trim() || '890 ARQ Portal Técnico <onboarding@resend.dev>';

    const { error } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: data.email,
      subject: `[Ficha Técnica 890 ARQ] ${data.serviceType} en ${data.locationComuna} — ${data.fullName}`,
      html: buildTechnicalSheetHtml(data),
    });

    if (error) {
      console.error('[890 ARQ] Error al enviar correo con Resend:', error);
      return {
        success: false,
        message: 'No fue posible procesar el envío en este momento. Por favor intenta nuevamente o escríbenos directamente.',
      };
    }

    return {
      success: true,
      message:
        'Solicitud técnica recepcionada correctamente. Nuestro equipo de arquitectos e ingenieros te contactará a la brevedad.',
    };
  } catch (err) {
    console.error('[890 ARQ] Excepción inesperada en sendContactAction:', err);
    return {
      success: false,
      message: 'Ocurrió un error inesperado al enviar tu consulta. Por favor intenta nuevamente.',
    };
  }
}
