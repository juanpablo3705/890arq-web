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

// pagina individual proyecto 5: dossier vertical con axonometria de 4 niveles
export function Proyecto5Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-5");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      {/* encabezado con resumen tecnico */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.04em] text-[#737373] mb-2">
            {project.category} · {project.location}
          </p>
          <ProjectTitle project={project} />
        </div>
        <div className="border border-black px-4 py-2.5 text-xs tabular-nums">
          <span>Superficie: {project.area} · 4 Niveles</span>
        </div>
      </header>

      {/* grilla dividida: axonometria vertical izquierda + fotografias y memoria derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-5 flex items-start gap-[7px]">
          <ProjectVerticalTag label={project.category} theme={theme} />
          <div className="flex-1 min-w-0 border border-black p-4 bg-white">
            <div className="border-b border-black pb-2.5 mb-4 text-[11px] uppercase tracking-[0.04em] flex justify-between gap-2">
              <span>Isometría Explotada</span>
              <span className="text-[#737373] tabular-nums">05.ISO</span>
            </div>
            <img
              src="/images/Proyecto-Codequir2.jpeg"
              alt={`Axonometría por niveles ${project.title}`}
              decoding="async"
              className="block w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/Proyecto-Codequir1.jpeg"
              alt={`Pasarelas interiores ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[16/10] object-cover"
            />
          </div>

          <div className="text-xs leading-[1.65] space-y-4">
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

      <ProjectFooterBar project={project} theme={theme} onBack={onBack} />
    </article>
  );
}
