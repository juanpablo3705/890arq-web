"use client";

import React from "react";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual de diseno libre para proyecto 4 (planimetria primero + bloque escalonado)
export function Proyecto4Page({ onBack }: ProyectoPageProps) {
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
          04
        </span>
      </div>

      {/* cabecera en tabla tecnica */}
      <header className="border border-black mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_220px] divide-y md:divide-y-0 md:divide-x divide-black">
          <div className="p-6">
            <span className="text-[11px] uppercase text-neutral-500 block mb-1">
              Especialidades técnicas / Caburgua, IX Región
            </span>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Proyecto 4
            </h1>
          </div>
          <div className="p-6 text-xs flex flex-col justify-center">
            <span className="text-neutral-500 uppercase text-[10px]">
              Programa
            </span>
            <span className="font-bold mt-1">Vivienda Unifamiliar</span>
          </div>
          <div className="p-6 text-xs flex flex-col justify-center">
            <span className="text-neutral-500 uppercase text-[10px]">
              Superficie Total
            </span>
            <span className="font-bold mt-1">310 m²</span>
          </div>
        </div>
      </header>

      {/* lamina planimetrica diagonal */}
      <div className="border border-black p-4 md:p-8 mb-12 bg-white">
        <div className="flex items-center justify-between border-b border-black pb-3 mb-6 text-[11px] uppercase">
          <span>Planta de emplazamiento y cortes longitudinales</span>
          <span>Lámina 04.1</span>
        </div>
        <img
          src="/images/Casa-Ojos-del-Caburga2.jpeg"
          alt="Planimetría Proyecto 4"
          className="w-full h-auto object-contain grayscale"
        />
      </div>

      {/* 3 columnas de texto descriptivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-[1.75] text-justify mb-12">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto.
        </p>
      </div>

      {/* fotografia exterior al pie */}
      <div className="border border-black overflow-hidden bg-neutral-100">
        <img
          src="/images/Casa-Ojos-del-Caburga1.jpeg"
          alt="Vista exterior Proyecto 4"
          className="w-full h-auto aspect-[16/9] object-cover grayscale"
        />
      </div>
    </article>
  );
}
