'use client';

import React, { useActionState, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { sendContactAction } from '@/actions/send-contact';
import { SERVICE_TYPES } from '@/lib/validators';
import type { ActionResponse, ContactPayload } from '@/types/domain';

const INITIAL_STATE: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
};

export interface ContactFormProps {
  defaultServiceType?: ContactPayload['serviceType'];
  className?: string;
}

export function ContactForm({
  defaultServiceType = 'Arquitectura',
  className = '',
}: ContactFormProps) {
  const [formValues, setFormValues] = useState<ContactPayload>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: defaultServiceType,
    locationComuna: '',
    message: '',
  });

  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
    async (prevState, formData) => {
      const result = await sendContactAction(prevState, formData);
      if (result.success) {
        setFormValues({
          fullName: '',
          email: '',
          phone: '',
          serviceType: defaultServiceType,
          locationComuna: '',
          message: '',
        });
      }
      return result;
    },
    INITIAL_STATE
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFieldError = (field: keyof ContactPayload): string | undefined => {
    return state.errors?.[field]?.[0];
  };

  return (
    <div className={`w-full max-w-[660px] font-mono ${className}`}>
      {state.success && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 border-2 border-black bg-zinc-50 p-4 text-xs text-black"
        >
          <p className="font-bold uppercase mb-1">Mensaje enviado correctamente</p>
          <p>{state.message}</p>
        </div>
      )}

      {!state.success && state.message && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 border-2 border-[#DB0909] bg-red-50/60 p-4 text-xs text-[#DB0909]"
        >
          <p className="font-bold uppercase">{state.message}</p>
        </div>
      )}

      <form action={formAction} noValidate className="space-y-6">
        {/* Nombre (Ancho medio-largo como en 04-contacto-original.png) */}
        <div className="max-w-[420px]">
          <label
            htmlFor="fullName"
            className="block font-mono text-sm font-bold text-black mb-1.5"
          >
            Nombre
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            disabled={isPending}
            value={formValues.fullName}
            onChange={handleChange}
            className="arq-input w-full"
          />
          {getFieldError('fullName') && (
            <p className="mt-2.5 text-xs text-[#DB0909] font-medium">
              {getFieldError('fullName')}
            </p>
          )}
        </div>

        {/* Correo * (Caja más corta exactamente como en 04-contacto-original.png) */}
        <div className="max-w-[220px]">
          <label htmlFor="email" className="block font-mono text-sm font-bold text-black mb-1.5">
            Correo <span className="text-[#DB0909]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isPending}
            value={formValues.email}
            onChange={handleChange}
            className="arq-input w-full"
          />
          {getFieldError('email') && (
            <p className="mt-2.5 text-xs text-[#DB0909] font-medium">{getFieldError('email')}</p>
          )}
        </div>

        {/* Asunto (Tipo de Servicio + Teléfono y Comuna integrados con estética idéntica) */}
        <div className="max-w-[420px]">
          <label
            htmlFor="serviceType"
            className="block font-mono text-sm font-bold text-black mb-1.5"
          >
            Asunto
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            disabled={isPending}
            value={formValues.serviceType}
            onChange={handleChange}
            className="arq-input w-full"
          >
            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === 'Arquitectura' && 'Proyecto de Arquitectura / Diseño'}
                {type === 'Construcción' && 'Construcción / Ejecución de Obra'}
                {type === 'Industrial' && 'Proyecto Industrial / Bodegas'}
                {type === 'Regularización' && 'Tramitación Municipal DOM / Regularización'}
                {type === 'Comercial' && 'Habilitación Comercial / Remodelación'}
                {type === 'Otro' && 'Tasación / Consulta General'}
              </option>
            ))}
          </select>
          {getFieldError('serviceType') && (
            <p className="mt-2.5 text-xs text-[#DB0909] font-medium">
              {getFieldError('serviceType')}
            </p>
          )}
        </div>

        {/* Fila compacta para Teléfono y Comuna (requeridos por el contrato ContactPayload) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[420px]">
          <div>
            <label htmlFor="phone" className="block font-mono text-sm font-bold text-black mb-1.5">
              Teléfono <span className="text-[#DB0909]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              disabled={isPending}
              value={formValues.phone}
              onChange={handleChange}
              placeholder="+56 9..."
              className="arq-input w-full"
            />
            {getFieldError('phone') && (
              <p className="mt-2.5 text-xs text-[#DB0909] font-medium">{getFieldError('phone')}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="locationComuna"
              className="block font-mono text-sm font-bold text-black mb-1.5"
            >
              Comuna <span className="text-[#DB0909]">*</span>
            </label>
            <input
              id="locationComuna"
              name="locationComuna"
              type="text"
              required
              disabled={isPending}
              value={formValues.locationComuna}
              onChange={handleChange}
              placeholder="Ej. Viña del Mar"
              className="arq-input w-full"
            />
            {getFieldError('locationComuna') && (
              <p className="mt-2.5 text-xs text-[#DB0909] font-medium">
                {getFieldError('locationComuna')}
              </p>
            )}
          </div>
        </div>

        {/* Escribe aquí tu mensaje * (Caja grande idéntica a 04-contacto-original.png) */}
        <div className="max-w-[650px]">
          <label htmlFor="message" className="block font-mono text-sm font-bold text-black mb-1.5">
            Escribe aquí tu mensaje <span className="text-[#DB0909]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={isPending}
            value={formValues.message}
            onChange={handleChange}
            className="arq-input w-full resize-y"
          />
          {getFieldError('message') && (
            <p className="mt-2.5 text-xs text-[#DB0909] font-medium">
              {getFieldError('message')}
            </p>
          )}
        </div>

        {/* Botón Enviar (Borde negro grueso 3px idéntico a 04-contacto-original.png) */}
        <div className="pt-2">
          <button type="submit" disabled={isPending} className="arq-submit-btn inline-flex items-center gap-2">
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <span>Enviar</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
