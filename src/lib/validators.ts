import { z } from "zod";
import { ContactFormPayload } from "@/types/domain";

export const CONTACT_SUBJECTS = [
  "Proyecto de Arquitectura / Diseño",
  "Construcción / Ejecución de Obra",
  "Tramitación Municipal",
  "Otro",
] as const;

export const CONTACT_FIELD_ORDER: ReadonlyArray<keyof ContactFormPayload> = [
  "nombre",
  "correo",
  "asunto",
  "telefono",
  "comuna",
  "mensaje",
];

const CONTACT_FIELD_SET = new Set<string>(CONTACT_FIELD_ORDER);

export function isContactField(
  value: unknown
): value is keyof ContactFormPayload {
  return typeof value === "string" && CONTACT_FIELD_SET.has(value);
}

// esquema zod para validar el formulario de contacto con cotas estrictas
export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(120, "El nombre no puede superar los 120 caracteres."),
  correo: z
    .string()
    .trim()
    .max(254, "El correo es demasiado largo.")
    .pipe(z.email("Ingresa un correo electrónico válido.")),
  asunto: z.enum(CONTACT_SUBJECTS, {
    error: "Selecciona un asunto válido.",
  }),
  telefono: z
    .string()
    .trim()
    .min(8, "El teléfono debe tener al menos 8 caracteres.")
    .max(30, "El teléfono no puede superar los 30 caracteres.")
    .regex(/^[+\d\s().-]+$/, "Ingresa un teléfono válido."),
  comuna: z
    .string()
    .trim()
    .min(2, "La comuna debe tener al menos 2 caracteres.")
    .max(100, "La comuna no puede superar los 100 caracteres."),
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(3000, "El mensaje no puede superar los 3000 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
