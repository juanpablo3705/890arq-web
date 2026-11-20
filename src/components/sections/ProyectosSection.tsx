"use client";

import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CATEGORIES, CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import { CategoryId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";
import { ProjectDetailRenderer } from "@/components/projects/ProjectDetailRenderer";

// seccion de proyectos con filtro por tipologia y transicion a detalle
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
  const filterGroupRef = useRef<HTMLDivElement>(null);
  const [filterLineWidth, setFilterLineWidth] = useState<number | null>(null);
  const [isGridFadedOut, setIsGridFadedOut] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [filterAnnouncement, setFilterAnnouncement] = useState("");
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDetailView = activeProjectSlug !== null;

  // mide la extension horizontal real del menu de categorias para ajustar su subrayado
  useEffect(() => {
    const group = filterGroupRef.current;
    if (!group || isDetailView) return;

    let cancelled = false;

    const measureMenuSpan = () => {
      if (cancelled) return;
      const items = group.children;
      if (items.length === 0) return;

      let minLeft = Number.POSITIVE_INFINITY;
      let maxRight = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        if (rect.left < minLeft) minLeft = rect.left;
        if (rect.right > maxRight) maxRight = rect.right;
      }
      const nextWidth = Math.ceil(maxRight - minLeft);
      if (nextWidth > 0) {
        setFilterLineWidth((prev) => (prev === nextWidth ? prev : nextWidth));
      }
    };

    measureMenuSpan();

    const observer = new ResizeObserver(measureMenuSpan);
    observer.observe(group);
    for (let i = 0; i < group.children.length; i++) {
      observer.observe(group.children[i]);
    }

    window.addEventListener("resize", measureMenuSpan);
    document.fonts?.ready.then(measureMenuSpan);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", measureMenuSpan);
    };
  }, [isDetailView]);

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

  // alterna la categoria activa y anima el reordenamiento con view transitions si el navegador lo soporta
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

    const applyUpdate = () => {
      setSelectedCategory(nextCategory);
      setFilterAnnouncement(announcement);
    };

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (typeof doc.startViewTransition === "function" && !reducedMotion) {
      doc.startViewTransition(() => {
        flushSync(applyUpdate);
      });
    } else {
      applyUpdate();
    }
  };

  const handleOpenProject = (slug: string) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setIsGridFadedOut(true);
    setIsDetailVisible(false);

    fadeTimerRef.current = setTimeout(() => {
      openProject(slug);
      setIsGridFadedOut(false);
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
      setIsGridFadedOut(true);
      closeProject();
      scrollParentToTop();
      requestAnimationFrame(() => {
        setIsGridFadedOut(false);
      });
    }, 450);
  };

  const visibleProjects =
    selectedCategory === null
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos 890 ARQ"
      className="site-section"
    >
      <div className="site-container">
        {!isDetailView ? (
          <div
            className={`transition-opacity duration-500 ${
              isGridFadedOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {/* barra superior de filtros por tipologia alineada a la derecha con subrayado adaptable */}
            <header className="mb-12 flex justify-end">
              <div className="w-fit max-w-full flex flex-col items-end">
                <div
                  ref={filterGroupRef}
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

                <div
                  aria-hidden="true"
                  className="h-px bg-black mt-5 w-full max-w-full"
                  style={
                    filterLineWidth !== null
                      ? { width: `${filterLineWidth}px` }
                      : undefined
                  }
                />
              </div>
            </header>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {filterAnnouncement}
            </p>

            {/* grilla de 3 columnas con tarjetas de tipologia */}
            <ul
              role="list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
            >
              {visibleProjects.map((project) => {
                const theme = CATEGORY_THEMES[project.category];
                return (
                  <li
                    key={project.id}
                    className="project-card-item"
                    style={
                      activeSection === "proyectos"
                        ? { viewTransitionName: `project-card-${project.id}` }
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

                      {/* columna principal: fotografia y ficha inferior */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="w-full aspect-[15/16] border border-black overflow-hidden bg-neutral-100">
                          <img
                            src={project.thumbnail}
                            alt={`${project.title} — ${project.category}, ${project.location}`}
                            decoding="async"
                            className="project-card-img w-full h-full object-cover"
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
                                <span className="font-normal">
                                  {project.prefix}{" "}
                                </span>
                                <span className="font-bold italic">
                                  {project.name}
                                </span>
                              </button>
                            </h2>

                            <p className="project-card-meta mt-1 font-mono font-normal text-black">
                              {project.location}
                            </p>
                            <p className="project-card-meta font-mono font-normal text-black">
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
