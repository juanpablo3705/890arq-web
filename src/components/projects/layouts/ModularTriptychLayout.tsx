"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// triptico o diptico modular con protagonista superior, memoria en columnas y modulos inferiores
export function ModularTriptychLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [hero, ...companions] = project.gallery;

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <header className="flex flex-col md:flex-row md:items-baseline justify-between gap-3">
        <ProjectTitle project={project} />
        <p className="text-xs text-[#737373] tabular-nums">
          {project.location} · {project.area}
        </p>
      </header>

      {hero && (
        <ProjectFigure
          item={hero}
          theme={theme}
          verticalTag={project.category}
          priority
          onZoom={onZoom}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-xs leading-[1.7]">
        <div className="lg:col-span-5">
          <p>{project.caseDescription}</p>
        </div>

        <div className="lg:col-span-4">
          {project.architectureRationale && (
            <p>{project.architectureRationale}</p>
          )}
        </div>

        <div className="lg:col-span-3">
          <ProjectSpecsList specs={project.specs} />
        </div>
      </div>

      {companions.length === 1 && (
        <ProjectFigure item={companions[0]} onZoom={onZoom} />
      )}

      {companions.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {companions.map((item) => (
            <ProjectFigure key={item.path} item={item} onZoom={onZoom} />
          ))}
        </div>
      )}
    </div>
  );
}
