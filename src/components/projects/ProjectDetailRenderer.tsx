"use client";

import React from "react";
import { ProjectLayoutVariant } from "@/types/domain";
import {
  getProjectMeta,
  ProjectLayoutProps,
  ProjectPageShell,
} from "./ProjectDetailChrome";
import { PanoramicEssayLayout } from "./layouts/PanoramicEssayLayout";
import { AsymmetricDossierLayout } from "./layouts/AsymmetricDossierLayout";
import { AtelierDiptychLayout } from "./layouts/AtelierDiptychLayout";
import { SplitMonographLayout } from "./layouts/SplitMonographLayout";
import { CinematicWalkthroughLayout } from "./layouts/CinematicWalkthroughLayout";
import { BlueprintAtlasLayout } from "./layouts/BlueprintAtlasLayout";
import { MinimalPlateLayout } from "./layouts/MinimalPlateLayout";
import { TechnicalBlueprintLayout } from "./layouts/TechnicalBlueprintLayout";
import { ModularTriptychLayout } from "./layouts/ModularTriptychLayout";

interface ProjectDetailRendererProps {
  slug: string;
  onBack: () => void;
}

// registro de arquitecturas editoriales por proyecto
const LAYOUT_COMPONENTS: Record<
  ProjectLayoutVariant,
  React.ComponentType<ProjectLayoutProps>
> = {
  "panoramic-essay": PanoramicEssayLayout,
  "asymmetric-dossier": AsymmetricDossierLayout,
  "atelier-diptych": AtelierDiptychLayout,
  "split-monograph": SplitMonographLayout,
  "cinematic-walkthrough": CinematicWalkthroughLayout,
  "blueprint-atlas": BlueprintAtlasLayout,
  "minimal-plate": MinimalPlateLayout,
  "technical-blueprint": TechnicalBlueprintLayout,
  "modular-triptych": ModularTriptychLayout,
};

// renderizador comun para las fichas de proyecto
export function ProjectDetailRenderer({
  slug,
  onBack,
}: ProjectDetailRendererProps) {
  const { project, theme } = getProjectMeta(slug);
  const LayoutComponent = LAYOUT_COMPONENTS[project.layout];

  return (
    <ProjectPageShell project={project} theme={theme} onBack={onBack}>
      {(onZoom) => (
        <LayoutComponent project={project} theme={theme} onZoom={onZoom} />
      )}
    </ProjectPageShell>
  );
}
