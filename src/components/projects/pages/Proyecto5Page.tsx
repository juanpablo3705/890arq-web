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

// proyecto 5: isometria vertical a la izquierda y recorrido fotografico con memoria a la derecha
export function Proyecto5Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-5");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
        <ProjectTitle project={project} />
        <p className="text-xs text-[#737373] tabular-nums">
          {project.location} · {project.area} · 4 Niveles
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <figure className="lg:col-span-5">
          <div className="flex items-start gap-[7px]">
            <ProjectVerticalTag label={project.category} theme={theme} />
            <div className="flex-1 min-w-0 border border-black p-4 md:p-6 bg-white">
              <img
                src="/images/Proyecto-Codequir2.jpeg"
                alt={`Axonometría por niveles ${project.title}`}
                decoding="async"
                className="block w-full h-auto object-contain"
              />
            </div>
          </div>
          <figcaption className="mt-2.5 text-[11px] text-[#737373]">
            Isometría explotada por niveles
          </figcaption>
        </figure>

        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Proyecto-Codequir1.jpeg"
              alt={`Pasarelas interiores ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[16/10] object-cover"
            />
          </div>

          <div className="text-xs leading-[1.7] space-y-4">
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
              alt={`Acceso exterior ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[16/9] object-cover"
            />
          </div>
        </div>
      </div>

      <ProjectBackLink theme={theme} onBack={onBack} />
    </article>
  );
}
