"use client";

import React from "react";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual de diseno libre para proyecto 3 (diptico fotografico + planimetria)
export function Proyecto3Page({ onBack }: ProyectoPageProps) {
  return (
    <article className="w-full max-w-[1080px] mx-auto font-mono text-black">
      {/* navegacion superior */}
      <div className="flex items-center justify-between border-b border-black pb-4 mb-10">
        <button
          type="button"
          onClick={onBack}
          className="text-xs md:text-[13px] font-mono text-black hover:text-[#E60000] transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>&lt; Volver a proyectos</span>
        </button>
        <span className="border border-black px-2 py-1 text-xs font-mono">
          03
        </span>
      </div>

      {/* titulo centrado estilo monografia */}
      <header className="text-center max-w-[680px] mx-auto mb-12">
        <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">
          Categoria 3 / Hijuelas, Ocoa
        </p>
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4">
          Proyecto 3
        </h1>
        <p className="text-xs leading-relaxed text-neutral-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.
        </p>
      </header>

      {/* diptico de fotografias con etiquetas verticales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div className="flex items-start gap-2">
          <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-wider text-neutral-500 select-none">
            Vista Exterior Norte / 03.A
          </span>
          <div className="flex-1 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Cabanas-Ocoa1.jpeg"
              alt="Vista exterior Proyecto 3"
              className="w-full h-auto aspect-[4/3] object-cover grayscale"
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-wider text-neutral-500 select-none">
            Módulo Habitacional / 03.B
          </span>
          <div className="flex-1 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Rubica1.jpeg"
              alt="Módulo complementario Proyecto 3"
              className="w-full h-auto aspect-[4/3] object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* bloque de memoria y datos */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 border-y border-black py-8 mb-14">
        <div className="space-y-2 text-xs">
          <p>
            <strong className="font-bold">Emplazamiento:</strong> Valle de Ocoa
          </p>
          <p>
            <strong className="font-bold">Materialidad:</strong> Madera / Acero
          </p>
          <p>
            <strong className="font-bold">Escala:</strong> 1:50
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-[1.75] text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium.
          </p>
        </div>
      </div>

      {/* planimetria general */}
      <div className="border border-black p-4 md:p-8 bg-white">
        <div className="flex items-center justify-between border-b border-black pb-3 mb-6 text-[11px] uppercase">
          <span>Plantas de arquitectura y elevaciones</span>
          <span>Escala 1:50</span>
        </div>
        <img
          src="/images/Cabanas-Ocoa2.jpeg"
          alt="Planimetría Proyecto 3"
          className="w-full h-auto object-contain grayscale"
        />
      </div>
    </article>
  );
}
