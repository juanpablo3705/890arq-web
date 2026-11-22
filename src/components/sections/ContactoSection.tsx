"use client";

import React, { useEffect, useRef, useState } from "react";
import { ContactFormPayload } from "@/types/domain";
import {
  CONTACT_FIELD_ORDER,
  CONTACT_SUBJECTS,
  isContactField,
} from "@/lib/validators";
import { sendContactAction } from "@/actions/send-contact";
import { useCanvas } from "@/components/canvas/CanvasContext";
import {
  CONTACTO_CHANNEL_ORDER,
  SOCIAL_CHANNELS,
  SocialChannelIcon,
} from "@/components/canvas/socialChannels";

const INITIAL_FORM_STATE: ContactFormPayload = {
  nombre: "",
  correo: "",
  asunto: CONTACT_SUBJECTS[0],
  telefono: "",
  comuna: "",
  mensaje: "",
};

// vista de contacto con columna acoplada para accesos directos y combobox de asunto
export function ContactoSection() {
  const { socialDockPhase, registerSocialSlot } = useCanvas();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<number>(0);
  const [formData, setFormData] =
    useState<ContactFormPayload>(INITIAL_FORM_STATE);
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormPayload, string>>
  >({});
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const isDocked = socialDockPhase === "docked";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (!isContactField(name)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const focusFirstInvalidField = (
    errors: Partial<Record<keyof ContactFormPayload, string>>
  ) => {
    const firstKey = CONTACT_FIELD_ORDER.find((key) => Boolean(errors[key]));
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
      const result = await sendContactAction({
        ...formData,
        website: honeypot,
        startedAt: startedAtRef.current || undefined,
      });

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
        setHoneypot("");
        startedAtRef.current = Date.now();
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* formulario principal alineado a la izquierda */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto"
            className="relative lg:col-span-8 flex flex-col gap-6 font-mono text-black"
          >
            {/* campo trampa invisible para filtrar envios automatizados */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clipPath: "inset(50%)",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <label htmlFor="contacto-website">Sitio web</label>
              <input
                id="contacto-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
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
                  maxLength={120}
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
                  maxLength={254}
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

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contacto-asunto"
                className="text-[11px] font-bold uppercase tracking-[0.04em] text-black"
              >
                Asunto{" "}
                <span className="text-[#E60000]" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="site-select-wrap relative">
                <select
                  id="contacto-asunto"
                  name="asunto"
                  required
                  disabled={isSending}
                  aria-invalid={fieldErrors.asunto ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.asunto ? "contacto-asunto-error" : undefined
                  }
                  value={formData.asunto}
                  onChange={handleChange}
                  className="site-field site-select font-mono cursor-pointer"
                >
                  {CONTACT_SUBJECTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="site-select-chevron pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black"
                >
                  <path
                    d="M3.5 6L8 10.5L12.5 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              {fieldErrors.asunto && (
                <p
                  id="contacto-asunto-error"
                  className="text-[11px] leading-[1.4] text-[#E60000]"
                >
                  Error: {fieldErrors.asunto}
                </p>
              )}
            </div>

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
                  maxLength={30}
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
                  maxLength={100}
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
                maxLength={3000}
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

          {/* columna derecha donde aterrizan los 3 iconos y se revelan sus textos */}
          <aside
            aria-label="Canales directos de contacto"
            className="lg:col-span-4 lg:pt-[22px]"
          >
            <ul role="list" className="flex flex-col items-start gap-5">
              {CONTACTO_CHANNEL_ORDER.map((id) => {
                const channel = SOCIAL_CHANNELS[id];
                return (
                  <li key={id} className="w-full">
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      aria-hidden={!isDocked}
                      tabIndex={isDocked ? undefined : -1}
                      className={`group inline-flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 ${
                        isDocked ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      <span
                        ref={(el) => registerSocialSlot(id, el)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-black text-white flex items-center justify-center transition-colors duration-200 group-hover:bg-[#E60000] ${
                          isDocked ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <SocialChannelIcon id={id} />
                      </span>

                      <span
                        data-visible={isDocked ? "true" : "false"}
                        className="contacto-channel-label font-mono text-xs leading-[1.4] text-black group-hover:text-[#E60000]"
                      >
                        {channel.contactoLabel}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
