"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// composicion tecnica para especialidades con grafica isometrica protagonista y planos cad
export function TechnicalBlueprintLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [graphic, ...cadSheets] = project.gallery;

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {graphic && (
          <div className="lg:col-span-6">
            <ProjectFigure
              item={graphic}
              theme={theme}
              verticalTag={project.category}
              priority
              onZoom={onZoom}
            />
          </div>
        )}

        <div className="lg:col-span-6 flex flex-col gap-6">
          <ProjectTitle project={project} />
          <ProjectSpecsList specs={project.specs} />
          <p className="text-xs leading-[1.7]">{project.caseDescription}</p>
        </div>
      </div>

      {cadSheets.length === 1 && (
        <ProjectFigure item={cadSheets[0]} onZoom={onZoom} />
      )}

      {cadSheets.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {cadSheets.map((item, idx) => {
            const isFull =
              cadSheets.length % 2 === 1 && idx === cadSheets.length - 1;
            return (
              <ProjectFigure
                key={item.path}
                item={item}
                onZoom={onZoom}
                className={isFull ? "md:col-span-2" : ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
