"use client";

import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROJECTS_DATA } from "@/data/projects";
import { CategoryId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";
import { ProjectDetailRenderer } from "@/components/projects/ProjectDetailRenderer";

// seccion de proyectos con filtro por categoria y transicion a detalle
export function ProyectosSection() {
  const {
    activeProjectSlug,
    selectedCategory,
    openProject,
    closeProject,
    setSelectedCategory,
  } = useCanvas();

  const sectionRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<"grid" | "detail">("grid");
  const [isGridFadedOut, setIsGridFadedOut] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [collapseHiddenCards, setCollapseHiddenCards] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sincroniza cuando el contexto resetea el proyecto al volver al home con el logo superior izquierdo
  useEffect(() => {
    if (activeProjectSlug === null && viewMode === "detail") {
      setViewMode("grid");
      setIsGridFadedOut(false);
      setIsDetailVisible(false);
    }
  }, [activeProjectSlug, viewMode]);

  // controla el colapso suave tras la animacion de difuminacion del filtro de categorias
  useEffect(() => {
    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
      filterTimerRef.current = null;
    }

    if (selectedCategory === null) {
      setCollapseHiddenCards(false);
    } else {
      setCollapseHiddenCards(false);
      filterTimerRef.current = setTimeout(() => {
        setCollapseHiddenCards(true);
      }, 450);
    }

    return () => {
      if (filterTimerRef.current) {
        clearTimeout(filterTimerRef.current);
      }
    };
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  const scrollParentToTop = () => {
    const scrollParent = sectionRef.current?.parentElement;
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectCategory = (category: CategoryId) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);
  };

  const handleOpenProject = (slug: string) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setIsGridFadedOut(true);

    fadeTimerRef.current = setTimeout(() => {
      openProject(slug);
      setViewMode("detail");
      scrollParentToTop();
      requestAnimationFrame(() => {
        setIsDetailVisible(true);
      });
    }, 450);
  };

  const handleBackToGrid = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setIsDetailVisible(false);

    fadeTimerRef.current = setTimeout(() => {
      closeProject();
      setViewMode("grid");
      scrollParentToTop();
      requestAnimationFrame(() => {
        setIsGridFadedOut(false);
      });
    }, 450);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos 890 ARQ"
      className="w-full min-h-screen bg-white pt-28 pb-32 px-6 md:px-16"
    >
      <div className="w-full max-w-[1140px] mx-auto lg:pl-[110px]">
        {viewMode === "grid" ? (
          <div
            className={`transition-opacity duration-500 ${
              isGridFadedOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {/* barra superior de categorias */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black pb-6 mb-14">
              <h2 className="font-mono text-lg md:text-xl font-bold tracking-tight text-black uppercase">
                Proyectos
              </h2>

              <nav
                aria-label="Filtro de categorías de proyectos"
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleSelectCategory(category)}
                      className={`font-mono text-xs md:text-[13px] tracking-tight cursor-pointer transition-colors duration-200 pb-0.5 border-b ${
                        isActive
                          ? "text-[#E60000] border-[#E60000] font-bold"
                          : "text-black border-transparent hover:text-[#E60000]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </nav>
            </header>

            {/* grilla de 3 columnas en blanco y negro */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {PROJECTS_DATA.map((project) => {
                const matchesCategory =
                  selectedCategory === null ||
                  project.category === selectedCategory;

                return (
                  <article
                    key={project.id}
                    onClick={() =>
                      matchesCategory && handleOpenProject(project.slug)
                    }
                    className={`group cursor-pointer transition-all duration-500 ${
                      matchesCategory
                        ? "opacity-100 scale-100"
                        : `opacity-0 scale-95 pointer-events-none ${
                            collapseHiddenCards ? "hidden" : ""
                          }`
                    }`}
                  >
                    <div className="flex items-stretch">
                      {/* texto vertical exterior izquierdo */}
                      <div className="pr-2 flex items-start justify-center shrink-0">
                        <span className="[writing-mode:vertical-rl] font-mono text-[11px] leading-none tracking-tight text-black select-none">
                          {project.verticalLabel}
                        </span>
                      </div>

                      {/* columna derecha con imagen y pie de tarjeta */}
                      <div className="flex-1 flex flex-col">
                        {/* imagen de portada en blanco y negro */}
                        <div className="w-full aspect-[4/5] border border-black overflow-hidden bg-neutral-100">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        </div>

                        {/* fila inferior con titulo y codigo tecnico */}
                        <div className="pt-3 flex items-start justify-between gap-4">
                          <h3 className="font-mono text-[13px] font-normal text-black leading-snug group-hover:text-[#E60000] transition-colors">
                            {project.title}
                          </h3>

                          <span className="border border-black px-2 py-1 text-xs font-mono leading-none text-black shrink-0 group-hover:border-[#E60000] group-hover:text-[#E60000] transition-colors">
                            {project.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* vista de proyecto individual con difuminacion inversa */
          <div
            className={`transition-opacity duration-500 ${
              isDetailVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeProjectSlug && (
              <ProjectDetailRenderer
                slug={activeProjectSlug}
                onBack={handleBackToGrid}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
