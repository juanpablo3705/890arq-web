"use client";

import React, { useEffect, useRef } from "react";
import { useCanvas } from "@/components/canvas/CanvasContext";

export type ConceptTier = "hub" | "primary" | "sub";

export interface ConceptNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tier: ConceptTier;
  // espacio reservado para futuros enlaces por palabra
  href?: string;
  // parametros individuales para flotacion lenta (+50% rango, -45% velocidad)
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
}

const CONCEPT_NODES: ConceptNode[] = [
  {
    id: "diseno-arquitectonico",
    label: "Diseño arquitectónico",
    x: 317,
    y: 221,
    tier: "sub",
    ampX: 4.2,
    ampY: 5.1,
    freqX: 0.92,
    freqY: 1.18,
    phaseX: 0.4,
    phaseY: 1.1,
  },
  {
    id: "diseno-y-gestion",
    label: "Diseño y gestión",
    x: 372,
    y: 307,
    tier: "primary",
    ampX: 4.65,
    ampY: 5.7,
    freqX: 0.87,
    freqY: 1.09,
    phaseX: 1.2,
    phaseY: 2.3,
  },
  {
    id: "planificacion-de-obra",
    label: "Planificación de obra",
    x: 796,
    y: 247,
    tier: "sub",
    ampX: 4.05,
    ampY: 5.25,
    freqX: 1.03,
    freqY: 0.89,
    phaseX: 2.1,
    phaseY: 0.7,
  },
  {
    id: "planificacion",
    label: "Planificación",
    x: 660,
    y: 382,
    tier: "sub",
    ampX: 4.5,
    ampY: 4.95,
    freqX: 0.97,
    freqY: 1.15,
    phaseX: 3.0,
    phaseY: 1.9,
  },
  {
    id: "ejecucion-de-obra",
    label: "Ejecución de obra",
    x: 1146,
    y: 208,
    tier: "primary",
    ampX: 4.95,
    ampY: 5.55,
    freqX: 0.84,
    freqY: 1.01,
    phaseX: 0.8,
    phaseY: 3.4,
  },
  {
    id: "gestion-construccion",
    label: "Gestión construcción",
    x: 1350,
    y: 254,
    tier: "sub",
    ampX: 4.35,
    ampY: 4.8,
    freqX: 1.11,
    freqY: 0.91,
    phaseX: 4.1,
    phaseY: 2.7,
  },
  {
    id: "supervision-tecnica",
    label: "Supervisión técnica",
    x: 991,
    y: 338,
    tier: "sub",
    ampX: 4.05,
    ampY: 5.1,
    freqX: 0.95,
    freqY: 1.2,
    phaseX: 1.9,
    phaseY: 4.5,
  },
  {
    id: "remodelacion-parcial",
    label: "Remodelación parcial",
    x: 1322,
    y: 364,
    tier: "sub",
    ampX: 4.35,
    ampY: 5.25,
    freqX: 0.9,
    freqY: 1.06,
    phaseX: 2.8,
    phaseY: 0.3,
  },
  {
    id: "remodelaciones",
    label: "Remodelaciones",
    x: 1182,
    y: 438,
    tier: "primary",
    ampX: 4.8,
    ampY: 5.7,
    freqX: 0.87,
    freqY: 1.12,
    phaseX: 5.1,
    phaseY: 1.4,
  },
  {
    id: "gestion-inmobiliaria",
    label: "Gestión inmobiliaria",
    x: 366,
    y: 494,
    tier: "sub",
    ampX: 4.2,
    ampY: 4.95,
    freqX: 1.01,
    freqY: 0.85,
    phaseX: 3.6,
    phaseY: 5.2,
  },
  {
    id: "remodelacion-total",
    label: "Remodelación total",
    x: 914,
    y: 514,
    tier: "sub",
    ampX: 4.05,
    ampY: 5.1,
    freqX: 1.07,
    freqY: 0.94,
    phaseX: 0.2,
    phaseY: 3.9,
  },
  {
    id: "arquitectura",
    label: "ARQUITECTURA",
    x: 458,
    y: 583,
    tier: "hub",
    ampX: 3.75,
    ampY: 4.8,
    freqX: 0.8,
    freqY: 1.0,
    phaseX: 1.5,
    phaseY: 0.6,
  },
  {
    id: "construccion",
    label: "CONSTRUCCIÓN",
    x: 1108,
    y: 582,
    tier: "hub",
    ampX: 3.75,
    ampY: 4.8,
    freqX: 0.83,
    freqY: 0.96,
    phaseX: 3.9,
    phaseY: 2.1,
  },
  {
    id: "cambio-uso-de-suelo",
    label: "Cambio uso de suelo",
    x: 994,
    y: 642,
    tier: "sub",
    ampX: 4.2,
    ampY: 4.95,
    freqX: 1.09,
    freqY: 0.9,
    phaseX: 2.4,
    phaseY: 4.8,
  },
  {
    id: "subdivision-loteos-fusion",
    label: "Subdivisión / Loteos / Fusión",
    x: 305,
    y: 715,
    tier: "sub",
    ampX: 4.35,
    ampY: 5.1,
    freqX: 0.91,
    freqY: 1.11,
    phaseX: 4.7,
    phaseY: 1.6,
  },
  {
    id: "tasacion",
    label: "Tasación",
    x: 814,
    y: 694,
    tier: "primary",
    ampX: 4.65,
    ampY: 5.4,
    freqX: 0.85,
    freqY: 1.05,
    phaseX: 5.5,
    phaseY: 3.1,
  },
  {
    id: "estudio-de-cabida",
    label: "Estudio de cabida",
    x: 1394,
    y: 684,
    tier: "sub",
    ampX: 4.2,
    ampY: 5.25,
    freqX: 1.0,
    freqY: 1.17,
    phaseX: 1.1,
    phaseY: 5.7,
  },
  {
    id: "tasacion-comercial",
    label: "Tasación comercial",
    x: 1004,
    y: 738,
    tier: "sub",
    ampX: 4.05,
    ampY: 4.95,
    freqX: 1.06,
    freqY: 0.87,
    phaseX: 3.3,
    phaseY: 0.9,
  },
  {
    id: "patentes-comerciales",
    label: "Patentes comerciales",
    x: 676,
    y: 822,
    tier: "sub",
    ampX: 4.35,
    ampY: 5.25,
    freqX: 0.96,
    freqY: 1.08,
    phaseX: 0.6,
    phaseY: 2.9,
  },
  {
    id: "estudio-de-factibilidad-comercial",
    label: "Estudio de factibilidad comercial",
    x: 1081,
    y: 850,
    tier: "sub",
    ampX: 3.9,
    ampY: 4.95,
    freqX: 1.13,
    freqY: 0.95,
    phaseX: 4.3,
    phaseY: 4.1,
  },
  {
    id: "tramitacion-municipal",
    label: "Tramitación municipal",
    x: 438,
    y: 896,
    tier: "primary",
    ampX: 4.8,
    ampY: 5.55,
    freqX: 0.84,
    freqY: 1.04,
    phaseX: 2.2,
    phaseY: 5.0,
  },
  {
    id: "permiso-de-obra-nueva",
    label: "Permiso de obra nueva",
    x: 320,
    y: 963,
    tier: "sub",
    ampX: 4.2,
    ampY: 5.1,
    freqX: 0.98,
    freqY: 1.16,
    phaseX: 5.8,
    phaseY: 1.3,
  },
  {
    id: "consultoria-asesoria",
    label: "Consultoría/Asesoría",
    x: 1198,
    y: 946,
    tier: "primary",
    ampX: 4.65,
    ampY: 5.4,
    freqX: 0.89,
    freqY: 1.08,
    phaseX: 1.7,
    phaseY: 3.6,
  },
];

