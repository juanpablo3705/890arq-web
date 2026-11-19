"use client";

import React from "react";
import { CATEGORY_THEMES, PROJECTS_DATA } from "@/data/projects";
import { CategoryTheme, ProjectItem } from "@/types/domain";

export interface ResolvedProjectMeta {
  project: ProjectItem;
  theme: CategoryTheme;
}

// obtiene metadatos y tema cromatico desde el catalogo central
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

// barra superior unica sin etiquetas redundantes
export function ProjectTopBar({ project, theme, onBack }: ProjectBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black pb-5 mb-12">
      <button
        type="button"
        onClick={onBack}
        style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
        className="site-inline-link site-inline-link--flush font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
      >
        &lt; Volver a proyectos
      </button>

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

// retorno discreto al cierre sin agregar lineas extra
export function ProjectBackLink({
  theme,
  onBack,
}: {
  theme: CategoryTheme;
  onBack: () => void;
}) {
  return (
    <div className="mt-14">
      <button
        type="button"
        onClick={onBack}
        style={{ "--link-hover": theme.hoverAccent } as React.CSSProperties}
        className="site-inline-link site-inline-link--flush font-mono text-xs tracking-tight cursor-pointer whitespace-nowrap"
      >
        &lt; Volver a proyectos
      </button>
    </div>
  );
}
