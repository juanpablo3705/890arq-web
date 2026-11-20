"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// composicion asimetrica 4/8 con ficha abierta y secuencia tecnica escalonada
export function AsymmetricDossierLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [hero, ...rest] = project.gallery;

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ProjectTitle project={project} className="text-lg md:text-xl" />
          <ProjectSpecsList specs={project.specs} />
          <p className="text-xs leading-[1.7]">{project.caseDescription}</p>
        </div>

        {hero && (
          <div className="lg:col-span-8">
            <ProjectFigure
              item={hero}
              theme={theme}
              verticalTag={project.category}
              priority
              onZoom={onZoom}
            />
          </div>
        )}
      </div>

      {project.architectureRationale && (
        <div className="max-w-[680px] text-xs leading-[1.7]">
          <p>{project.architectureRationale}</p>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {rest.map((item, idx) => {
            const isFullWidth =
              item.width / item.height >= 1.85 ||
              (rest.length % 2 === 1 && idx === rest.length - 1);
            return (
              <ProjectFigure
                key={item.path}
                item={item}
                onZoom={onZoom}
                className={isFullWidth ? "md:col-span-2" : ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