// conexiones entre nodos segun el mapa original
const CONCEPT_EDGES: Array<[string, string]> = [
  ["diseno-y-gestion", "diseno-arquitectonico"],
  ["diseno-y-gestion", "planificacion-de-obra"],
  ["diseno-y-gestion", "planificacion"],
  ["diseno-y-gestion", "arquitectura"],
  ["planificacion", "planificacion-de-obra"],
  ["planificacion", "arquitectura"],
  ["arquitectura", "construccion"],
  ["arquitectura", "tasacion"],
  ["arquitectura", "tramitacion-municipal"],
  ["tasacion", "cambio-uso-de-suelo"],
  ["tasacion", "tasacion-comercial"],
  ["tramitacion-municipal", "subdivision-loteos-fusion"],
  ["tramitacion-municipal", "patentes-comerciales"],
  ["tramitacion-municipal", "permiso-de-obra-nueva"],
  ["construccion", "ejecucion-de-obra"],
  ["construccion", "remodelaciones"],
  ["construccion", "consultoria-asesoria"],
  ["ejecucion-de-obra", "planificacion-de-obra"],
  ["ejecucion-de-obra", "supervision-tecnica"],
  ["ejecucion-de-obra", "gestion-construccion"],
  ["remodelaciones", "remodelacion-parcial"],
  ["remodelaciones", "remodelacion-total"],
  ["consultoria-asesoria", "estudio-de-cabida"],
  ["consultoria-asesoria", "estudio-de-factibilidad-comercial"],
];

