"use client";

import React from "react";
import { CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import { CategoryTheme, ProjectItem } from "@/types/domain";

export interface ResolvedProjectMeta {
  project: ProjectItem;
  theme: CategoryTheme;
}

// obtiene metadatos y tema cromático oficial desde el catalogo central
export function getProjectMeta(slug: string): ResolvedProjectMeta {
  const project =
    PROJECTS_DATA.find((item) => item.slug === slug) ?? PROJECTS_DATA[0];
  const theme = CATEGORY_THEMES[project.category];
  return { project, theme };
}

interface ProjectBarProps {
  project: ProjectItem;
  theme: CategoryTheme;
  onBack: () => void;
}

// barra superior unificada para cada vista de proyecto
export function ProjectTopBar({ project, theme, onBack }: ProjectBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black pb-5 mb-12">
      <button
        type="button"
        onClick={onBack}
        style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
        className="site-inline-link site-inline-link--flush font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
      >
        &lt; Volver a proyectos
      </button>

      <div className="flex items-center gap-3">
        <span
          style={{
            backgroundColor: theme.highlightBg,
            color: theme.highlightText,
          }}
          className="px-2.5 py-1.5 font-mono text-[11px] leading-none tracking-[0.01em] whitespace-nowrap"
        >
          {project.category}
        </span>

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
          <span className="text-[12px] font-semibold tabular-nums">
            {project.code}
          </span>
        </div>
      </div>
    </div>
  );
}

// franja vertical rotada con el color de tipologia del proyecto
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

// titulo dual regular + bold italic identico a las tarjetas de proyectos
export function ProjectTitle({
  project,
  className = "text-xl md:text-2xl",
}: {
  project: ProjectItem;
  className?: string;
}) {
  return (
    <h1
      className={`font-mono leading-[1.2] tracking-[-0.01em] text-black uppercase ${className}`}
    >
      <span className="font-normal">{project.prefix} </span>
      <span className="font-bold italic">{project.name}</span>
    </h1>
  );
}

// cierre inferior uniforme con retorno rapido a la grilla
export function ProjectFooterBar({ project, theme, onBack }: ProjectBarProps) {
  return (
    <footer className="mt-14 pt-6 border-t border-black flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
      <button
        type="button"
        onClick={onBack}
        style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
        className="site-inline-link site-inline-link--flush font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
      >
        &lt; Volver a proyectos
      </button>

      <span className="text-[11px] text-[#737373] uppercase tracking-[0.04em] tabular-nums">
        PROY {project.code} · {project.category} · {project.area}
      </span>
    </footer>
  );
}
