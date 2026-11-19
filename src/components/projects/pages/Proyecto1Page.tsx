"use client";

import React from "react";
import {
  getProjectMeta,
  ProjectBackLink,
  ProjectTitle,
  ProjectTopBar,
  ProjectVerticalTag,
} from "../ProjectDetailChrome";

interface ProyectoPageProps {
  onBack: () => void;
}

// proyecto 1: apertura panoramica, memoria en dos columnas y axonometria
export function Proyecto1Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-1");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
        <ProjectTitle project={project} />
        <p className="text-xs text-[#737373] tabular-nums">
          {project.location} · {project.area} · 2024
        </p>
      </header>

      <div className="flex items-start gap-[7px] mb-12">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs leading-[1.7] mb-14">
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

      <figure>
        <div className="border border-black p-4 md:p-8 bg-white">
          <img
            src="/images/Casa-Camino-del-agua2.jpeg"
            alt={`Axonometría ${project.title}`}
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
        <figcaption className="mt-2.5 text-[11px] text-[#737373]">
          Axonometría de emplazamiento
        </figcaption>
      </figure>

      <ProjectBackLink theme={theme} onBack={onBack} />
    </article>
  );
}