const TIER_STYLES: Record<
  ConceptTier,
  {
    fontSize: number;
    textStroke: string;
    textStrokeWidth: number;
    dotSize: number;
    dotStroke: string;
    dotStrokeWidth: number;
    textOffsetX: number;
    textOffsetY: number;
  }
> = {
  hub: {
    fontSize: 60,
    textStroke: "#141414",
    textStrokeWidth: 2,
    dotSize: 13,
    dotStroke: "#000000",
    dotStrokeWidth: 3.4,
    textOffsetX: 21,
    textOffsetY: 6,
  },
  primary: {
    fontSize: 41,
    textStroke: "#595959",
    textStrokeWidth: 1.5,
    dotSize: 9,
    dotStroke: "#555555",
    dotStrokeWidth: 2.2,
    textOffsetX: 16,
    textOffsetY: 4,
  },
  sub: {
    fontSize: 28,
    textStroke: "#a3a3a3",
    textStrokeWidth: 1.2,
    dotSize: 7,
    dotStroke: "#999999",
    dotStrokeWidth: 1.8,
    textOffsetX: 12,
    textOffsetY: 3,
  },
};

const NODE_INDEX = new Map(CONCEPT_NODES.map((node, index) => [node.id, index]));

// indices precalculados para evitar busquedas por frame
const RESOLVED_EDGES: Array<[number, number]> = CONCEPT_EDGES.flatMap(
  ([fromId, toId]) => {
    const fromIdx = NODE_INDEX.get(fromId);
    const toIdx = NODE_INDEX.get(toId);
    if (fromIdx === undefined || toIdx === undefined) return [];
    return [[fromIdx, toIdx]];
  }
);

