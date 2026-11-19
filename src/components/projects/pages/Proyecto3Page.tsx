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

// proyecto 3: diptico fotografico limpio, memoria y planimetria
export function Proyecto3Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-3");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
        <ProjectTitle project={project} />
        <p className="text-xs text-[#737373] tabular-nums">
          {project.location} · {project.area} · Madera / Acero
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div className="flex items-start gap-[7px]">
          <ProjectVerticalTag label={project.category} theme={theme} />
          <div className="flex-1 min-w-0 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Cabanas-Ocoa1.jpeg"
              alt={`Vista exterior ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="border border-black overflow-hidden bg-neutral-100">
          <img
            src="/images/Rubica1.jpeg"
            alt={`Módulo complementario ${project.title}`}
            decoding="async"
            className="block w-full h-auto aspect-[4/3] object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs leading-[1.7] mb-14">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </p>
      </div>

      <figure>
        <div className="border border-black p-4 md:p-8 bg-white">
          <img
            src="/images/Cabanas-Ocoa2.jpeg"
            alt={`Planimetría ${project.title}`}
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
        <figcaption className="mt-2.5 text-[11px] text-[#737373] tabular-nums">
          Plantas de arquitectura y elevaciones · Escala 1:50
        </figcaption>
      </figure>

      <ProjectBackLink theme={theme} onBack={onBack} />
    </article>
  );
}
