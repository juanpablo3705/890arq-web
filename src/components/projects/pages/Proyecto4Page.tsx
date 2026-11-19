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

// proyecto 4: planimetria protagonista, memoria en tres columnas y fotografia exterior
export function Proyecto4Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-4");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
        <ProjectTitle project={project} />
        <p className="text-xs text-[#737373] tabular-nums">
          {project.location} · {project.area} · Vivienda Unifamiliar
        </p>
      </header>

      <figure className="mb-14">
        <div className="flex items-start gap-[7px]">
          <ProjectVerticalTag label={project.category} theme={theme} />
          <div className="flex-1 min-w-0 border border-black p-4 md:p-8 bg-white">
            <img
              src="/images/Casa-Ojos-del-Caburga2.jpeg"
              alt={`Planimetría ${project.title}`}
              decoding="async"
              className="block w-full h-auto object-contain"
            />
          </div>
        </div>
        <figcaption className="mt-2.5 text-[11px] text-[#737373]">
          Planta de emplazamiento y cortes longitudinales
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-[1.7] mb-14">
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

      <div className="border border-black overflow-hidden bg-neutral-100">
        <img
          src="/images/Casa-Ojos-del-Caburga1.jpeg"
          alt={`Vista exterior ${project.title}`}
          decoding="async"
          className="block w-full h-auto aspect-[16/9] object-cover"
        />
      </div>

      <ProjectBackLink theme={theme} onBack={onBack} />
    </article>
  );
}
