import { z } from "zod";

// esquema zod para validar los campos del formulario de contacto
export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres."),
  correo: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido."),
  asunto: z
    .string()
    .trim()
    .min(2, "Selecciona un asunto válido."),
  telefono: z
    .string()
    .trim()
    .min(8, "El teléfono debe tener al menos 8 caracteres."),
  comuna: z
    .string()
    .trim()
    .min(2, "La comuna debe tener al menos 2 caracteres."),
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
