"use client";

import React, { useEffect, useRef, useState } from "react";
import { SectionId } from "@/types/domain";
import { CANVAS_TRANSITION_MS, useCanvas } from "./CanvasContext";

interface SpatialCanvasProps {
  home: React.ReactNode;
  proyectos: React.ReactNode;
  contacto: React.ReactNode;
  oficina: React.ReactNode;
  cotizaciones: React.ReactNode;
}

// mapa de transformaciones para traer cada brazo de la cruz al centro
const SECTION_TRANSFORMS: Record<SectionId, string> = {
  home: "translate-x-0 translate-y-0",
  proyectos: "translate-x-0 translate-y-[100vh]",
  contacto: "translate-x-[100vw] translate-y-0",
  oficina: "-translate-x-[100vw] translate-y-0",
  cotizaciones: "translate-x-0 -translate-y-[100vh]",
};

// motor del lienzo espacial en cruz
export function SpatialCanvas({
  home,
  proyectos,
  contacto,
  oficina,
  cotizaciones,
}: SpatialCanvasProps) {
  const { activeSection, registerContactoPane } = useCanvas();
  const [settledSection, setSettledSection] =
    useState<SectionId>(activeSection);
  const northRef = useRef<HTMLDivElement>(null);
  const westRef = useRef<HTMLDivElement>(null);
  const eastRef = useRef<HTMLDivElement>(null);
  const southRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerContactoPane(westRef.current);
    return () => registerContactoPane(null);
  }, [registerContactoPane]);

  // oculta visualmente las barras de scroll durante el desplazamiento entre vistas
  useEffect(() => {
    if (activeSection === "home") {
      const raf = requestAnimationFrame(() => {
        setSettledSection("home");
      });
      const timer = setTimeout(() => {
        northRef.current?.scrollTo({ top: 0 });
        westRef.current?.scrollTo({ top: 0 });
        eastRef.current?.scrollTo({ top: 0 });
        southRef.current?.scrollTo({ top: 0 });
      }, CANVAS_TRANSITION_MS);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }

    const timer = setTimeout(() => {
      setSettledSection(activeSection);
    }, CANVAS_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const isPaneIdle = (section: SectionId) =>
    activeSection !== section || settledSection !== section;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <div
        className={`relative w-screen h-screen transition-transform duration-[1050ms] motion-reduce:duration-0 ease-[cubic-bezier(0.22,1,0.36,1)] ${SECTION_TRANSFORMS[activeSection]}`}
      >
        {/* centro (0, 0): home */}
        <div
          inert={activeSection !== "home"}
          className="absolute top-0 left-0 w-screen h-screen overflow-hidden"
        >
          {home}
        </div>

        {/* norte (0, -100vh): proyectos */}
        <div
          ref={northRef}
          inert={activeSection !== "proyectos"}
          data-pane-idle={isPaneIdle("proyectos") ? "true" : "false"}
          className="site-scroll-pane absolute -top-[100vh] left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {proyectos}
        </div>

        {/* oeste (-100vw, 0): contacto */}
        <div
          ref={westRef}
          inert={activeSection !== "contacto"}
          data-pane-idle={isPaneIdle("contacto") ? "true" : "false"}
          className="site-scroll-pane absolute top-0 -left-[100vw] w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {contacto}
        </div>

        {/* este (100vw, 0): oficina */}
        <div
          ref={eastRef}
          inert={activeSection !== "oficina"}
          data-pane-idle={isPaneIdle("oficina") ? "true" : "false"}
          className="site-scroll-pane absolute top-0 left-[100vw] w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {oficina}
        </div>

        {/* sur (0, 100vh): cotizaciones */}
        <div
          ref={southRef}
          inert={activeSection !== "cotizaciones"}
          data-pane-idle={isPaneIdle("cotizaciones") ? "true" : "false"}
          className="site-scroll-pane absolute top-[100vh] left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {cotizaciones}
        </div>
      </div>
    </div>
  );
}
