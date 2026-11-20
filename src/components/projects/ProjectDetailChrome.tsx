"use client";

import React, { useEffect, useRef, useState } from "react";
import { CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import {
  CategoryTheme,
  ProjectItem,
  ProjectMediaItem,
  ProjectSpec,
} from "@/types/domain";
import { LightboxLoupe } from "./LightboxLoupe";

export interface ResolvedProjectMeta {
  project: ProjectItem;
  theme: CategoryTheme;
}

export interface ProjectLayoutProps {
  project: ProjectItem;
  theme: CategoryTheme;
  onZoom: (item: ProjectMediaItem) => void;
}

// obtiene metadatos y tema cromatico desde el catalogo central
export function getProjectMeta(slug: string): ResolvedProjectMeta {
  const project =
    PROJECTS_DATA.find((item) => item.slug === slug) ?? PROJECTS_DATA[0];
  const theme = CATEGORY_THEMES[project.category];
  return { project, theme };
}

interface ProjectNavBarProps {
  theme: CategoryTheme;
  onBack: () => void;
}

// barra superior comun para las 30 paginas (alineada al pixel con el menu de proyectos)
export function ProjectTopBar({ theme, onBack }: ProjectNavBarProps) {
  return (
    <header className="mb-12 w-full">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onBack}
          style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
          className="project-bar-link font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
        >
          &lt; Volver a proyectos
        </button>
      </div>

      <div aria-hidden="true" className="h-px bg-black mt-5 w-full" />
    </header>
  );
}

// pie de retorno comun para las 30 paginas (editable masivamente desde aqui)
export function ProjectBackLink({ theme, onBack }: ProjectNavBarProps) {
  return (
    <footer className="mt-12 w-full">
      <div aria-hidden="true" className="h-px bg-black w-full" />

      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={onBack}
          style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
          className="project-bar-link font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
        >
          &lt; Volver a proyectos
        </button>
      </div>
    </footer>
  );
}

// envoltorio maestro con tope comun, pie comun y visor modal nativo de laminas
export function ProjectPageShell({
  project,
  theme,
  onBack,
  children,
}: {
  project: ProjectItem;
  theme: CategoryTheme;
  onBack: () => void;
  children: (onZoom: (item: ProjectMediaItem) => void) => React.ReactNode;
}) {
  const [zoomed, setZoomed] = useState<ProjectMediaItem | null>(null);
  const [loupeZoom, setLoupeZoom] = useState<number>(2.6);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (zoomed) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [zoomed]);

  const closeLightbox = () => {
    setZoomed(null);
  };

  return (
    <article
      aria-label={project.title}
      className="w-full font-mono text-black"
    >
      <ProjectTopBar theme={theme} onBack={onBack} />

      {children(setZoomed)}

      <ProjectBackLink theme={theme} onBack={onBack} />

      {/* visor modal nativo para inspeccionar planos y fotografias a mayor escala */}
      <dialog
        ref={dialogRef}
        aria-label={zoomed?.alt || "Vista ampliada"}
        onCancel={(e) => {
          e.preventDefault();
          closeLightbox();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeLightbox();
          }
        }}
        className="project-lightbox"
      >
        {zoomed && (
          <div className="bg-white border border-black p-4 md:p-6 max-w-[min(94vw,1280px)] max-h-[92dvh] flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 font-mono text-xs">
              <span className="text-[#737373] truncate">
                {zoomed.caption || zoomed.alt}
              </span>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:inline text-[11px] text-[#737373] tabular-nums">
                  Lupa {loupeZoom.toFixed(1)}×
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="site-inline-link font-mono text-xs cursor-pointer shrink-0"
                >
                  Cerrar ×
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white overflow-visible">
              <LightboxLoupe
                key={zoomed.path}
                item={zoomed}
                onZoomChange={setLoupeZoom}
              />
            </div>
          </div>
        )}
      </dialog>
    </article>
  );
}

