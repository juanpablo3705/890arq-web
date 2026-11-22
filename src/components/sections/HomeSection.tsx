"use client";

import React, { useEffect, useRef } from "react";
import { SectionId } from "@/types/domain";
import {
  CANVAS_TRANSITION_MS,
  useCanvas,
} from "@/components/canvas/CanvasContext";

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

// vista central home con navegacion en cruz y logo con oleaje
export function HomeSection() {
  const { activeSection, navigateTo } = useCanvas();
  const logoBoxRef = useRef<HTMLDivElement>(null);

  // pausa el oleaje cuando home sale de pantalla para ahorrar gpu
  useEffect(() => {
    const node = logoBoxRef.current;
    if (!node) return;
    if (activeSection === "home") {
      node.classList.remove("logo-wave-paused");
      return;
    }
    const timer = setTimeout(() => {
      node.classList.add("logo-wave-paused");
    }, CANVAS_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <section
      aria-label="Inicio 890 ARQ"
      className="w-full h-full flex items-center justify-center bg-white px-[var(--site-pad-x)]"
    >
      <div className="site-container h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-2.5 sm:gap-y-[65px]">
        {/* brazo norte: proyectos */}
        <div>
          <CrossButton
            label="Proyectos"
            target="proyectos"
            onNavigate={navigateTo}
          />
        </div>

        {/* fila central: contacto (oeste), logo central (centro), oficina (este) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:gap-y-0 sm:gap-x-5 md:gap-x-12 lg:gap-x-[97.5px]">
          <CrossButton
            label="Contacto"
            target="contacto"
            onNavigate={navigateTo}
          />

          {/* recuadro central con logo 890 / arq y vaiven por letra */}
          <div
            ref={logoBoxRef}
            className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[152px] md:h-[152px] border-[4px] border-black bg-white flex flex-col items-center justify-center select-none shrink-0 my-1 sm:my-0"
          >
            <span className="sr-only">890</span>
            <span
              aria-hidden="true"
              className="logo-wave-top font-mono text-[1.25rem] md:text-[1.375rem] leading-[0.85] font-medium text-black"
            >
              <span>8</span>
              <span>9</span>
              <span>0</span>
            </span>
            <span className="w-20 md:w-[96px] h-[4px] bg-black my-3 md:my-[14px]" />
            <span className="sr-only">ARQ</span>
            <span
              aria-hidden="true"
              className="logo-wave-bottom font-mono text-[1.25rem] md:text-[1.375rem] leading-[0.85] font-medium text-black"
            >
              <span>A</span>
              <span>R</span>
              <span>Q</span>
            </span>
          </div>

          <CrossButton
            label="Oficina"
            target="oficina"
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
      </div>
    </section>
  );
}
