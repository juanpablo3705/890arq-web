"use client";

import React from "react";
import { SectionId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";

interface CrossButtonProps {
  label: string;
  target: SectionId;
  onNavigate: (target: SectionId) => void;
}

// boton de navegacion con sombra desplazada estilo 890 arq
function CrossButton({ label, target, onNavigate }: CrossButtonProps) {
  return (
    <div className="relative inline-block group">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-black bg-transparent pointer-events-none transition-colors duration-200 group-hover:border-[#E60000]"
      />
      <button
        type="button"
        onClick={() => onNavigate(target)}
        className="relative z-10 w-[148px] sm:w-[172px] h-[50px] sm:h-[54px] border-2 border-black bg-white font-mono text-[13px] font-bold tracking-tight text-black flex items-center justify-center cursor-pointer transition-colors duration-200 group-hover:bg-[#E60000] group-hover:border-[#E60000] group-hover:text-white"
      >
        <span>{label} &gt;</span>
      </button>
    </div>
  );
}

// vista central home con navegacion en cruz y logo fijo
export function HomeSection() {
  const { navigateTo } = useCanvas();

  return (
    <section
      aria-label="Inicio 890 ARQ"
      className="w-full h-full flex items-center justify-center bg-white px-4"
    >
      <div className="flex flex-col items-center justify-center gap-y-10 sm:gap-y-16 -mt-4">
        {/* brazo norte: proyectos */}
        <div>
          <CrossButton
            label="Proyectos"
            target="proyectos"
            onNavigate={navigateTo}
          />
        </div>

        {/* fila central: contacto (oeste), logo estatico (centro), nosotros (este) */}
        <div className="flex items-center justify-center gap-x-4 sm:gap-x-12 md:gap-x-24">
          <CrossButton
            label="Contacto"
            target="contacto"
            onNavigate={navigateTo}
          />

          {/* recuadro central con logo 890 / arq en texto estatico */}
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-black bg-transparent pointer-events-none"
            />
            <div className="relative z-10 w-[132px] h-[132px] sm:w-[152px] sm:h-[152px] border-[3.5px] border-black bg-white flex flex-col items-center justify-center select-none">
              <span className="font-mono text-[22px] leading-none font-semibold tracking-wider text-black">
                890
              </span>
              <span className="w-20 sm:w-24 h-[3.5px] bg-black my-3.5" />
              <span className="font-mono text-[22px] leading-none font-semibold tracking-wider text-black">
                ARQ
              </span>
            </div>
          </div>

          <CrossButton
            label="Nosotros"
            target="nosotros"
            onNavigate={navigateTo}
          />
        </div>

        {/* brazo sur: cotizaciones */}
        <div>
          <CrossButton
            label="Cotizaciones"
            target="cotizaciones"
            onNavigate={navigateTo}
          />
        </div>
      </div>
    </section>
  );
}
