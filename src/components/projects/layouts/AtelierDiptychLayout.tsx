"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// composicion de taller con apertura amplia, cruce texto/imagen 5/7 y cierre limpio
export function AtelierDiptychLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [first, second, ...rest] = project.gallery;

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <header>
        <ProjectTitle project={project} />
      </header>

      {first && (
        <ProjectFigure
          item={first}
          theme={theme}
          verticalTag={project.category}
          priority
          onZoom={onZoom}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6 text-xs leading-[1.7]">
          <p>{project.caseDescription}</p>
          {project.architectureRationale && (
            <p>{project.architectureRationale}</p>
          )}
          <div className="pt-2">
            <ProjectSpecsList specs={project.specs} />
          </div>
        </div>

        {second && (
          <div className="lg:col-span-7">
            <ProjectFigure item={second} onZoom={onZoom} />
          </div>
        )}
      </div>

      {rest.length === 1 && <ProjectFigure item={rest[0]} onZoom={onZoom} />}

      {rest.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {rest.map((item, idx) => {
            const spanClass =
              rest.length === 2 &&
              rest[0].width / rest[0].height > rest[1].width / rest[1].height
                ? idx === 0
                  ? "md:col-span-7"
                  : "md:col-span-5"
                : "md:col-span-6";
            return (
              <ProjectFigure
                key={item.path}
                item={item}
                onZoom={onZoom}
                className={spanClass}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
