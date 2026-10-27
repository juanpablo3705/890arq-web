import { z } from 'zod';
import type { ContactPayload, ProjectCategory } from '@/types/domain';

export const SERVICE_TYPES: readonly (ProjectCategory | 'Otro')[] = [
  'Arquitectura',
  'Construcción',
  'Industrial',
  'Regularización',
  'Comercial',
  'Otro',
] as const;

const CHILEAN_PHONE_REGEX = /^(\+?56)?[\s()-]*[2-9][\d\s()-]{6,13}\d$/;

export const contactSchema = z.object({
  fullName: z
    .string({ message: 'El nombre completo es obligatorio.' })
    .trim()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres.')
    .max(120, 'El nombre completo no puede exceder los 120 caracteres.'),

  email: z
    .string({ message: 'El correo electrónico es obligatorio.' })
    .trim()
    .toLowerCase()
    .email('Ingresa un formato de correo electrónico válido (ej. nombre@dominio.cl).')
    .max(254, 'El correo electrónico es demasiado largo.'),

  phone: z
    .string({ message: 'El teléfono de contacto es obligatorio.' })
    .trim()
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, '');
        return digitsOnly.length >= 8 && digitsOnly.length <= 15;
      },
      { message: 'El teléfono debe contener al menos 8 dígitos numéricos.' }
    )
    .refine((val) => CHILEAN_PHONE_REGEX.test(val), {
      message: 'Ingresa un teléfono chileno válido (ej. +56 9 1234 5678 o 912345678).',
    }),

  serviceType: z.enum(
    ['Arquitectura', 'Construcción', 'Industrial', 'Regularización', 'Comercial', 'Otro'],
    {
      message: 'Selecciona un tipo de servicio válido.',
    }
  ),

  locationComuna: z
    .string({ message: 'La comuna o ubicación del proyecto es obligatoria.' })
    .trim()
    .min(2, 'Ingresa una comuna válida (mínimo 2 caracteres, ej. Quilpué, Viña del Mar, Concón).')
    .max(100, 'El nombre de la comuna no puede superar los 100 caracteres.'),

  message: z
    .string({ message: 'El mensaje o descripción del proyecto es obligatorio.' })
    .trim()
    .min(15, 'Detalla tu proyecto o consulta con al menos 15 caracteres.')
    .max(2000, 'El mensaje no puede exceder los 2000 caracteres.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function validateContactPayload(data: unknown) {
  return contactSchema.safeParse(data as ContactPayload);
}
