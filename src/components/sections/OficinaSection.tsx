"use client";

import React, { useRef, useState } from "react";
import { ConceptNetwork } from "./ConceptNetwork";

interface ServicePillar {
  code: string;
  prefix: string;
  emphasis: string;
  items: string[];
}

// datos de los 5 pilares de servicios
const SERVICE_PILLARS: ServicePillar[] = [
  {
    code: "01",
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
    code: "02",
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
    code: "03",
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
    code: "04",
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
    code: "05",
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

// integrantes del equipo con datos para frente y reverso de la tarjeta
const TEAM_MEMBERS = [
  {
    id: "vito",
    code: "01",
    src: "/images/img890-vito-1.png",
    alt: "Victor Flores Aguilera",
    firstName: "Victor",
    lastName: "Flores Aguilera",
    name: "Victor Flores Aguilera",
    credentials: ["Arquitecto PUCV", "Tasador PUC"],
    role: "CEO y Fundador 890ARQ",
  },
  {
    id: "mpaz",
    code: "02",
    src: "/images/img890-mpaz-1.png",
    alt: "María Paz Zett",
    firstName: "María Paz",
    lastName: "Zett",
    name: "María Paz Zett",
    credentials: ["Arquitecta PUCV"],
    role: "Directora Área Construcción",
  },
  {
    id: "cote",
    code: "03",
    src: "/images/img890-cote-1.png",
    alt: "María José Espinosa",
    firstName: "María José",
    lastName: "Espinosa",
    name: "María José Espinosa",
    credentials: ["Arquitecta PUC", "Magister Arquitectura PUC"],
    role: "Directora Área Arquitectura",
  },
  {
    id: "jp",
    code: "04",
    src: "/images/img890-jp-1.png",
    alt: "Juan Pablo Oyanedel",
    firstName: "Juan Pablo",
    lastName: "Oyanedel",
    name: "Juan Pablo Oyanedel",
    credentials: ["Analista Programador"],
    role: "Desarrollador web",
  },
];

const SECTION_INDEX = [
  { id: "oficina-estudio", label: "01 Estudio" },
  { id: "oficina-equipo", label: "02 Equipo" },
  { id: "oficina-vision", label: "03 Visión" },
  { id: "oficina-mapa", label: "04 Disciplinas" },
  { id: "oficina-servicios", label: "05 Servicios" },
];

// seccion editorial unificada de oficina, equipo, vision y servicios
export function OficinaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const scrollToBand = (bandId: string) => {
    const target = sectionRef.current?.querySelector<HTMLElement>(`#${bandId}`);
    if (!target) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Oficina 890 ARQ"
      className="site-section"
    >
      <div className="site-container">
        {/* barra superior coherente con proyectos e indice de navegacion interna */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 border-b border-black pb-5 mb-12">
          <h2 className="font-mono text-lg md:text-xl font-bold tracking-tight text-black uppercase shrink-0">
            Oficina
          </h2>

          <nav
            aria-label="Índice de oficina"
            className="flex flex-wrap items-center gap-x-2.5 gap-y-2"
          >
            {SECTION_INDEX.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToBand(item.id)}
                className="site-inline-link font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="flex flex-col gap-20 md:gap-24">
          {/* 01 estudio: apertura editorial asimetrica 7/5 */}
          <div
            id="oficina-estudio"
            className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            <figure className="lg:col-span-7 flex items-start gap-[7px]">
              <span className="site-vertical-tag bg-black text-white font-mono font-normal whitespace-nowrap select-none shrink-0">
                Estudio · 2020
              </span>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="w-full aspect-[3/2] border border-black overflow-hidden bg-neutral-100">
                  <img
                    src="/images/OFI.D-1024x683.jpeg"
                    alt="Oficina de arquitectura 890 ARQ"
                    decoding="async"
                    className="block w-full h-full object-cover grayscale"
                  />
                </div>

                <figcaption className="pt-2.5 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[13px] sm:text-[14px] leading-[1.25] tracking-[-0.01em] text-black uppercase">
                      <span className="font-normal">OFICINA </span>
                      <span className="font-bold italic">890 ARQ</span>
                    </p>
                    <p className="mt-1 font-mono text-[11px] sm:text-[12px] leading-[1.4] text-black">
                      Región de Valparaíso, Chile.
                    </p>
                    <p className="font-mono text-[11px] sm:text-[12px] leading-[1.4] text-[#737373]">
                      Arquitectura · Construcción · Gestión Normativa
                    </p>
                  </div>

                  <div className="site-index-box shrink-0 font-mono">
                    <span className="text-[10px] tracking-[0.04em] font-normal uppercase">
                      EST.
                    </span>
                    <span className="text-[12px] font-semibold tabular-nums">
                      2020
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>

            <div className="lg:col-span-5 flex flex-col gap-6 font-mono text-black">
              <div className="flex items-center justify-between border-b border-black pb-2.5 text-[11px] uppercase tracking-[0.04em]">
                <span className="font-bold">01 / Estudio</span>
                <span className="text-[#737373] tabular-nums">LTDA. + SPA</span>
              </div>

              <p className="text-xs leading-[1.65] font-normal">
                Iniciando sus actividades durante el año 2020, el estudio de
                arquitectura <strong className="font-semibold">890 ARQ</strong>{" "}
                ha generado una expansión y diversificación de sus labores con
                el objetivo de abarcar gran parte de las aristas que dan cabida
                al desarrollo de proyectos.
              </p>

              <div className="space-y-5 pt-1">
                <div className="border-l-2 border-black pl-4 space-y-1.5">
                  <h3 className="text-xs tracking-[-0.01em] uppercase">
                    <span className="font-normal">ARQUITECTURA — </span>
                    <span className="font-bold italic">890 ARQ LTDA.</span>
                  </h3>
                  <p className="text-xs leading-[1.6] font-normal">
                    Bajo la conformación de{" "}
                    <strong className="font-semibold">890 ARQ LTDA.</strong> se
                    da cabida a proyectos de diseño de inmuebles y paisajismo,
                    además de tramitaciones municipales de obra,
                    regularizaciones, tasaciones inmobiliarias particulares y
                    comerciales, subdivisiones prediales, cambios de uso de
                    suelo, entre otras funciones.
                  </p>
                </div>

                <div className="border-l-2 border-[#E60000] pl-4 space-y-1.5">
                  <h3 className="text-xs tracking-[-0.01em] uppercase">
                    <span className="font-normal">CONSTRUCCIÓN — </span>
                    <span className="font-bold italic">890 ARQ SpA</span>
                  </h3>
                  <p className="text-xs leading-[1.6] font-normal">
                    Por otro lado, bajo el alero de{" "}
                    <strong className="font-semibold">890 ARQ SpA</strong> se
                    realizan tareas de construcción y ejecución de obras, además
                    de la rehabilitación, ampliación y remodelación de espacios.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 02 equipo: tira horizontal de 4 tarjetas giratorias 3d */}
          <div id="oficina-equipo" className="scroll-mt-32">
            <div className="border-t border-black pt-4 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
              <h3 className="text-sm font-bold tracking-tight text-black uppercase">
                02 / Equipo
              </h3>
              <span className="text-[11px] text-[#737373] uppercase tracking-[0.04em]">
                04 Integrantes · Pasar cursor o tocar para ficha
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12">
              {TEAM_MEMBERS.map((member) => {
                const isFlipped = flippedId === member.id;
                return (
                  <article
                    key={member.id}
                    className="team-card flex items-start gap-[7px]"
                  >
                    <span className="site-vertical-tag team-card-tag font-mono font-normal whitespace-nowrap select-none shrink-0 tabular-nums">
                      EQ. {member.code}
                    </span>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <button
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
                            <span className="block text-[0.95rem] sm:text-[1rem] leading-[1.2] font-medium mb-2.5">
                              {member.name}
                            </span>
                            {member.credentials.map((cred) => (
                              <span
                                key={cred}
                                className="block text-[0.7rem] leading-[1.45] font-normal mb-2"
                              >
                                {cred}
                              </span>
                            ))}
                            <span className="block text-[0.8rem] sm:text-[0.85rem] leading-[1.25] font-medium mt-1">
                              {member.role}
                            </span>
                          </span>
                        </span>
                      </button>

                      <div className="pt-2.5 min-w-0">
                        <p className="font-mono text-[12px] leading-[1.25] tracking-[-0.01em] text-black uppercase">
                          <span className="font-normal">
                            {member.firstName}{" "}
                          </span>
                          <span className="font-bold italic">
                            {member.lastName}
                          </span>
                        </p>
                        <p className="mt-1 font-mono text-[11px] leading-[1.35] text-[#737373]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* 03 vision: manifiesto editorial en grilla asimetrica 4/8 */}
          <div id="oficina-vision" className="scroll-mt-32">
            <div className="border-t border-black pt-4 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
              <h3 className="text-sm font-bold tracking-tight text-black uppercase">
                03 / Visión
              </h3>
              <span className="text-[11px] text-[#737373] uppercase tracking-[0.04em]">
                Sostenibilidad · Modularidad · Optimización constructiva
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start font-mono text-black">
              <div className="lg:col-span-4">
                <p className="text-[15px] md:text-[17px] leading-[1.4] tracking-[-0.01em]">
                  Desarrollo sostenible con énfasis en el{" "}
                  <span className="font-bold italic">
                    diseño elemental y modular
                  </span>{" "}
                  y la optimización constructiva.
                </p>

                <div className="mt-6 border-t border-black pt-3.5 space-y-2 text-[11px] leading-[1.4]">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[#737373] tabular-nums">03.1</span>
                    <span className="text-right">
                      Aprovechamiento del emplazamiento
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[#737373] tabular-nums">03.2</span>
                    <span className="text-right">
                      Comunicación transparente en obra
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-[1.65] font-normal">
                <p>
                  En términos de diseño arquitectónico y construcción,{" "}
                  <strong className="font-semibold">890 ARQ</strong> se enfoca
                  en alcanzar un desarrollo sostenible de sus proyectos, con
                  énfasis en el diseño elemental y modular de las obras
                  realizadas, profundizando en el aprovechamiento de las
                  condiciones particulares de cada emplazamiento y la
                  optimización constructiva.
                </p>
                <p>
                  De manera simultánea, para toda clase de proyectos de
                  arquitectura y obras civiles se busca establecer un canal de
                  comunicación transparente con cada cliente, a modo de entregar
                  soluciones expeditas y personalizadas tanto en diseño y
                  gestión municipal (
                  <strong className="font-semibold">890 ARQ Ltda.</strong>) como
                  en ejecución constructiva (
                  <strong className="font-semibold">890 ARQ SpA</strong>).
                </p>
              </div>
            </div>
          </div>

          {/* 04 mapa conceptual enmarcado como lamina tecnica interactiva */}
          <div id="oficina-mapa" className="scroll-mt-32">
            <div className="border-t border-black pt-4 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
              <h3 className="text-sm font-bold tracking-tight text-black uppercase">
                04 / Sistema de Disciplinas
              </h3>
              <span className="text-[11px] text-[#737373] uppercase tracking-[0.04em]">
                Arquitectura ↔ Construcción · Red interactiva
              </span>
            </div>

            <div className="border border-black bg-white p-3 sm:p-5">
              <ConceptNetwork />

              <div className="border-t border-black pt-3 mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.04em] text-[#737373]">
                <span>
                  Lámina 04 — Mapa conceptual de servicios y especialidades
                </span>
                <span className="tabular-nums">23 Nodos · 24 Vínculos</span>
              </div>
            </div>
          </div>

          {/* 05 matriz de servicios en grilla arquitectonica de 12 columnas */}
          <div id="oficina-servicios" className="scroll-mt-32">
            <div className="border-t border-black pt-4 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
              <h3 className="text-sm font-bold tracking-tight text-black uppercase">
                05 / Áreas de Servicio
              </h3>
              <span className="text-[11px] text-[#737373] uppercase tracking-[0.04em] tabular-nums">
                05 Pilares · 27 Prestaciones
              </span>
            </div>

            <div className="border-t border-black">
              {SERVICE_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border-b border-black py-7 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start transition-colors duration-200 hover:bg-neutral-50/80"
                >
                  <div className="md:col-span-2 lg:col-span-1">
                    <div className="site-index-box font-mono">
                      <span className="text-[10px] tracking-[0.04em] font-normal uppercase">
                        SERV
                      </span>
                      <span className="text-[12px] font-semibold tabular-nums">
                        {pillar.code}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-4 lg:col-span-4">
                    <h4 className="font-mono text-[14px] leading-[1.25] tracking-[-0.01em] text-black uppercase">
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
                    </h4>
                    <p className="mt-1.5 font-mono text-[11px] text-[#737373] tabular-nums">
                      {String(pillar.items.length).padStart(2, "0")} prestaciones
                    </p>
                  </div>

                  <ul className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs leading-[1.5] font-normal text-black">
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
        </div>

        {/* linea final de creditos al cierre de oficina */}
        <footer className="mt-16 pt-6 border-t border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs leading-normal font-normal text-[#737373]">
          <span>890 ARQ · Estudio de Arquitectura y Construcción</span>

          <p>
            v2.0 | Diseño UI:{" "}
            <a
              href="mailto:zett.webdesign@gmail.com"
              className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Gabriela Zett
            </a>{" "}
            • Desarrollo Web:{" "}
            <a
              href="https://personal-web-gamma-six.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black border-b border-transparent transition-colors duration-200 hover:text-[#E60000] hover:border-[#E60000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Juan Pablo Oyanedel
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}
