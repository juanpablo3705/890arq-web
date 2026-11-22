"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CATEGORIES, CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import { CategoryId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";

// tiempos sincronizados con --motion-fade-out (180ms) y --motion-fade-in (420ms) de globals.css
const FADE_OUT_MS = 180;
const STAGGER_STEP_MS = 28;
const MAX_STAGGER_ITEMS = 9;

const ProjectDetailRenderer = dynamic(
  () =>
    import("@/components/projects/ProjectDetailRenderer").then(
      (mod) => mod.ProjectDetailRenderer
    ),
  { ssr: false }
);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// seccion de proyectos con filtro secuencial escalonado y transicion a detalle
export function ProyectosSection() {
  const {
    activeSection,
    activeProjectSlug,
    selectedCategory,
    openProject,
    closeProject,
    setSelectedCategory,
  } = useCanvas();

  const sectionRef = useRef<HTMLElement>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isGridFadedOut, setIsGridFadedOut] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [filterAnnouncement, setFilterAnnouncement] = useState("");
  const [pendingFilterFrom, setPendingFilterFrom] = useState<
    CategoryId | null | undefined
  >(undefined);
  const [revealKey, setRevealKey] = useState(0);

  const isDetailView = activeProjectSlug !== null;
  const isFilterExiting = pendingFilterFrom !== undefined;
  const displayedCategory = isFilterExiting
    ? pendingFilterFrom
    : selectedCategory;

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (filterTimerRef.current) clearTimeout(filterTimerRef.current);
    };
  }, []);

  const scrollParentToTop = () => {
    const scrollParent = sectionRef.current?.parentElement;
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // alterna la categoria con fade-out breve (180ms) y entrada escalonada limpia (420ms)
  const handleSelectCategory = (category: CategoryId) => {
    const nextCategory = selectedCategory === category ? null : category;
    const visibleCount =
      nextCategory === null
        ? PROJECTS_DATA.length
        : PROJECTS_DATA.filter((p) => p.category === nextCategory).length;

    const announcement =
      nextCategory === null
        ? `Mostrando todos los proyectos (${visibleCount})`
        : `Filtrado por ${nextCategory}: ${visibleCount} ${
            visibleCount === 1 ? "proyecto" : "proyectos"
          }`;

    setSelectedCategory(nextCategory);
    setFilterAnnouncement(announcement);

    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
      filterTimerRef.current = null;
    }

    if (prefersReducedMotion()) {
      setPendingFilterFrom(undefined);
      return;
    }

    // si el usuario cancela en medio de la salida volviendo a lo ya mostrado, restaura suavemente
    if (nextCategory === displayedCategory) {
      setPendingFilterFrom(undefined);
      return;
    }

    setPendingFilterFrom(displayedCategory);
    filterTimerRef.current = setTimeout(() => {
      setPendingFilterFrom(undefined);
      setRevealKey((prev) => prev + 1);
      filterTimerRef.current = null;
    }, FADE_OUT_MS);
  };

  const handleOpenProject = (slug: string) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
      filterTimerRef.current = null;
    }
    setPendingFilterFrom(undefined);

    if (prefersReducedMotion()) {
      setRevealKey(0);
      openProject(slug);
      setIsGridFadedOut(false);
      setIsDetailVisible(true);
      scrollParentToTop();
      return;
    }

    setIsGridFadedOut(true);
    setIsDetailVisible(false);

    fadeTimerRef.current = setTimeout(() => {
      setRevealKey(0);
      openProject(slug);
      setIsGridFadedOut(false);
      scrollParentToTop();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsDetailVisible(true);
        });
      });
    }, FADE_OUT_MS);
  };

  const handleBackToGrid = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

    if (prefersReducedMotion()) {
      setIsDetailVisible(false);
      setIsGridFadedOut(false);
      closeProject();
      scrollParentToTop();
      return;
    }

    setIsDetailVisible(false);

    fadeTimerRef.current = setTimeout(() => {
      setIsGridFadedOut(true);
      closeProject();
      scrollParentToTop();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsGridFadedOut(false);
        });
      });
    }, FADE_OUT_MS);
  };

  const visibleProjects =
    displayedCategory === null
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(
          (project) => project.category === displayedCategory
        );

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos 890 ARQ"
      className="site-section"
    >
      <div className="site-container">
        {!isDetailView ? (
          <div
            data-visible={isGridFadedOut ? "false" : "true"}
            className="site-view-fade"
          >
            {/* barra superior de filtros por tipologia alineada a la derecha sobre separador completo */}
            <header className="mb-12 w-full">
              <div
                role="group"
                aria-label="Filtrar proyectos por tipología"
                className="project-filter-group flex items-center justify-end gap-x-2.5 gap-y-2"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  const theme = CATEGORY_THEMES[category];
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleSelectCategory(category)}
                      style={
                        {
                          "--cat-bg": theme.highlightBg,
                          "--cat-fg": theme.highlightText,
                          "--cat-hover": theme.hoverAccent,
                        } as React.CSSProperties
                      }
                      className="project-filter-btn font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div aria-hidden="true" className="h-px bg-black mt-5 w-full" />
            </header>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {filterAnnouncement}
            </p>

            {/* grilla de 3 columnas con tarjetas de tipologia */}
            <ul
              key={revealKey}
              role="list"
              data-exiting={isFilterExiting ? "true" : "false"}
              className="projects-grid-stage grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
            >
              {visibleProjects.map((project, idx) => {
                const theme = CATEGORY_THEMES[project.category];
                const delayMs =
                  idx < MAX_STAGGER_ITEMS ? idx * STAGGER_STEP_MS : 0;
                return (
                  <li
                    key={project.id}
                    className={
                      revealKey > 0
                        ? "project-card-item project-card-reveal"
                        : "project-card-item"
                    }
                    style={
                      revealKey > 0
                        ? ({
                            "--card-delay": `${delayMs}ms`,
                          } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <article
                      className="project-card flex items-start gap-[7px]"
                      style={
                        {
                          "--cat-bg": theme.highlightBg,
                          "--cat-fg": theme.highlightText,
                          "--cat-box-border": theme.boxBorder,
                          "--cat-box-text": theme.boxText,
                        } as React.CSSProperties
                      }
                    >
                      {/* franja vertical izquierda con nombre y color de categoria */}
                      <span className="project-vertical-tag font-mono font-normal tracking-[0.01em] whitespace-nowrap select-none shrink-0">
                        {project.category}
                      </span>

                      {/* columna principal: portada cuadrada uniforme y ficha inferior */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="w-full aspect-square border border-black overflow-hidden bg-neutral-100">
                          <Image
                            src={project.thumbnail}
                            alt={`${project.title} — ${project.category}, ${project.cardLocation}`}
                            width={900}
                            height={900}
                            loading={
                              activeSection === "proyectos" && idx < 9
                                ? "eager"
                                : "lazy"
                            }
                            sizes="(min-width: 1024px) 320px, (min-width: 768px) 44vw, 90vw"
                            className="project-card-img block w-full h-full object-cover"
                          />
                        </div>

                        {/* fila inferior con titulo, ubicacion, superficie y caja de id */}
                        <div className="pt-2.5 flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h2 className="project-card-title font-mono tracking-[-0.01em] text-black uppercase">
                              <button
                                type="button"
                                onClick={() => handleOpenProject(project.slug)}
                                className="project-card-trigger text-left cursor-pointer"
                              >
                                {project.prefix ? (
                                  <>
                                    <span className="font-normal">
                                      {project.prefix}{" "}
                                    </span>
                                    <span className="font-bold italic">
                                      {project.name}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-bold italic">
                                    {project.name}
                                  </span>
                                )}
                              </button>
                            </h2>

                            <p className="project-card-meta mt-1 font-mono font-normal text-black">
                              {project.cardLocation}
                            </p>
                            <p className="project-card-meta font-mono font-normal text-black tabular-nums">
                              {project.area}
                            </p>
                          </div>

                          <div className="project-id-box shrink-0 w-[56px] min-h-[48px] flex flex-col items-center justify-center gap-[1px] text-center px-1.5 py-1.5 font-mono leading-[1.15]">
                            <span className="text-[10px] tracking-[0.04em] font-normal">
                              PROY
                            </span>
                            <span className="text-[12px] font-semibold tabular-nums">
                              {project.code}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          /* vista de proyecto individual con misma coreografia de fade (180ms salida / 420ms entrada) */
          <div
            data-visible={isDetailVisible ? "true" : "false"}
            className="site-view-fade"
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
