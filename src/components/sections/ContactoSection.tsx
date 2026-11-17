"use client";

import React, { useState } from "react";
import { ContactFormPayload } from "@/types/domain";
import { sendContactAction } from "@/actions/send-contact";

const ASUNTO_OPTIONS = [
  "Proyecto de Arquitectura / Diseño",
  "Construcción / Ejecución de Obra",
  "Tramitación Municipal",
  "Otro",
];

const INITIAL_FORM_STATE: ContactFormPayload = {
  nombre: "",
  correo: "",
  asunto: ASUNTO_OPTIONS[0],
  telefono: "",
  comuna: "",
  mensaje: "",
};

// vista de contacto en brazo izquierdo con formulario conectado a server action
export function ContactoSection() {
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
    <section
      aria-label="Contacto 890 ARQ"
      className="w-full min-h-screen bg-white flex items-center justify-center py-24 px-6 md:px-16"
    >
      <div className="w-full max-w-[1140px] flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 lg:pl-[110px]">
        {/* titulo vertical rotado a la izquierda */}
        <div className="w-full md:w-[76px] flex items-center justify-start md:justify-center shrink-0 md:my-auto">
          <h2 className="font-mono text-xl md:text-2xl font-bold tracking-wider text-black whitespace-nowrap md:-rotate-90 select-none">
            CONTACTO &gt;
          </h2>
        </div>

        {/* formulario central */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[650px] flex flex-col gap-5 md:ml-10"
        >
          {/* campo nombre */}
          <div className="flex flex-col gap-1.5 max-w-[420px] w-full">
            <label
              htmlFor="contacto-nombre"
              className="font-mono text-[13px] font-bold text-black"
            >
              Nombre <span className="text-[#E60000]">*</span>
            </label>
            <input
              id="contacto-nombre"
              name="nombre"
              type="text"
              required
              disabled={isSending}
              value={formData.nombre}
              onChange={handleChange}
              className="w-full h-[42px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] px-3 font-mono text-[13px] text-black focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.nombre && (
              <span className="font-mono text-[11px] text-[#E60000] mt-1">
                {fieldErrors.nombre}
              </span>
            )}
          </div>

          {/* campo correo de ancho medio */}
          <div className="flex flex-col gap-1.5 max-w-[220px] w-full">
            <label
              htmlFor="contacto-correo"
              className="font-mono text-[13px] font-bold text-black"
            >
              Correo <span className="text-[#E60000]">*</span>
            </label>
            <input
              id="contacto-correo"
              name="correo"
              type="email"
              required
              disabled={isSending}
              value={formData.correo}
              onChange={handleChange}
              className="w-full h-[42px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] px-3 font-mono text-[13px] text-black focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.correo && (
              <span className="font-mono text-[11px] text-[#E60000] mt-1">
                {fieldErrors.correo}
              </span>
            )}
          </div>

          {/* selector asunto */}
          <div className="flex flex-col gap-1.5 max-w-[420px] w-full">
            <label
              htmlFor="contacto-asunto"
              className="font-mono text-[13px] font-bold text-black"
            >
              Asunto
            </label>
            <select
              id="contacto-asunto"
              name="asunto"
              disabled={isSending}
              value={formData.asunto}
              onChange={handleChange}
              className="w-full h-[42px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] px-3 font-mono text-[13px] text-black focus:outline-none cursor-pointer disabled:opacity-60"
            >
              {ASUNTO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.asunto && (
              <span className="font-mono text-[11px] text-[#E60000] mt-1">
                {fieldErrors.asunto}
              </span>
            )}
          </div>

          {/* fila doble: telefono y comuna */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[420px] w-full">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contacto-telefono"
                className="font-mono text-[13px] font-bold text-black"
              >
                Teléfono <span className="text-[#E60000]">*</span>
              </label>
              <input
                id="contacto-telefono"
                name="telefono"
                type="tel"
                required
                disabled={isSending}
                placeholder="+56 9..."
                value={formData.telefono}
                onChange={handleChange}
                className="w-full h-[42px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] px-3 font-mono text-[13px] text-black placeholder:text-neutral-400 focus:outline-none disabled:opacity-60"
              />
              {fieldErrors.telefono && (
                <span className="font-mono text-[11px] text-[#E60000] mt-1">
                  {fieldErrors.telefono}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contacto-comuna"
                className="font-mono text-[13px] font-bold text-black"
              >
                Comuna <span className="text-[#E60000]">*</span>
              </label>
              <input
                id="contacto-comuna"
                name="comuna"
                type="text"
                required
                disabled={isSending}
                placeholder="Ej. Viña del Mar"
                value={formData.comuna}
                onChange={handleChange}
                className="w-full h-[42px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] px-3 font-mono text-[13px] text-black placeholder:text-neutral-400 focus:outline-none disabled:opacity-60"
              />
              {fieldErrors.comuna && (
                <span className="font-mono text-[11px] text-[#E60000] mt-1">
                  {fieldErrors.comuna}
                </span>
              )}
            </div>
          </div>

          {/* campo mensaje amplio */}
          <div className="flex flex-col gap-1.5 max-w-[650px] w-full">
            <label
              htmlFor="contacto-mensaje"
              className="font-mono text-[13px] font-bold text-black"
            >
              Escribe aquí tu mensaje <span className="text-[#E60000]">*</span>
            </label>
            <textarea
              id="contacto-mensaje"
              name="mensaje"
              required
              disabled={isSending}
              rows={5}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full h-[140px] bg-white border border-[#E60000] shadow-[6px_6px_0px_#E60000] p-3 font-mono text-[13px] text-black resize-y focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.mensaje && (
              <span className="font-mono text-[11px] text-[#E60000] mt-1">
                {fieldErrors.mensaje}
              </span>
            )}
          </div>

          {/* boton enviar y mensaje de estado */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="submit"
              disabled={isSending}
              className="border-2 border-black bg-white px-8 py-3 font-mono text-[13px] font-bold text-black cursor-pointer transition-colors duration-200 hover:bg-[#E60000] hover:border-[#E60000] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed w-fit"
            >
              {isSending ? "Enviando..." : "Enviar"}
            </button>

            {statusMessage && (
              <p
                role="status"
                className={`font-mono text-xs px-3 py-2 border ${
                  statusMessage.type === "success"
                    ? "border-black bg-neutral-100 text-black"
                    : "border-[#E60000] bg-white text-[#E60000]"
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
