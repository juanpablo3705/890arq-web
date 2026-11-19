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

// proyecto 2: ficha lateral abierta, vista aerea y despiece isometrico
export function Proyecto2Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-2");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ProjectTitle project={project} className="text-lg md:text-xl" />

          <dl className="space-y-2 text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-[#737373]">Ubicación</dt>
              <dd className="text-right">{project.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#737373]">Superficie</dt>
              <dd className="tabular-nums">{project.area}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#737373]">Código</dt>
              <dd className="tabular-nums">MOD-F35</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#737373]">Estructura</dt>
              <dd>Acero / Panel SIP</dd>
            </div>
          </dl>

          <p className="text-xs leading-[1.7]">{project.excerpt}</p>
        </div>

        <div className="lg:col-span-8 flex items-start gap-[7px]">
          <ProjectVerticalTag label={project.category} theme={theme} />
          <div className="flex-1 min-w-0 border border-black overflow-hidden bg-neutral-100">
            <img
              src="/images/CASA-MODULO-F351.jpeg"
              alt={`Vista aérea ${project.title}`}
              decoding="async"
              className="block w-full h-auto aspect-[16/10] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-14 text-xs leading-[1.7]">
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-[-0.01em] mb-2">
            Prefabricación
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-[-0.01em] mb-2">
            Ensamblaje en obra
          </h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-[-0.01em] mb-2">
            Eficiencia térmica
          </h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      <figure>
        <div className="border border-black p-4 md:p-8 bg-white">
          <img
            src="/images/CASA-MODULO-F352.jpeg"
            alt={`Despiece isométrico ${project.title}`}
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
        <figcaption className="mt-2.5 text-[11px] text-[#737373]">
          Despiece axonométrico explotado y elevaciones
        </figcaption>
      </figure>

      <ProjectBackLink theme={theme} onBack={onBack} />
    </article>
  );
}
