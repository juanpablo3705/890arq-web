"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// composicion panoramica con memoria en dos columnas y secuencia editorial limpia
export function PanoramicEssayLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [hero, ...rest] = project.gallery;

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <header>
        <ProjectTitle project={project} />
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

      {rest.length > 0 && (
        <div className="flex flex-col gap-10">
          {rest.length === 3 ? (
            <>
              <ProjectFigure item={rest[1]} onZoom={onZoom} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <ProjectFigure item={rest[0]} onZoom={onZoom} />
                <ProjectFigure item={rest[2]} onZoom={onZoom} />
              </div>
            </>
          ) : rest.length === 4 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <ProjectFigure item={rest[0]} onZoom={onZoom} />
                <ProjectFigure item={rest[1]} onZoom={onZoom} />
              </div>
              <ProjectFigure item={rest[2]} onZoom={onZoom} />
              <ProjectFigure item={rest[3]} onZoom={onZoom} />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {rest.map((item, idx) => {
                const isWideSingle =
                  rest.length % 2 === 1 && idx === rest.length - 1;
                return (
                  <ProjectFigure
                    key={item.path}
                    item={item}
                    onZoom={onZoom}
                    className={isWideSingle ? "md:col-span-2" : ""}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
