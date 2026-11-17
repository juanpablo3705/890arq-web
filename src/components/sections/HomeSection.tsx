"use client";

import React from "react";
import { SectionId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";

interface CrossButtonProps {
  label: string;
  target: SectionId;
  onNavigate: (target: SectionId) => void;
}

// boton en cruz con recuadro desplazado 15px abajo a la derecha
function CrossButton({ label, target, onNavigate }: CrossButtonProps) {
  return (
    <div className="relative inline-block pb-[15px] pr-[15px] group">
      <div
        aria-hidden="true"
        className="absolute top-[15px] left-[15px] w-[170px] h-[55px] border border-black bg-transparent pointer-events-none transition-colors duration-200 group-hover:border-[#E60000]"
      />
      <button
        type="button"
        onClick={() => onNavigate(target)}
        className="relative z-10 w-[170px] min-h-[55px] border-[3px] border-black bg-white font-mono text-[0.875rem] leading-none font-bold text-black whitespace-nowrap flex items-center justify-center cursor-pointer transition-colors duration-200 group-hover:bg-[#E60000] group-hover:border-[#E60000] group-hover:text-white"
      >
        <span>{label} &gt;</span>
      </button>
    </div>
  );
}

// vista central home con navegacion en cruz y logo estatico
export function HomeSection() {
  const { navigateTo } = useCanvas();

  return (
    <section
      aria-label="Inicio 890 ARQ"
      className="w-full h-full flex items-center justify-center bg-white px-4"
    >
      <div className="flex flex-col items-center justify-center gap-y-2.5 sm:gap-y-[65px] -translate-y-4 sm:translate-y-0 lg:-translate-y-[38px]">
        {/* brazo norte: proyectos */}
        <div>
          <CrossButton
            label="Proyectos"
            target="proyectos"
            onNavigate={navigateTo}
          />
        </div>

        {/* fila central: contacto (oeste), logo estatico (centro), nosotros (este) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:gap-y-0 sm:gap-x-5 md:gap-x-12 lg:gap-x-[97.5px]">
          <CrossButton
            label="Contacto"
            target="contacto"
            onNavigate={navigateTo}
          />

          {/* recuadro central con logo 890 / arq estatico sin sombra */}
          <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[152px] md:h-[152px] border-[4px] border-black bg-white flex flex-col items-center justify-center select-none shrink-0 my-1 sm:my-0">
            <span className="font-mono text-[1.25rem] md:text-[1.375rem] leading-[0.85] font-medium text-black">
              890
            </span>
            <span className="w-20 md:w-[96px] h-[4px] bg-black my-3 md:my-[14px]" />
            <span className="font-mono text-[1.25rem] md:text-[1.375rem] leading-[0.85] font-medium text-black">
              ARQ
            </span>
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
