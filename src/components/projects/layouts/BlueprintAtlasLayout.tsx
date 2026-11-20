"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// atlas planimetrico con lamina principal a ancho completo y grilla de planos ampliables
export function BlueprintAtlasLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [lead, ...sheets] = project.gallery;

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <ProjectTitle project={project} />
          <ProjectSpecsList specs={project.specs} />
        </div>

        <div className="lg:col-span-7 text-xs leading-[1.7] space-y-4">
          <p>{project.caseDescription}</p>
          {project.architectureRationale && (
            <p>{project.architectureRationale}</p>
          )}
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

      {sheets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {sheets.map((item, idx) => {
            const isFull =
              sheets.length % 2 === 1 && idx === sheets.length - 1;
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
