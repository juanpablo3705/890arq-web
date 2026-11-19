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

// pagina individual proyecto 2: ficha tecnica lateral + 3 modulos + despiece isometrico
export function Proyecto2Page({ onBack }: ProyectoPageProps) {
  const { project, theme } = getProjectMeta("proyecto-2");

  return (
    <article className="w-full font-mono text-black">
      <ProjectTopBar project={project} theme={theme} onBack={onBack} />

      {/* composicion asimetrica: ficha lateral izquierda + vista aerea derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12 items-start">
        <div className="lg:col-span-4 border border-black p-6 flex flex-col gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.04em] text-[#737373] mb-2">
              {project.category} · {project.location}
            </p>
            <ProjectTitle project={project} className="text-lg md:text-xl" />
          </div>

          <dl className="space-y-3 border-y border-black py-4 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                Código
              </dt>
              <dd className="font-semibold tabular-nums">MOD-F35</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                Superficie
              </dt>
              <dd className="font-semibold tabular-nums">{project.area}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                Estructura
              </dt>
              <dd className="font-semibold">Acero / Panel SIP</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                Estado
              </dt>
              <dd className="font-semibold">Proyecto Ejecutivo</dd>
            </div>
          </dl>

          <p className="text-xs leading-[1.65]">{project.excerpt}</p>
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

      {/* 3 bloques tecnicos modulares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-black p-5">
          <p className="text-[12px] tracking-[-0.01em] uppercase mb-2.5">
            <span className="font-normal text-[#737373] tabular-nums">
              02.1 /{" "}
            </span>
            <span className="font-bold italic">PREFABRICACIÓN</span>
          </p>
          <p className="text-xs leading-[1.6]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="border border-black p-5">
          <p className="text-[12px] tracking-[-0.01em] uppercase mb-2.5">
            <span className="font-normal text-[#737373] tabular-nums">
              02.2 /{" "}
            </span>
            <span className="font-bold italic">ENSAMBLAJE EN OBRA</span>
          </p>
          <p className="text-xs leading-[1.6]">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="border border-black p-5">
          <p className="text-[12px] tracking-[-0.01em] uppercase mb-2.5">
            <span className="font-normal text-[#737373] tabular-nums">
              02.3 /{" "}
            </span>
            <span className="font-bold italic">EFICIENCIA TÉRMICA</span>
          </p>
          <p className="text-xs leading-[1.6]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      {/* despiece isometrico y elevaciones */}
      <div className="border border-black p-4 md:p-6 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-3 mb-5 text-[11px] uppercase tracking-[0.04em]">
          <span>Despiece axonométrico explotado y elevaciones</span>
          <span className="text-[#737373]">Lámina Técnica 02</span>
        </div>
        <img
          src="/images/CASA-MODULO-F352.jpeg"
          alt={`Despiece isométrico ${project.title}`}
          decoding="async"
          className="block w-full h-auto object-contain"
        />
      </div>

      <ProjectFooterBar project={project} theme={theme} onBack={onBack} />
    </article>
  );
}
