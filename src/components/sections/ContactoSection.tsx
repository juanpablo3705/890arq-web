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

// vista de contacto coherente con la grilla arquitectonica de proyectos
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
        {/* barra superior unificada con canales directos */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-black pb-5 mb-12">
          <h2
            id="contacto-heading"
            className="font-mono text-lg md:text-xl font-bold tracking-tight text-black uppercase shrink-0"
          >
            Contacto
          </h2>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-xs tracking-tight">
            <a
              href="mailto:contacto@890arq.cl"
              className="site-inline-link whitespace-nowrap"
            >
              contacto@890arq.cl
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=56935532319"
              target="_blank"
              rel="noopener noreferrer"
              className="site-inline-link whitespace-nowrap tabular-nums"
            >
              +56 9 3553 2319
            </a>
            <a
              href="https://www.instagram.com/890.arq"
              target="_blank"
              rel="noopener noreferrer"
              className="site-inline-link whitespace-nowrap"
            >
              @890.arq
            </a>
          </div>
        </header>

        {/* grilla suiza 4/8: ficha de estudio a la izquierda y formulario a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          <aside className="lg:col-span-4 flex items-start gap-[7px] font-mono text-black">
            <span className="site-vertical-tag bg-black text-white font-mono font-normal whitespace-nowrap select-none shrink-0">
              Contacto directo
            </span>

            <div className="flex-1 min-w-0">
              <div className="border-t border-black pt-4">
                <h3 className="text-[14px] leading-[1.25] tracking-[-0.01em] uppercase">
                  <span className="font-normal">INICIAR </span>
                  <span className="font-bold italic">CONVERSACIÓN</span>
                </h3>
                <p className="mt-3 text-xs leading-[1.65] font-normal">
                  Cuéntanos sobre tu terreno, obra o requerimiento normativo.
                  Respondemos directamente desde nuestro estudio en la Región de
                  Valparaíso.
                </p>
              </div>

              <dl className="mt-6 border-y border-black divide-y divide-black text-xs">
                <div className="py-3 flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                    Correo
                  </dt>
                  <dd>
                    <a
                      href="mailto:contacto@890arq.cl"
                      className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      contacto@890arq.cl
                    </a>
                  </dd>
                </div>

                <div className="py-3 flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                    Teléfono / WhatsApp
                  </dt>
                  <dd className="tabular-nums">
                    <a
                      href="https://api.whatsapp.com/send/?phone=56935532319"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      +56 9 3553 2319
                    </a>
                  </dd>
                </div>

                <div className="py-3 flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                    Cobertura
                  </dt>
                  <dd>Región de Valparaíso y proyectos en Chile</dd>
                </div>

                <div className="py-3 flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                    Divisiones
                  </dt>
                  <dd>890 ARQ Ltda. · 890 ARQ SpA</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-[11px] leading-[1.4] text-[#737373]">
                  Campos marcados con{" "}
                  <span className="text-[#E60000]" aria-hidden="true">
                    *
                  </span>{" "}
                  son obligatorios.
                </p>

                <div className="site-index-box shrink-0 font-mono">
                  <span className="text-[10px] tracking-[0.04em] font-normal uppercase">
                    EST.
                  </span>
                  <span className="text-[12px] font-semibold tabular-nums">
                    890
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* formulario principal con trazos limpios de 1px */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contacto-heading"
            className="lg:col-span-8 border-t border-black pt-5 flex flex-col gap-6 font-mono text-black"
          >
            {/* fila 1: nombre y correo */}
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

            {/* selector de asunto en grilla 2x2 alineada con los campos */}
            <fieldset className="flex flex-col gap-2.5 border-0 p-0 m-0">
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

            {/* fila 2: telefono y comuna */}
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

            {/* campo mensaje */}
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

            {/* barra inferior de envio y estado */}
            <div className="border-t border-black pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
