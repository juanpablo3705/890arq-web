"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// composicion serena de galeria para obras de 1 a 3 laminas tecnicas
export function MinimalPlateLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [lead, ...rest] = project.gallery;

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <ProjectTitle project={project} />
          <ProjectSpecsList specs={project.specs} />
        </div>

        <div className="lg:col-span-7 text-xs leading-[1.7]">
          <p>{project.caseDescription}</p>
        </div>
      </div>

      {lead && (
        <ProjectFigure
          item={lead}
          theme={theme}
          verticalTag={project.category}
          priority
          onZoom={onZoom}
        />
      )}

      {rest.length === 1 && <ProjectFigure item={rest[0]} onZoom={onZoom} />}

      {rest.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {rest.map((item) => (
            <ProjectFigure key={item.path} item={item} onZoom={onZoom} />
          ))}
        </div>
      )}
    </div>
  );
}
