"use client";

import React from "react";

// datos de los 5 pilares de servicios
const SERVICE_PILLARS = [
  {
    title: "DISEÑO Y GESTIÓN",
    items: [
      "Diseño arquitectónico.",
      "Paisajismo.",
      "Gestión inmobiliaria.",
      "Proyecto espacios públicos.",
    ],
  },
  {
    title: "TRAMITACIÓN MUNICIPAL",
    items: [
      "Permiso de Edificación (obra mayor, menor y ampliación)",
      "Ley 20.898 (Ley del Mono)",
      "Recepción Municipal Definitiva",
      "Loteo, Subdivisión y Fusión.",
      "Obtención de patentes.",
      "Cambio de uso de suelo y/o destino.",
      "Informe Favorable para la Construcción (IFE).",
    ],
  },
  {
    title: "EJECUCIÓN DE OBRA",
    items: [
      "Planificación de obra.",
      "Gestión de construcción.",
      "Edificaciones de escala intermedia.",
      "Obra nueva residencial.",
      "Obra nueva comercial.",
    ],
  },
  {
    title: "ASESORÍA DE OBRA",
    items: [
      "Supervisión técnica.",
      "Inspección Técnica de Obra (ITO).",
      "Estudio de cabida.",
      "Carta de planificación de proyectos / Cronograma.",
      "Informe de habitabilidad.",
      "Cubicaje de recintos.",
      "Logística de materiales y transporte.",
    ],
  },
  {
    title: "REMODELACIONES",
    items: [
      "Remodelación parcial de obra.",
      "Remodelación total de obra.",
      "Ejecución obra intermedia.",
      "Ejecución obra menor.",
    ],
  },
];

// retratos del equipo en disposicion 2x2
const TEAM_MEMBERS = [
  {
    id: "vito",
    src: "/images/img890-vito-1.png",
    alt: "Integrante equipo 890 ARQ 1",
  },
  {
    id: "mpaz",
    src: "/images/img890-mpaz-1.png",
    alt: "Integrante equipo 890 ARQ 2",
  },
  {
    id: "cote",
    src: "/images/img890-cote-1.png",
    alt: "Integrante equipo 890 ARQ 3",
  },
  {
    id: "jp",
    src: "/images/img890-jp-1.png",
    alt: "Integrante equipo 890 ARQ 4",
  },
];

