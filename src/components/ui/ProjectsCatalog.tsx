'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Project, ProjectCategory } from '@/types/domain';
import ProjectCard from '@/components/ui/ProjectCard';
import CategoryFilter, { FilterCategory } from '@/components/ui/CategoryFilter';

const VALID_CATEGORIES: readonly ProjectCategory[] = [
  'Arquitectura',
  'Construcción',
  'Industrial',
  'Regularización',
  'Comercial',
];

function parseCategoryParam(param: string | null): FilterCategory {
  if (param && VALID_CATEGORIES.includes(param as ProjectCategory)) {
    return param as ProjectCategory;
  }
  return 'Todas';
}

interface ProjectsCatalogProps {
  projects: Project[];
}

export default function ProjectsCatalog({ projects }: ProjectsCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  const [manualSelection, setManualSelection] = useState<{
    paramSnapshot: string | null;
    category: FilterCategory;
  } | null>(null);

  const selectedCategory: FilterCategory =
    manualSelection && manualSelection.paramSnapshot === categoryParam
      ? manualSelection.category
      : parseCategoryParam(categoryParam);

  const handleSelectCategory = (category: FilterCategory) => {
    setManualSelection({
      paramSnapshot: categoryParam,
      category,
    });
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todas') return projects;
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto pt-14 pb-24 px-6">
      {/* Selector de Categorías con botones desplazados estilo 890arq.cl */}
      <div className="mb-16">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Estructura idéntica a 890arq.cl/seccion-proyectos y /viviendas-modulares:
          Rótulo vertical PROYECTOS/ a la izquierda + Grilla de tarjetas al centro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Columna Izquierda: Rótulo vertical PROYECTOS/ */}
        <div className="md:col-span-2 flex items-center justify-center">
          <h1 className="font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
            PROYECTOS/ {selectedCategory !== 'Todas' ? selectedCategory.toUpperCase() : ''}
          </h1>
        </div>

        {/* Columna Derecha: Grilla de Tarjetas */}
        <div className="md:col-span-10">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center font-mono text-xs text-zinc-500">
              No hay proyectos en esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
