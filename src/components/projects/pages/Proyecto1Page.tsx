"use client";

import React from "react";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual de diseno libre para proyecto 1 (editorial panoramica + isometria)
export function Proyecto1Page({ onBack }: ProyectoPageProps) {
  return (
    <article className="w-full max-w-[1080px] mx-auto font-mono text-black">
      {/* barra superior con boton discreto para volver a la grilla */}
      <div className="flex items-center justify-between border-b border-black pb-4 mb-10">
        <button
          type="button"
          onClick={onBack}
          className="text-xs md:text-[13px] font-mono text-black hover:text-[#E60000] transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>&lt; Volver a proyectos</span>
        </button>
        <span className="border border-black px-2 py-1 text-xs font-mono">
          01
        </span>
      </div>

      {/* encabezado editorial */}
      <header className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-end mb-10">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">
            Categoria 1 / Region de Valparaiso
          </p>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
            Proyecto 1
          </h1>
        </div>
        <p className="text-xs leading-relaxed text-justify border-l-2 border-black pl-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>

      {/* imagen principal panoramica */}
      <div className="w-full border border-black overflow-hidden mb-10 bg-neutral-100">
        <img
          src="/images/Casa-Camino-del-agua1.jpeg"
          alt="Vista principal Proyecto 1"
          className="w-full h-auto aspect-[16/9] object-cover grayscale"
        />
      </div>

      {/* franja de ficha tecnica en 4 columnas */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-black py-4 mb-12 gap-4 text-xs">
        <div>
          <span className="block text-[10px] uppercase text-neutral-500">
            Ubicación
          </span>
          <span className="font-bold">Región de Valparaíso</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase text-neutral-500">
            Superficie
          </span>
          <span className="font-bold">240 m²</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase text-neutral-500">
            Año
          </span>
          <span className="font-bold">2024</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase text-neutral-500">
            Categoría
          </span>
          <span className="font-bold">Categoria 1</span>
        </div>
      </div>

      {/* memoria descriptiva en 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-[12.5px] leading-[1.75] text-justify mb-14">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>

      {/* lamina axonometrica */}
      <div className="border border-black p-4 md:p-8 bg-white">
        <div className="flex items-center justify-between border-b border-black pb-3 mb-6 text-[11px] uppercase">
          <span>Lámina 01 — Axonometría emplazamiento</span>
          <span>Escala S/E</span>
        </div>
        <img
          src="/images/Casa-Camino-del-agua2.jpeg"
          alt="Axonometría Proyecto 1"
          className="w-full h-auto object-contain grayscale"
        />
      </div>
    </article>
  );
}
