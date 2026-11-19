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

// pagina individual proyecto 4: tabla tecnica superior + planimetria + memoria + fotografia
export function Proyecto4Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-4");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      {/* cabecera en tabla tecnica */}
      <header className="border border-black mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_220px] divide-y md:divide-y-0 md:divide-x divide-black">
          <div className="p-6">
            <p className="text-[11px] uppercase tracking-[0.04em] text-[#737373] mb-2">
              {project.category} · {project.location}
            </p>
            <ProjectTitle project={project} />
          </div>
          <div className="p-6 text-xs flex flex-col justify-center">
            <span className="text-[#737373] uppercase tracking-[0.04em] text-[10px]">
              Programa
            </span>
            <span className="font-semibold mt-1">Vivienda Unifamiliar</span>
          </div>
          <div className="p-6 text-xs flex flex-col justify-center">
            <span className="text-[#737373] uppercase tracking-[0.04em] text-[10px]">
              Superficie Total
            </span>
            <span className="font-semibold mt-1 tabular-nums">
              {project.area}
            </span>
          </div>
        </div>
      </header>

      {/* lamina planimetrica principal con franja vertical */}
      <div className="flex items-start gap-[7px] mb-12">
        <ProjectVerticalTag label={project.category} theme={theme} />
        <div className="flex-1 min-w-0 border border-black p-4 md:p-6 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-3 mb-5 text-[11px] uppercase tracking-[0.04em]">
            <span>Planta de emplazamiento y cortes longitudinales</span>
            <span className="text-[#737373] tabular-nums">Lámina 04.1</span>
          </div>
          <img
            src="/images/Casa-Ojos-del-Caburga2.jpeg"
            alt={`Planimetría ${project.title}`}
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 3 columnas de memoria descriptiva */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-[1.65] mb-12">
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

      {/* fotografia exterior al cierre */}
      <div className="border border-black overflow-hidden bg-neutral-100">
        <img
          src="/images/Casa-Ojos-del-Caburga1.jpeg"
          alt={`Vista exterior ${project.title}`}
          decoding="async"
          className="block w-full h-auto aspect-[16/9] object-cover"
        />
      </div>

      <ProjectFooterBar project={project} theme={theme} onBack={onBack} />
    </article>
  );
}
