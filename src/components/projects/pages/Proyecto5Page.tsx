"use client";

import React from "react";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual de diseno libre para proyecto 5 (dossier vertical con axonometria de 4 niveles)
export function Proyecto5Page({ onBack }: ProyectoPageProps) {
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
          05
        </span>
      </div>

      {/* encabezado con resumen tecnico */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">
            Viviendas modulares / Viña del Mar, V Región
          </p>
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">
            Proyecto 5
          </h1>
        </div>
        <div className="border border-black px-4 py-2 text-xs">
          <span>Superficie: 861 m² • 4 Niveles</span>
        </div>
      </header>

      {/* grilla dividida: axonometria vertical a la izquierda + fotografias y memoria a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-start">
        <div className="border border-black p-4 bg-white">
          <div className="border-b border-black pb-2 mb-4 text-[11px] uppercase flex justify-between">
            <span>Isometría Explotada</span>
            <span>05.ISO</span>
          </div>
          <img
            src="/images/Proyecto-Codequir2.jpeg"
            alt="Axonometría por niveles Proyecto 5"
            className="w-full h-auto object-contain grayscale"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Proyecto-Codequir1.jpeg"
              alt="Pasarelas interiores Proyecto 5"
              className="w-full h-auto aspect-[16/10] object-cover grayscale"
            />
          </div>

          <div className="font-mono text-xs leading-[1.75] text-justify space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>
          </div>

          <div className="border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Oficinas-Zett-1.jpeg"
              alt="Acceso exterior Proyecto 5"
              className="w-full h-auto aspect-[16/9] object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