// seccion unificada de nosotros y servicios
export function NosotrosSection() {
  return (
    <section
      aria-label="Nosotros 890 ARQ"
      className="w-full min-h-screen bg-white pt-32 pb-36 px-6 md:px-16"
    >
      <div className="w-full max-w-[1140px] mx-auto flex flex-col gap-28 md:gap-36">
        {/* bloque nosotros */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10 lg:pl-[110px]">
          <div className="w-full md:w-[76px] flex items-center justify-start md:justify-center shrink-0">
            <h2 className="font-mono text-xl md:text-[22px] font-bold tracking-wider text-black whitespace-nowrap md:-rotate-90 select-none">
              NOSOTROS &gt;
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] items-center gap-8 lg:gap-12">
            <div className="w-full overflow-hidden bg-neutral-100">
              <img
                src="/images/OFI.D-1024x683.jpeg"
                alt="Oficina de arquitectura 890 ARQ"
                className="w-full h-auto aspect-[3/2] object-cover grayscale"
              />
            </div>

            <div className="font-mono text-[12px] md:text-[12.5px] leading-[1.68] text-black text-justify space-y-5">
              <p>
                Iniciando sus actividades durante el año 2020, el estudio de
                arquitectura <strong className="font-bold">890 ARQ</strong> ha
                generado una expansión y diversificación de sus labores con el
                objetivo de abarcar gran parte de las aristas que dan cabida al
                desarrollo de proyectos.
              </p>
              <p>
                Bajo la conformación de{" "}
                <strong className="font-bold">890 ARQ LTDA.</strong> se da
                cabida a proyectos de diseño de inmuebles y paisajismo, además
                de tramitaciones municipales de obra, regularizaciones,
                tasaciones inmobiliarias particulares y comerciales,
                subdivisiones prediales, cambios de uso de suelo, entre otras
                funciones.
              </p>
              <p>
                Por otro lado, bajo el alero de{" "}
                <strong className="font-bold">890 ARQ SpA</strong> se realizan
                tareas de construcción y ejecución de obras, además de la
                rehabilitación, ampliación y remodelación de espacios.
              </p>
            </div>
          </div>
        </div>

        {/* bloque equipo */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10 lg:pl-[110px]">
          <div className="w-full md:w-[76px] flex items-center justify-start md:justify-center shrink-0 md:mt-24">
            <h2 className="font-mono text-xl md:text-[22px] font-bold tracking-wider text-black whitespace-nowrap md:-rotate-90 select-none">
              EQUIPO &gt;
            </h2>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-28 gap-y-10 max-w-[660px] mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="w-full max-w-[260px] mx-auto aspect-square overflow-hidden bg-neutral-100"
                >
                  <img
                    src={member.src}
                    alt={member.alt}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bloque vision */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10 lg:pl-[110px]">
          <div className="w-full md:w-[76px] flex items-center justify-start md:justify-center shrink-0">
            <h2 className="font-mono text-xl md:text-[22px] font-bold tracking-wider text-black whitespace-nowrap md:-rotate-90 select-none">
              VISIÓN &gt;
            </h2>
          </div>

          <div className="flex-1 w-full">
            <div className="max-w-[660px] mx-auto font-mono text-[12px] md:text-[12.5px] leading-[1.68] text-black text-justify space-y-5">
              <p>
                En términos de diseño arquitectónico y construcción,{" "}
                <strong className="font-bold">890 ARQ</strong> se enfoca en
                alcanzar un desarrollo sostenible de sus proyectos, con énfasis
                en el diseño elemental y modular de las obras realizadas,
                profundizando en el aprovechamiento de las condiciones
                particulares de cada emplazamiento y la optimización
                constructiva.
              </p>
              <p>
                De manera simultánea, para toda clase de proyectos de
                arquitectura y obras civiles se busca establecer un canal de
                comunicación transparente con cada cliente, a modo de entregar
                soluciones expeditas y personalizadas tanto en diseño y gestión
                municipal (<strong className="font-bold">890 ARQ Ltda.</strong>)
                como en ejecución constructiva (
                <strong className="font-bold">890 ARQ SpA</strong>).
              </p>
            </div>
          </div>
        </div>

        {/* mapa conceptual arquitectonico */}
        <div className="w-full flex flex-col items-center justify-center lg:pl-[110px]">
          <figure className="w-full max-w-[820px] mx-auto">
            <img
              src="/images/IMAGENES-WEB-01-2048x1152.jpg"
              alt="Mapa conceptual de arquitectura y construcción 890 ARQ"
              className="w-full h-auto object-contain select-none"
            />
            <figcaption className="sr-only">
              ARQUITECTURA, CONSTRUCCIÓN, Diseño y gestión, Diseño
              arquitectónico, Planificación, Gestión inmobiliaria, Ejecución de
              obra, Planificación de obra, Gestión construcción, Supervisión
              técnica, Remodelaciones, Remodelación parcial, Remodelación total,
              Tasación, Cambio uso de suelo, Tasación comercial, Subdivisión /
              Loteos / Fusión, Estudio de cabida, Tramitación municipal,
              Patentes comerciales, Permiso de obra nueva, Consultoría/Asesoría,
              Estudio de factibilidad comercial.
            </figcaption>
          </figure>
        </div>

        {/* pilares de servicios */}
        <div className="w-full lg:pl-[110px]">
          <div className="max-w-[660px] mx-auto flex flex-col gap-12 md:gap-16">
            {SERVICE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start md:items-center gap-4 md:gap-12"
              >
                <h3 className="font-mono text-[15px] md:text-[16px] font-bold tracking-tight text-black uppercase leading-snug">
                  {pillar.title}
                </h3>

                <ul className="font-mono text-[12px] md:text-[12.5px] leading-[1.68] text-black space-y-0.5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="select-none">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