// unica franja vertical de tipologia por proyecto
export function ProjectVerticalTag({
  label,
  theme,
}: {
  label: string;
  theme: CategoryTheme;
}) {
  return (
    <span
      style={{
        backgroundColor: theme.highlightBg,
        color: theme.highlightText,
      }}
      className="site-vertical-tag font-mono font-normal whitespace-nowrap select-none shrink-0"
    >
      {label}
    </span>
  );
}

// caja numerica de proyecto con misma geometria que las tarjetas del catalogo
export function ProjectCodeBadge({
  code,
  theme,
}: {
  code: string;
  theme: CategoryTheme;
}) {
  return (
    <div
      style={{
        borderColor: theme.boxBorder,
        color: theme.boxText,
      }}
      className="w-[56px] min-h-[48px] border bg-white flex flex-col items-center justify-center gap-[1px] text-center px-1.5 py-1.5 font-mono leading-[1.15] shrink-0"
    >
      <span className="text-[10px] tracking-[0.04em] font-normal uppercase">
        PROY
      </span>
      <span className="text-[12px] font-semibold tabular-nums">{code}</span>
    </div>
  );
}

// titulo dual regular + bold italic acompañado a la izquierda por la caja PROY / XX
export function ProjectTitle({
  project,
  className = "text-xl md:text-2xl",
}: {
  project: ProjectItem;
  className?: string;
}) {
  const theme = CATEGORY_THEMES[project.category];

  return (
    <div className="flex items-center gap-3.5 md:gap-4">
      <ProjectCodeBadge code={project.code} theme={theme} />
      <h1
        className={`min-w-0 flex-1 font-mono leading-[1.2] tracking-[-0.01em] text-black uppercase ${className}`}
      >
        {project.prefix ? (
          <>
            <span className="font-normal">{project.prefix} </span>
            <span className="font-bold italic">{project.name}</span>
          </>
        ) : (
          <span className="font-bold italic">{project.name}</span>
        )}
      </h1>
    </div>
  );
}

// ficha tecnica abierta sin recuadros ni lineas extra
export function ProjectSpecsList({ specs }: { specs: ProjectSpec[] }) {
  return (
    <dl className="space-y-2 text-xs">
      {specs.map((spec) => (
        <div key={spec.label} className="flex justify-between gap-4">
          <dt className="text-[#737373] shrink-0">{spec.label}</dt>
          <dd className="text-right text-black tabular-nums">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// figura arquitectonica enmarcada con zoom opcional y etiqueta vertical
export function ProjectFigure({
  item,
  theme,
  verticalTag,
  priority = false,
  aspectClass,
  cover = false,
  hideCaption = false,
  onZoom,
  className = "",
}: {
  item: ProjectMediaItem;
  theme?: CategoryTheme;
  verticalTag?: string;
  priority?: boolean;
  aspectClass?: string;
  cover?: boolean;
  hideCaption?: boolean;
  onZoom: (item: ProjectMediaItem) => void;
  className?: string;
}) {
  const isDrawing = Boolean(item.isDrawing);
  const imgBox = (
    <button
      type="button"
      onClick={() => onZoom(item)}
      aria-label={`Ampliar: ${item.caption || item.alt}`}
      className={`group block w-full text-left border border-black overflow-hidden cursor-zoom-in focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 ${
        isDrawing ? "bg-white p-3 md:p-6" : "bg-neutral-100"
      }`}
    >
      <img
        src={item.url}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`block w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] ${
          aspectClass
            ? `${aspectClass} ${cover ? "object-cover" : "object-contain"}`
            : "h-auto object-contain"
        }`}
      />
    </button>
  );

  return (
    <figure className={className}>
      {verticalTag && theme ? (
        <div className="flex items-start gap-[7px]">
          <ProjectVerticalTag label={verticalTag} theme={theme} />
          <div className="flex-1 min-w-0">{imgBox}</div>
        </div>
      ) : (
        imgBox
      )}
      {!hideCaption && item.caption && (
        <figcaption
          className={`mt-2 text-[11px] leading-[1.4] text-[#737373] ${
            verticalTag ? "pl-[28px]" : ""
          }`}
        >
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