// mapa conceptual animado del mismo ancho que la cabecera de nosotros
export function ConceptNetwork() {
  const { activeSection } = useCanvas();
  const containerRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const edgeRefs = useRef<Array<SVGLineElement | null>>([]);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId: number | null = null;
    const xs = new Float64Array(CONCEPT_NODES.length);
    const ys = new Float64Array(CONCEPT_NODES.length);

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now: number) => {
      if (
        activeSection !== "nosotros" ||
        !isVisibleRef.current ||
        motionQuery.matches ||
        document.hidden
      ) {
        rafId = null;
        return;
      }

      const t = now * 0.001;

      for (let i = 0; i < CONCEPT_NODES.length; i++) {
        const node = CONCEPT_NODES[i];
        const dx = Math.sin(t * node.freqX + node.phaseX) * node.ampX;
        const dy = Math.cos(t * node.freqY + node.phaseY) * node.ampY;
        xs[i] = node.x + dx;
        ys[i] = node.y + dy;

        const el = nodeRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        }
      }

      for (let j = 0; j < RESOLVED_EDGES.length; j++) {
        const line = edgeRefs.current[j];
        if (!line) continue;
        const [fromIdx, toIdx] = RESOLVED_EDGES[j];
        line.setAttribute("x1", xs[fromIdx].toFixed(2));
        line.setAttribute("y1", ys[fromIdx].toFixed(2));
        line.setAttribute("x2", xs[toIdx].toFixed(2));
        line.setAttribute("y2", ys[toIdx].toFixed(2));
      }

      rafId = requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      const shouldRun =
        activeSection === "nosotros" &&
        isVisibleRef.current &&
        !motionQuery.matches &&
        !document.hidden;

      if (shouldRun && rafId === null) {
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun) {
        stopLoop();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries.some((entry) => entry.isIntersecting);
        syncLoop();
      },
      { threshold: 0 }
    );

    observer.observe(container);
    motionQuery.addEventListener("change", syncLoop);
    document.addEventListener("visibilitychange", syncLoop);
    syncLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      motionQuery.removeEventListener("change", syncLoop);
      document.removeEventListener("visibilitychange", syncLoop);
    };
  }, [activeSection]);

  return (
    <figure ref={containerRef} className="w-full max-w-[1120px] mx-auto">
      <svg
        viewBox="240 130 1490 900"
        className="w-full h-auto block select-none overflow-visible"
        role="img"
        aria-label="Mapa conceptual de arquitectura y construcción 890 ARQ"
      >
        {/* lineas de conexion entre nodos */}
        <g aria-hidden="true">
          {RESOLVED_EDGES.map(([fromIdx, toIdx], idx) => {
            const from = CONCEPT_NODES[fromIdx];
            const to = CONCEPT_NODES[toIdx];
            return (
              <line
                key={`${from.id}-${to.id}`}
                ref={(el) => {
                  edgeRefs.current[idx] = el;
                }}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#e2e2e2"
                strokeWidth={1.6}
                shapeRendering="geometricPrecision"
              />
            );
          })}
        </g>

        {/* nodos de palabras flotantes preparados para futuros hipervinculos */}
        {CONCEPT_NODES.map((node, idx) => {
          const style = TIER_STYLES[node.tier];
          const halfDot = style.dotSize / 2;

          const content = (
            <>
              <rect
                x={node.x - halfDot}
                y={node.y - halfDot}
                width={style.dotSize}
                height={style.dotSize}
                fill="#ffffff"
                stroke={style.dotStroke}
                strokeWidth={style.dotStrokeWidth}
              />
              <text
                x={node.x + style.textOffsetX}
                y={node.y + style.textOffsetY}
                fill="#ffffff"
                stroke={style.textStroke}
                strokeWidth={style.textStrokeWidth}
                strokeLinejoin="round"
                paintOrder="stroke"
                fontSize={style.fontSize}
                fontWeight={500}
                className="font-mono"
              >
                {node.label}
              </text>
            </>
          );

          return (
            <g
              key={node.id}
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
              data-concept-node={node.id}
              className="concept-node"
            >
              {node.href ? (
                <a
                  href={node.href}
                  className="focus-visible:outline-2 focus-visible:outline-black"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </g>
          );
        })}
      </svg>

      <figcaption className="sr-only">
        ARQUITECTURA, CONSTRUCCIÓN, Diseño y gestión, Diseño arquitectónico,
        Planificación, Gestión inmobiliaria, Ejecución de obra, Planificación de
        obra, Gestión construcción, Supervisión técnica, Remodelaciones,
        Remodelación parcial, Remodelación total, Tasación, Cambio uso de suelo,
        Tasación comercial, Subdivisión / Loteos / Fusión, Estudio de cabida,
        Tramitación municipal, Patentes comerciales, Permiso de obra nueva,
        Consultoría/Asesoría, Estudio de factibilidad comercial.
      </figcaption>
    </figure>
  );
}
