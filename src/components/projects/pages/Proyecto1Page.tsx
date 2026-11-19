"use client";

import React from "react";
import {
  getProjectMeta,
  ProjectFooterBar,
  ProjectTitle,
  ProjectTopBar,
  ProjectVerticalTag,
} from "../ProjectDetailChrome";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual proyecto 1: apertura panoramica + ficha tecnica + axonometria
export function Proyecto1Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-1");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      {/* encabezado editorial alineado al riel izquierdo */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10">
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.04em] text-[#737373] mb-2">
            {project.category} · {project.location}
          </p>
          <ProjectTitle project={project} />
        </div>
        <p className="md:col-span-5 text-xs leading-[1.6] border-l-2 border-black pl-4">
          {project.excerpt}
        </p>
      </header>

      {/* vista panoramica principal con franja vertical de tipologia */}
      <div className="flex items-start gap-[7px] mb-10">
        <ProjectVerticalTag label={project.category} theme={theme} />
        <div className="flex-1 min-w-0 border border-black overflow-hidden bg-neutral-100">
          <img
            src="/images/Casa-Camino-del-agua1.jpeg"
            alt={`Vista principal ${project.title}`}
            decoding="async"
            className="block w-full h-auto aspect-[16/9] object-cover"
          />
        </div>
      </div>

      {/* ficha tecnica horizontal de 4 columnas */}
      <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-black py-4 mb-12 gap-4 text-xs">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
            Ubicación
          </dt>
          <dd className="mt-1 font-semibold">{project.location}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
            Superficie
          </dt>
          <dd className="mt-1 font-semibold tabular-nums">{project.area}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
            Año
          </dt>
          <dd className="mt-1 font-semibold tabular-nums">2024</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
            Tipología
          </dt>
          <dd className="mt-1 font-semibold">{project.category}</dd>
        </div>
      </dl>

      {/* memoria descriptiva en 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-xs leading-[1.65] mb-12">
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
      <div className="border border-black p-4 md:p-6 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-3 mb-5 text-[11px] uppercase tracking-[0.04em]">
          <span>Lámina 01 — Axonometría emplazamiento</span>
          <span className="text-[#737373]">Escala S/E</span>
        </div>
        <img
          src="/images/Casa-Camino-del-agua2.jpeg"
          alt={`Axonometría ${project.title}`}
          decoding="async"
          className="block w-full h-auto object-contain"
        />
      </div>

      <ProjectFooterBar project={project} theme={theme} onBack={onBack} />
    </article>
  );
}
