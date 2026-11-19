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

// pagina individual proyecto 3: diptico fotografico con etiquetas verticales + planimetria
export function Proyecto3Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-3");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      {/* encabezado editorial alineado al marco comun */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
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

      {/* diptico fotografico con franjas verticales coherentes con proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-start gap-[7px]">
          <ProjectVerticalTag label="Exterior Norte · 03.A" theme={theme} />
          <div className="flex-1 min-w-0 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Cabanas-Ocoa1.jpeg"
              alt={`Vista exterior ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="flex items-start gap-[7px]">
          <span className="site-vertical-tag bg-black text-white font-mono font-normal whitespace-nowrap select-none shrink-0">
            Módulo Habitacional · 03.B
          </span>
          <div className="flex-1 min-w-0 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Rubica1.jpeg"
              alt={`Módulo complementario ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>

      {/* ficha tecnica lateral + memoria descriptiva en 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-y border-black py-7 mb-12">
        <dl className="lg:col-span-3 space-y-2.5 text-xs">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
              Emplazamiento
            </dt>
            <dd className="font-semibold">Valle de Ocoa</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
              Superficie
            </dt>
            <dd className="font-semibold tabular-nums">{project.area}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
              Materialidad
            </dt>
            <dd className="font-semibold">Madera / Acero</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
              Escala
            </dt>
            <dd className="font-semibold tabular-nums">1:50</dd>
          </div>
        </dl>

        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-[1.65]">
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
      <div className="border border-black p-4 md:p-6 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-3 mb-5 text-[11px] uppercase tracking-[0.04em]">
          <span>Plantas de arquitectura y elevaciones</span>
          <span className="text-[#737373] tabular-nums">Escala 1:50</span>
        </div>
        <img
          src="/images/Cabanas-Ocoa2.jpeg"
          alt={`Planimetría ${project.title}`}
          decoding="async"
          className="block w-full h-auto object-contain"
        />
      </div>

      <ProjectFooterBar project={project} theme={theme} onBack={onBack} />
    </article>
  );
}
