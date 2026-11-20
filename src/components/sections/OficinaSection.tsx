"use client";

import React, { useState } from "react";
import { ConceptNetwork } from "./ConceptNetwork";

interface ServicePillar {
  prefix: string;
  emphasis: string;
  items: string[];
}

// 5 pilares de servicios del estudio
const SERVICE_PILLARS: ServicePillar[] = [
  {
    prefix: "DISEÑO Y",
    emphasis: "GESTIÓN",
    items: [
      "Diseño arquitectónico.",
      "Paisajismo.",
      "Gestión inmobiliaria.",
      "Proyecto espacios públicos.",
    ],
  },
  {
    prefix: "TRAMITACIÓN",
    emphasis: "MUNICIPAL",
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
    prefix: "EJECUCIÓN",
    emphasis: "DE OBRA",
    items: [
      "Planificación de obra.",
      "Gestión de construcción.",
      "Edificaciones de escala intermedia.",
      "Obra nueva residencial.",
      "Obra nueva comercial.",
    ],
  },
  {
    prefix: "ASESORÍA",
    emphasis: "DE OBRA",
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
    prefix: "",
    emphasis: "REMODELACIONES",
    items: [
      "Remodelación parcial de obra.",
      "Remodelación total de obra.",
      "Ejecución obra intermedia.",
      "Ejecución obra menor.",
    ],
  },
];

// integrantes del equipo para tarjetas giratorias 3d
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

// posicionamiento en grilla: 3 columnas arriba y los 2 ultimos pilares centrados debajo
const PILLAR_GRID_PLACEMENT: Record<number, string> = {
  3: "sm:col-span-2 lg:col-[2/span_2]",
  4: "sm:col-[2/span_2] lg:col-[4/span_2]",
};

// seccion oficina minimalista y depurada
export function OficinaSection() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-label="Oficina 890 ARQ" className="site-section">
      <div className="site-container">
        <div className="flex flex-col gap-24 md:gap-28">
          {/* estudio: fotografia y resena institucional en composicion 7/5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 border border-black overflow-hidden bg-neutral-100">
              <img
                src="/images/OFI.D-1024x683.jpeg"
                alt="Oficina de arquitectura 890 ARQ"
                decoding="async"
                className="block w-full h-auto aspect-[3/2] object-cover grayscale"
              />
            </div>

            <div className="lg:col-span-5 font-mono text-xs leading-[1.7] font-normal text-black space-y-5">
              <p>
                Iniciando sus actividades durante el año 2020, el estudio de
                arquitectura <strong className="font-semibold">890 ARQ</strong>{" "}
                ha generado una expansión y diversificación de sus labores con
                el objetivo de abarcar gran parte de las aristas que dan cabida
                al desarrollo de proyectos.
              </p>
              <p>
                Bajo la conformación de{" "}
                <strong className="font-semibold">890 ARQ LTDA.</strong> se da
                cabida a proyectos de diseño de inmuebles y paisajismo, además
                de tramitaciones municipales de obra, regularizaciones,
                tasaciones inmobiliarias particulares y comerciales,
                subdivisiones prediales, cambios de uso de suelo, entre otras
                funciones.
              </p>
              <p>
                Por otro lado, bajo el alero de{" "}
                <strong className="font-semibold">890 ARQ SpA</strong> se
                realizan tareas de construcción y ejecución de obras, además de
                la rehabilitación, ampliación y remodelación de espacios.
              </p>
            </div>
          </div>

          {/* equipo: 4 tarjetas cuadradas interactivas sin elementos redundantes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
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
                  className="flip-card block w-full aspect-square border border-black bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4"
                >
                  <span className="flip-card-inner block">
                    <span className="flip-card-front block overflow-hidden">
                      <img
                        src={member.src}
                        alt={member.alt}
                        decoding="async"
                        className="block w-full h-full object-cover grayscale"
                      />
                    </span>
                    <span className="flip-card-back font-mono">
                      <span className="block text-[0.95rem] sm:text-[1.05rem] leading-[1.2] font-medium mb-2.5">
                        {member.name}
                      </span>
                      {member.credentials.map((cred) => (
                        <span
                          key={cred}
                          className="block text-[0.7rem] sm:text-[0.75rem] leading-[1.45] font-normal mb-2"
                        >
                          {cred}
                        </span>
                      ))}
                      <span className="block text-[0.8rem] sm:text-[0.9rem] leading-[1.25] font-medium mt-1">
                        {member.role}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* vision en dos columnas limpias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-mono text-xs leading-[1.7] font-normal text-black">
            <p>
              En términos de diseño arquitectónico y construcción,{" "}
              <strong className="font-semibold">890 ARQ</strong> se enfoca en
              alcanzar un desarrollo sostenible de sus proyectos, con énfasis en
              el diseño elemental y modular de las obras realizadas,
              profundizando en el aprovechamiento de las condiciones
              particulares de cada emplazamiento y la optimización constructiva.
            </p>
            <p>
              De manera simultánea, para toda clase de proyectos de arquitectura
              y obras civiles se busca establecer un canal de comunicación
              transparente con cada cliente, a modo de entregar soluciones
              expeditas y personalizadas tanto en diseño y gestión municipal (
              <strong className="font-semibold">890 ARQ Ltda.</strong>) como en
              ejecución constructiva (
              <strong className="font-semibold">890 ARQ SpA</strong>).
            </p>
          </div>

          {/* mapa conceptual animado sobre blanco puro */}
          <div>
            <ConceptNetwork />
          </div>

          {/* servicios en grilla tipografica abierta con ultima fila centrada */}
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-12">
            {SERVICE_PILLARS.map((pillar, index) => (
              <div
                key={pillar.emphasis + pillar.prefix}
                className={PILLAR_GRID_PLACEMENT[index] ?? "sm:col-span-2"}
              >
                <h2 className="font-mono text-[13px] leading-[1.25] tracking-[-0.01em] text-black uppercase mb-4">
                  {pillar.prefix ? (
                    <>
                      <span className="font-normal">{pillar.prefix} </span>
                      <span className="font-bold italic">
                        {pillar.emphasis}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold italic">
                      {pillar.emphasis}
                    </span>
                  )}
                </h2>

                <ul className="font-mono text-xs leading-[1.6] font-normal text-black space-y-1.5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-[#737373] select-none shrink-0"
                      >
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* linea final de creditos al cierre de oficina sin separador superior */}
        <footer className="mt-24 md:mt-28 text-center font-mono text-xs leading-normal font-normal text-[#737373]">
          Diseño y Desarrollo Web:{" "}
          <a
            href="https://personal-web-gamma-six.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Juan Pablo Oyanedel
          </a>{" "}
          • Diseño /home:{" "}
          <a
            href="mailto:zett.webdesign@gmail.com"
            className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Gabriela Zett
          </a>
        </footer>
      </div>
    </section>
  );
}
