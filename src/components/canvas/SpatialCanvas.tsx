"use client";

import React, { useEffect, useRef } from "react";
import { SectionId } from "@/types/domain";
import { useCanvas } from "./CanvasContext";
import { HomeSection } from "@/components/sections/HomeSection";
import { ProyectosSection } from "@/components/sections/ProyectosSection";
import { ContactoSection } from "@/components/sections/ContactoSection";
import { OficinaSection } from "@/components/sections/OficinaSection";
import { CotizacionesSection } from "@/components/sections/CotizacionesSection";

// mapa de transformaciones para traer cada brazo de la cruz al centro de la camara
const SECTION_TRANSFORMS: Record<SectionId, string> = {
  home: "translate-x-0 translate-y-0",
  proyectos: "translate-x-0 translate-y-[100vh]",
  contacto: "translate-x-[100vw] translate-y-0",
  oficina: "-translate-x-[100vw] translate-y-0",
  cotizaciones: "translate-x-0 -translate-y-[100vh]",
};

// motor del gran lienzo espacial en cruz
export function SpatialCanvas() {
  const { activeSection, registerContactoPane } = useCanvas();
  const northRef = useRef<HTMLDivElement>(null);
  const westRef = useRef<HTMLDivElement>(null);
  const eastRef = useRef<HTMLDivElement>(null);
  const southRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerContactoPane(westRef.current);
    return () => registerContactoPane(null);
  }, [registerContactoPane]);

  useEffect(() => {
    if (activeSection === "home") {
      const timer = setTimeout(() => {
        northRef.current?.scrollTo({ top: 0 });
        westRef.current?.scrollTo({ top: 0 });
        eastRef.current?.scrollTo({ top: 0 });
        southRef.current?.scrollTo({ top: 0 });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <div
        className={`relative w-screen h-screen transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${SECTION_TRANSFORMS[activeSection]}`}
      >
        {/* centro (0, 0): home */}
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
          <HomeSection />
        </div>

        {/* norte (0, -100vh): proyectos */}
        <div
          ref={northRef}
          className="site-scroll-pane absolute -top-[100vh] left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <ProyectosSection />
        </div>

        {/* oeste (-100vw, 0): contacto */}
        <div
          ref={westRef}
          className="site-scroll-pane absolute top-0 -left-[100vw] w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <ContactoSection />
        </div>

        {/* este (100vw, 0): oficina */}
        <div
          ref={eastRef}
          className="site-scroll-pane absolute top-0 left-[100vw] w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <OficinaSection />
        </div>

        {/* sur (0, 100vh): cotizaciones */}
        <div
          ref={southRef}
          className="site-scroll-pane absolute top-[100vh] left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <CotizacionesSection />
        </div>
      </div>
    </div>
  );
}
