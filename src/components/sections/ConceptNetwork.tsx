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

const VIEW_X = 240;
const VIEW_Y = 130;
const VIEW_W = 1490;
const VIEW_H = 900;

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

const NODE_POSITIONS = CONCEPT_NODES.map((n) => ({
  u: (n.x - VIEW_X) / VIEW_W,
  v: (n.y - VIEW_Y) / VIEW_H,
}));

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

// mapa conceptual con nodos html en gpu y lineas en canvas 2d
export function ConceptNetwork() {
  const { activeSection } = useCanvas();
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<Array<HTMLElement | null>>([]);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId: number | null = null;
    let width = 0;
    let height = 0;
    let scale = 1;
    let dpr = 1;

    const pxX = new Float64Array(CONCEPT_NODES.length);
    const pxY = new Float64Array(CONCEPT_NODES.length);

    const drawLines = () => {
      if (width <= 0 || height <= 0) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#e2e2e2";
      ctx.lineWidth = Math.max(1, 1.4 * scale);
      ctx.beginPath();
      for (let j = 0; j < RESOLVED_EDGES.length; j++) {
        const [fromIdx, toIdx] = RESOLVED_EDGES[j];
        ctx.moveTo(pxX[fromIdx], pxY[fromIdx]);
        ctx.lineTo(pxX[toIdx], pxY[toIdx]);
      }
      ctx.stroke();
    };

    const renderResting = () => {
      for (let i = 0; i < CONCEPT_NODES.length; i++) {
        pxX[i] = NODE_POSITIONS[i].u * width;
        pxY[i] = NODE_POSITIONS[i].v * height;
        const el = nodeRefs.current[i];
        if (el) {
          el.style.transform = "perspective(800px) translate3d(0, 0, 0.01px)";
        }
      }
      drawLines();
    };

    const measureCanvas = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      width = rect.width;
      height = rect.height;
      scale = width / VIEW_W;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      if (motionQuery.matches) {
        renderResting();
      } else {
        drawLines();
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now: number) => {
      if (
        activeSection !== "oficina" ||
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
        const dx = Math.sin(t * node.freqX + node.phaseX) * node.ampX * scale;
        const dy = Math.cos(t * node.freqY + node.phaseY) * node.ampY * scale;
        pxX[i] = NODE_POSITIONS[i].u * width + dx;
        pxY[i] = NODE_POSITIONS[i].v * height + dy;

        const el = nodeRefs.current[i];
        if (el) {
          el.style.transform = `perspective(800px) translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0.01px)`;
        }
      }

      drawLines();
      rafId = requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      if (motionQuery.matches) {
        stopLoop();
        renderResting();
        return;
      }

      const shouldRun =
        activeSection === "oficina" &&
        isVisibleRef.current &&
        !document.hidden;

      if (shouldRun && rafId === null) {
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun) {
        stopLoop();
      }
    };

    const resizeObserver = new ResizeObserver(measureCanvas);
    resizeObserver.observe(container);
    measureCanvas();
    renderResting();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries.some((entry) => entry.isIntersecting);
        syncLoop();
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(container);
    motionQuery.addEventListener("change", syncLoop);
    document.addEventListener("visibilitychange", syncLoop);
    syncLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", syncLoop);
      document.removeEventListener("visibilitychange", syncLoop);
    };
  }, [activeSection]);

  return (
    <figure
      ref={containerRef}
      aria-label="Mapa conceptual de arquitectura y construcción 890 ARQ"
      className="concept-canvas-wrap relative w-full max-w-[1120px] mx-auto aspect-[1490/900] select-none"
    >
      {/* capa de lineas de conexion en canvas 2d */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none block"
      />

      {/* capa de nodos tipograficos en gpu preparados para futuros enlaces */}
      {CONCEPT_NODES.map((node, idx) => {
        const pos = NODE_POSITIONS[idx];
        const tierClass = `concept-node concept-node--${node.tier}`;
        const posStyle: React.CSSProperties = {
          left: `${(pos.u * 100).toFixed(4)}%`,
          top: `${(pos.v * 100).toFixed(4)}%`,
        };

        const inner = (
          <>
            <span aria-hidden="true" className="concept-dot" />
            <span className="concept-txt font-mono">{node.label}</span>
          </>
        );

        if (node.href) {
          return (
            <a
              key={node.id}
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
              href={node.href}
              style={posStyle}
              data-concept-node={node.id}
              className={`${tierClass} focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2`}
            >
              {inner}
            </a>
          );
        }

        return (
          <span
            key={node.id}
            ref={(el) => {
              nodeRefs.current[idx] = el;
            }}
            style={posStyle}
            data-concept-node={node.id}
            className={tierClass}
          >
            {inner}
          </span>
        );
      })}

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
