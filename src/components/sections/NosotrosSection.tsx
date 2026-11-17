"use client";

import React, { useState } from "react";

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

// integrantes del equipo con datos para el reverso de la tarjeta
const TEAM_MEMBERS = [
  {
    id: "vito",
    src: "/images/img890-vito-1.png",
    alt: "Victor Flores Aguilera",
    name: "Victor Flores Aguilera",
    credentials: ["Arquitecto PUCV", "Tasador PUC"],
    role: "CEO y Fundador 890ARQ",
  },
  {
    id: "mpaz",
    src: "/images/img890-mpaz-1.png",
    alt: "María Paz Zett",
    name: "María Paz Zett",
    credentials: ["Arquitecta PUCV"],
    role: "Directora Área Construcción",
  },
  {
    id: "cote",
    src: "/images/img890-cote-1.png",
    alt: "María José Espinosa",
    name: "María José Espinosa",
    credentials: ["Arquitecta PUC", "Magister Arquitectura PUC"],
    role: "Directora Área Arquitectura",
  },
  {
    id: "jp",
    src: "/images/img890-jp-1.png",
    alt: "Juan Pablo Oyanedel",
    name: "Juan Pablo Oyanedel",
    credentials: ["Analista Programador"],
    role: "Desarrollador web",
  },
];

// seccion unificada de nosotros y servicios
export function NosotrosSection() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-label="Nosotros 890 ARQ"
      className="w-full min-h-screen bg-white pt-32 md:pt-44 pb-24 sm:pb-14 px-6 md:px-16"
    >
      <div className="w-full max-w-[1120px] mx-auto flex flex-col gap-20 md:gap-28">
        {/* imagen ancha superior de la oficina */}
        <div className="w-full overflow-hidden bg-neutral-100">
          <img
            src="/images/OFI.D-1024x683.jpeg"
            alt="Oficina de arquitectura 890 ARQ"
            className="w-full h-auto aspect-[3/2] object-cover grayscale"
          />
        </div>

        {/* texto institucional centrado bajo la foto */}
        <div className="w-full max-w-[660px] mx-auto font-mono text-xs leading-[1.5] font-normal text-black text-center space-y-5">
          <p>
            Iniciando sus actividades durante el año 2020, el estudio de
            arquitectura <strong className="font-semibold">890 ARQ</strong> ha
            generado una expansión y diversificación de sus labores con el
            objetivo de abarcar gran parte de las aristas que dan cabida al
            desarrollo de proyectos.
          </p>
          <p>
            Bajo la conformación de{" "}
            <strong className="font-semibold">890 ARQ LTDA.</strong> se da
            cabida a proyectos de diseño de inmuebles y paisajismo, además de
            tramitaciones municipales de obra, regularizaciones, tasaciones
            inmobiliarias particulares y comerciales, subdivisiones prediales,
            cambios de uso de suelo, entre otras funciones.
          </p>
          <p>
            Por otro lado, bajo el alero de{" "}
            <strong className="font-semibold">890 ARQ SpA</strong> se realizan
            tareas de construcción y ejecución de obras, además de la
            rehabilitación, ampliación y remodelación de espacios.
          </p>
        </div>

        {/* grilla 2x2 de tarjetas giratorias del equipo */}
        <div className="w-full max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-x-[100px] md:gap-y-12 place-items-center">
          {TEAM_MEMBERS.map((member) => {
            const isFlipped = flippedId === member.id;
            return (
              <button
                key={member.id}
                type="button"
                aria-pressed={isFlipped}
                aria-label={`${member.name}, ${member.role}`}
                data-flipped={isFlipped ? "true" : "false"}
                onClick={() => toggleCard(member.id)}
                className="flip-card block w-full max-w-[300px] aspect-square border-0 bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4"
              >
                <span className="flip-card-inner block">
                  <span className="flip-card-front block">
                    <img
                      src={member.src}
                      alt={member.alt}
                      className="w-full h-full object-cover grayscale"
                    />
                  </span>
                  <span className="flip-card-back font-mono">
                    <span className="block text-[0.75rem] sm:text-[0.9rem] leading-[1.2] font-medium mt-1 mb-2.5">
                      {member.name}
                    </span>
                    {member.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="block text-[0.525rem] sm:text-[0.6rem] leading-[1.5] font-normal mb-2"
                      >
                        {cred}
                      </span>
                    ))}
                    <span className="block text-[0.675rem] sm:text-[0.75rem] leading-[1.2] font-medium mt-1 mb-2.5">
                      {member.role}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* bloque vision */}
        <div className="w-full max-w-[660px] mx-auto font-mono text-xs leading-[1.5] font-normal text-black text-justify space-y-5">
          <p>
            En términos de diseño arquitectónico y construcción,{" "}
            <strong className="font-semibold">890 ARQ</strong> se enfoca en
            alcanzar un desarrollo sostenible de sus proyectos, con énfasis en
            el diseño elemental y modular de las obras realizadas, profundizando
            en el aprovechamiento de las condiciones particulares de cada
            emplazamiento y la optimización constructiva.
          </p>
          <p>
            De manera simultánea, para toda clase de proyectos de arquitectura y
            obras civiles se busca establecer un canal de comunicación
            transparente con cada cliente, a modo de entregar soluciones
            expeditas y personalizadas tanto en diseño y gestión municipal (
            <strong className="font-semibold">890 ARQ Ltda.</strong>) como en
            ejecución constructiva (
            <strong className="font-semibold">890 ARQ SpA</strong>).
          </p>
        </div>

        {/* mapa conceptual arquitectonico */}
        <div className="w-full flex flex-col items-center justify-center">
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
        <div className="w-full">
          <div className="max-w-[660px] mx-auto flex flex-col gap-12 md:gap-16">
            {SERVICE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start md:items-center gap-4 md:gap-12"
              >
                <h3 className="font-mono text-base font-bold tracking-tight text-black uppercase leading-snug">
                  {pillar.title}
                </h3>

                <ul className="font-mono text-xs leading-[1.5] font-normal text-black space-y-1">
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

      {/* linea final de creditos al cierre de nosotros */}
      <p className="mt-24 md:mt-32 text-center font-mono text-xs leading-normal font-normal text-[#737373] sm:px-24">
        v2.0 | Diseño UI:{" "}
        <a
          href="mailto:zett.webdesign@gmail.com"
          className="text-black transition-colors duration-200 hover:text-[#E60000] hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          Gabriela Zett
        </a>{" "}
        • Desarrollo Web:{" "}
        <a
          href="https://personal-web-gamma-six.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-colors duration-200 hover:text-[#E60000] hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          Juan Pablo Oyanedel
        </a>
      </p>
    </section>
  );
}
