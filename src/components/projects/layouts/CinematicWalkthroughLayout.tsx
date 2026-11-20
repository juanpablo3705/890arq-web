"use client";

import React from "react";
import {
  ProjectFigure,
  ProjectLayoutProps,
  ProjectSpecsList,
  ProjectTitle,
} from "../ProjectDetailChrome";

// recorrido arquitectonico panoramico pensado para series amplias de vistas interiores
export function CinematicWalkthroughLayout({
  project,
  theme,
  onZoom,
}: ProjectLayoutProps) {
  const [hero, ...rooms] = project.gallery;
  const featured = rooms[1];
  const sequence = rooms.filter((_, idx) => idx !== 1);

  return (
    <div className="flex flex-col gap-14">
      {hero && (
        <ProjectFigure
          item={hero}
          theme={theme}
          verticalTag={project.category}
          priority
          onZoom={onZoom}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ProjectTitle project={project} className="text-lg md:text-xl" />
          <ProjectSpecsList specs={project.specs} />
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-[1.7]">
          <p>{project.caseDescription}</p>
          {project.architectureRationale && (
            <p>{project.architectureRationale}</p>
          )}
        </div>
      </div>

      {featured && <ProjectFigure item={featured} hideCaption onZoom={onZoom} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {sequence.map((item) => (
          <ProjectFigure
            key={item.path}
            item={item}
            hideCaption
            onZoom={onZoom}
          />
        ))}
      </div>
    </div>
  );
}
