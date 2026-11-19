"use client";

import React, { useRef, useState } from "react";
import { ContactFormPayload } from "@/types/domain";
import { sendContactAction } from "@/actions/send-contact";

const ASUNTO_OPTIONS = [
  "Proyecto de Arquitectura / Diseño",
  "Construcción / Ejecución de Obra",
  "Tramitación Municipal",
  "Otro",
];

const FIELD_ORDER: Array<keyof ContactFormPayload> = [
  "nombre",
  "correo",
  "asunto",
  "telefono",
  "comuna",
  "mensaje",
];

const INITIAL_FORM_STATE: ContactFormPayload = {
  nombre: "",
  correo: "",
  asunto: ASUNTO_OPTIONS[0],
  telefono: "",
  comuna: "",
  mensaje: "",
};

// vista de contacto minimalista sin elementos ni lineas redundantes
export function ContactoSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] =
    useState<ContactFormPayload>(INITIAL_FORM_STATE);
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormPayload, string>>
  >({});
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactFormPayload]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const focusFirstInvalidField = (
    errors: Partial<Record<keyof ContactFormPayload, string>>
  ) => {
    const firstKey = FIELD_ORDER.find((key) => Boolean(errors[key]));
    if (!firstKey) return;
    const el = formRef.current?.querySelector<HTMLElement>(
      `[name="${firstKey}"]`
    );
    el?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setFieldErrors({});
    setStatusMessage(null);

    try {
      const result = await sendContactAction(formData);

      if (!result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          requestAnimationFrame(() => {
            focusFirstInvalidField(result.fieldErrors ?? {});
          });
        }
        setStatusMessage({
          type: "error",
          text: result.message,
        });
      } else {
        setFormData(INITIAL_FORM_STATE);
        setStatusMessage({
          type: "success",
          text: result.message,
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "No se pudo procesar el envío. Por favor intenta nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section aria-label="Contacto 890 ARQ" className="site-section">
      <div className="site-container">
        {/* unica barra superior del encabezado */}
        <header className="border-b border-black pb-5 mb-14">
          <h2
            id="contacto-heading"
            className="font-mono text-lg md:text-xl font-bold tracking-tight text-black uppercase"
          >
            Contacto
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* columna lateral limpia con datos esenciales sin repeticiones */}
          <aside className="lg:col-span-4 font-mono text-xs leading-[1.7] text-black space-y-6">
            <p>
              Cuéntanos sobre tu proyecto, terreno o consulta normativa.
              Respondemos directamente desde nuestro estudio en la Región de
              Valparaíso.
            </p>

            <div className="flex flex-col items-start gap-2 pt-1">
              <a
                href="mailto:contacto@890arq.cl"
                className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                contacto@890arq.cl
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=56935532319"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black tabular-nums border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                +56 9 3553 2319
              </a>
              <a
                href="https://www.instagram.com/890.arq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                @890.arq
              </a>
            </div>
          </aside>

          {/* formulario limpio sin lineas divisoras accesorias */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contacto-heading"
            className="lg:col-span-8 flex flex-col gap-6 font-mono text-black"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contacto-nombre"
                  className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
                >
                  Nombre{" "}
                  <span className="text-[#E60000]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contacto-nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                  disabled={isSending}
                  aria-invalid={fieldErrors.nombre ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.nombre ? "contacto-nombre-error" : undefined
                  }
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="site-field font-mono placeholder:text-[#737373]"
                />
                {fieldErrors.nombre && (
                  <p
                    id="contacto-nombre-error"
                    className="text-[11px] leading-[1.4] text-[#E60000]"
                  >
                    Error: {fieldErrors.nombre}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contacto-correo"
                  className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
                >
                  Correo{" "}
                  <span className="text-[#E60000]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contacto-correo"
                  name="correo"
                  type="email"
                  required
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                  disabled={isSending}
                  aria-invalid={fieldErrors.correo ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.correo ? "contacto-correo-error" : undefined
                  }
                  placeholder="nombre@correo.cl"
                  value={formData.correo}
                  onChange={handleChange}
                  className="site-field font-mono placeholder:text-[#737373]"
                />
                {fieldErrors.correo && (
                  <p
                    id="contacto-correo-error"
                    className="text-[11px] leading-[1.4] text-[#E60000]"
                  >
                    Error: {fieldErrors.correo}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
              <legend className="text-[11px] font-bold uppercase tracking-[0.04em] text-black mb-2">
                Asunto
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ASUNTO_OPTIONS.map((option, idx) => {
                  const id = `contacto-asunto-${idx}`;
                  return (
                    <div key={option} className="relative">
                      <input
                        id={id}
                        type="radio"
                        name="asunto"
                        value={option}
                        checked={formData.asunto === option}
                        disabled={isSending}
                        onChange={handleChange}
                        className="site-radio-input sr-only"
                      />
                      <label
                        htmlFor={id}
                        className="site-radio-chip w-full font-mono text-xs tracking-tight"
                      >
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
              {fieldErrors.asunto && (
                <p
                  id="contacto-asunto-error"
                  className="text-[11px] leading-[1.4] text-[#E60000]"
                >
                  Error: {fieldErrors.asunto}
                </p>
              )}
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contacto-telefono"
                  className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
                >
                  Teléfono{" "}
                  <span className="text-[#E60000]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contacto-telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  enterKeyHint="next"
                  disabled={isSending}
                  aria-invalid={fieldErrors.telefono ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.telefono ? "contacto-telefono-error" : undefined
                  }
                  placeholder="+56 9..."
                  value={formData.telefono}
                  onChange={handleChange}
                  className="site-field font-mono placeholder:text-[#737373]"
                />
                {fieldErrors.telefono && (
                  <p
                    id="contacto-telefono-error"
                    className="text-[11px] leading-[1.4] text-[#E60000]"
                  >
                    Error: {fieldErrors.telefono}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contacto-comuna"
                  className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
                >
                  Comuna{" "}
                  <span className="text-[#E60000]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contacto-comuna"
                  name="comuna"
                  type="text"
                  required
                  autoComplete="address-level2"
                  enterKeyHint="next"
                  disabled={isSending}
                  aria-invalid={fieldErrors.comuna ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.comuna ? "contacto-comuna-error" : undefined
                  }
                  placeholder="Ej. Viña del Mar"
                  value={formData.comuna}
                  onChange={handleChange}
                  className="site-field font-mono placeholder:text-[#737373]"
                />
                {fieldErrors.comuna && (
                  <p
                    id="contacto-comuna-error"
                    className="text-[11px] leading-[1.4] text-[#E60000]"
                  >
                    Error: {fieldErrors.comuna}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contacto-mensaje"
                className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
              >
                Mensaje{" "}
                <span className="text-[#E60000]" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="contacto-mensaje"
                name="mensaje"
                required
                disabled={isSending}
                rows={5}
                aria-invalid={fieldErrors.mensaje ? "true" : "false"}
                aria-describedby={
                  fieldErrors.mensaje ? "contacto-mensaje-error" : undefined
                }
                placeholder="Describe brevemente el proyecto, ubicación o consulta..."
                value={formData.mensaje}
                onChange={handleChange}
                className="site-field font-mono min-h-[144px] resize-y placeholder:text-[#737373]"
              />
              {fieldErrors.mensaje && (
                <p
                  id="contacto-mensaje-error"
                  className="text-[11px] leading-[1.4] text-[#E60000]"
                >
                  Error: {fieldErrors.mensaje}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSending}
                className="border border-black bg-black text-white px-7 min-h-[48px] font-mono text-xs font-bold uppercase tracking-[0.04em] cursor-pointer transition-colors duration-200 hover:bg-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-3 disabled:opacity-60 disabled:cursor-not-allowed w-fit"
              >
                {isSending ? "Enviando..." : "Enviar mensaje >"}
              </button>

              <div role="status" aria-live="polite" aria-atomic="true">
                {statusMessage && (
                  <p
                    className={`font-mono text-xs px-3.5 py-2.5 border ${
                      statusMessage.type === "success"
                        ? "border-black bg-neutral-50 text-black"
                        : "border-[#E60000] bg-white text-[#E60000]"
                    }`}
                  >
                    {statusMessage.text}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
