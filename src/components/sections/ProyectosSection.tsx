"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CATEGORIES, CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import { CategoryId } from "@/types/domain";
import { useCanvas } from "@/components/canvas/CanvasContext";

const ProjectDetailRenderer = dynamic(
  () =>
    import("@/components/projects/ProjectDetailRenderer").then(
      (mod) => mod.ProjectDetailRenderer
    ),
  { ssr: false }
);

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
  const gridRef = useRef<HTMLUListElement>(null);
  const transitionTokenRef = useRef(0);
  const [isGridFadedOut, setIsGridFadedOut] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [filterAnnouncement, setFilterAnnouncement] = useState("");
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDetailView = activeProjectSlug !== null;

  // limpia los nombres y clases temporales de view transition al finalizar
  const clearTransitionStyles = useCallback(() => {
    const list = gridRef.current;
    if (!list) return;
    for (const child of Array.from(list.children)) {
      const el = child as HTMLElement;
      el.style.viewTransitionName = "";
      el.removeAttribute("data-vt-motion");
    }
  }, []);

  // asigna view-transition-name solo a tarjetas visibles en el viewport para evitar recortes offscreen
  const tagVisibleCards = useCallback(
    (
      motion: "fly-up" | "fly-down" | null,
      onlyMotionIds: Set<string> | null = null
    ) => {
      const list = gridRef.current;
      if (!list) return new Set<string>();
      const scrollParent = sectionRef.current?.parentElement;
      const paneRect = scrollParent
        ? scrollParent.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight };

      const visibleIds = new Set<string>();
      for (const child of Array.from(list.children)) {
        const el = child as HTMLElement;
        const id = el.dataset.projectId;
        if (!id) continue;
        const rect = el.getBoundingClientRect();
        const isInView =
          rect.bottom > paneRect.top && rect.top < paneRect.bottom;
        if (isInView) {
          visibleIds.add(id);
          el.style.viewTransitionName = `project-card-${id}`;
          if (motion && (!onlyMotionIds || onlyMotionIds.has(id))) {
            el.setAttribute("data-vt-motion", motion);
          } else {
            el.removeAttribute("data-vt-motion");
          }
        } else {
          el.style.viewTransitionName = "none";
          el.removeAttribute("data-vt-motion");
        }
      }
      return visibleIds;
    },
    []
  );

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
      clearTransitionStyles();
    };
  }, [clearTransitionStyles]);

  const scrollParentToTop = () => {
    const scrollParent = sectionRef.current?.parentElement;
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // alterna la categoria activa con animacion simetrica de entrada y salida via view transitions
  const handleSelectCategory = (category: CategoryId) => {
    const nextCategory = selectedCategory === category ? null : category;
    const mode = nextCategory === null ? "unfilter" : "filter";
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
      startViewTransition?: (callback: () => void) => {
        finished: Promise<void>;
      };
    };

    if (typeof doc.startViewTransition === "function" && !reducedMotion) {
      const token = ++transitionTokenRef.current;
      clearTransitionStyles();

      // captura solo tarjetas visibles antes del cambio (al desmarcar, bajan por delante)
      const prevVisibleIds = tagVisibleCards(
        mode === "unfilter" ? "fly-down" : null
      );

      const transition = doc.startViewTransition(() => {
        flushSync(applyUpdate);
        // etiqueta las tarjetas visibles resultantes (al filtrar, suben por delante)
        if (mode === "filter") {
          tagVisibleCards("fly-up");
        } else {
          tagVisibleCards("fly-down", prevVisibleIds);
        }
      });

      transition.finished
        .catch(() => {})
        .finally(() => {
          if (transitionTokenRef.current === token) {
            clearTransitionStyles();
          }
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
              ref={gridRef}
              role="list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
            >
              {visibleProjects.map((project, idx) => {
                const theme = CATEGORY_THEMES[project.category];
                return (
                  <li
                    key={project.id}
                    data-project-id={project.id}
                    className="project-card-item"
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
