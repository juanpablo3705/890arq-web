"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// monografia partida 5/7 con lamina protagonica a la izquierda y narrativa + vistas a la derecha
export function SplitMonographLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [primary, secondary, ...rest] = project.gallery;

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {primary && (
          <div className="lg:col-span-5">
            <ProjectFigure
              item={primary}
              theme={theme}
              verticalTag={project.category}
              priority
              onZoom={onZoom}
            />
          </div>
        )}

        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <ProjectTitle project={project} />
            <ProjectSpecsList specs={project.specs} />
            <div className="space-y-4 text-xs leading-[1.7]">
              <p>{project.caseDescription}</p>
              {project.architectureRationale && (
                <p>{project.architectureRationale}</p>
              )}
            </div>
          </div>

          {secondary && <ProjectFigure item={secondary} onZoom={onZoom} />}
        </div>
      </div>

      {rest.length === 1 && <ProjectFigure item={rest[0]} onZoom={onZoom} />}

      {rest.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {rest.map((item, idx) => {
            const isWide =
              item.width / item.height >= 2.0 ||
              (rest.length % 2 === 1 && idx === rest.length - 1);
            return (
              <ProjectFigure
                key={item.path}
                item={item}
                onZoom={onZoom}
                className={isWide ? "md:col-span-2" : ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
