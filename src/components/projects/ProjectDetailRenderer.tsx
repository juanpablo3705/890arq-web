"use client";

import React from "react";
import { Proyecto1Page } from "./pages/Proyecto1Page";
import { Proyecto2Page } from "./pages/Proyecto2Page";
import { Proyecto3Page } from "./pages/Proyecto3Page";
import { Proyecto4Page } from "./pages/Proyecto4Page";
import { Proyecto5Page } from "./pages/Proyecto5Page";

interface ProjectDetailRendererProps {
  slug: string;
  onBack: () => void;
}

// registro mapeador de cada slug de proyecto a su componente de diseno libre
const PROJECT_COMPONENTS: Record<
  string,
  React.ComponentType<{ onBack: () => void }>
> = {
  "proyecto-1": Proyecto1Page,
  "proyecto-2": Proyecto2Page,
  "proyecto-3": Proyecto3Page,
  "proyecto-4": Proyecto4Page,
  "proyecto-5": Proyecto5Page,
};

export function ProjectDetailRenderer({
  slug,
  onBack,
}: ProjectDetailRendererProps) {
  const ProjectPageComponent = PROJECT_COMPONENTS[slug];

  if (!ProjectPageComponent) {
    return null;
  }

  return <ProjectPageComponent onBack={onBack} />;
}
