"use client";

import React from "react";

interface ProyectoPageProps {
  onBack: () => void;
}

// pagina individual de diseno libre para proyecto 2 (columna tecnica lateral + despiece modular)
export function Proyecto2Page({ onBack }: ProyectoPageProps) {
  return (
    <article className="w-full max-w-[1080px] mx-auto font-mono text-black">
      {/* navegacion superior */}
      <div className="flex items-center justify-between border-b border-black pb-4 mb-10">
        <button
          type="button"
          onClick={onBack}
          className="text-xs md:text-[13px] font-mono text-black hover:text-[#E60000] transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>&lt; Volver a proyectos</span>
        </button>
        <span className="border border-black px-2 py-1 text-xs font-mono">
          02
        </span>
      </div>

      {/* composicion asimetrica: ficha lateral a la izquierda + vista aerea a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 mb-14 items-start">
        <div className="border border-black p-6 flex flex-col gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
              Categoria 2 / Sistema Modular
            </p>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Proyecto 2
            </h1>
          </div>

          <div className="space-y-3 border-y border-black py-4 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Código</span>
              <span className="font-bold">MOD-F35</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Tipología</span>
              <span className="font-bold">Categoria 2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Estructura</span>
              <span className="font-bold">Acero / Panel SIP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Estado</span>
              <span className="font-bold">Proyecto Ejecutivo</span>
            </div>
          </div>

          <p className="text-xs leading-[1.7] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>
        </div>

        <div className="border border-black overflow-hidden bg-neutral-100">
          <img
            src="/images/CASA-MODULO-F351.jpeg"
            alt="Vista aérea Proyecto 2"
            className="w-full h-auto aspect-[16/10] object-cover grayscale"
          />
        </div>
      </div>

      {/* 3 bloques tecnicos modulares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="border border-black p-5">
          <span className="text-[11px] font-bold block mb-2">
            02.1 / PREFABRICACIÓN
          </span>
          <p className="text-xs leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="border border-black p-5">
          <span className="text-[11px] font-bold block mb-2">
            02.2 / ENSAMBLAJE EN OBRA
          </span>
          <p className="text-xs leading-relaxed text-justify">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="border border-black p-5">
          <span className="text-[11px] font-bold block mb-2">
            02.3 / EFICIENCIA TÉRMICA
          </span>
          <p className="text-xs leading-relaxed text-justify">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      {/* despiece isometrico y elevaciones */}
      <div className="border border-black p-6 md:p-10 bg-white">
        <div className="flex items-center justify-between border-b border-black pb-3 mb-6 text-[11px] uppercase">
          <span>Despiece axonométrico explotado y elevaciones</span>
          <span>Lámina Técnica 02</span>
        </div>
        <img
          src="/images/CASA-MODULO-F352.jpeg"
          alt="Despiece isométrico Proyecto 2"
          className="w-full h-auto object-contain grayscale"
        />
      </div>
    </article>
  );
}
