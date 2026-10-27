'use client';

import { ProjectCategory } from '@/types/domain';

export type FilterCategory = ProjectCategory | 'Todas';

const CATEGORIES: FilterCategory[] = [
  'Todas',
  'Arquitectura',
  'Construcción',
  'Industrial',
  'Regularización',
  'Comercial',
];

interface CategoryFilterProps {
  selectedCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-5 pt-3 pl-3"
      role="tablist"
      aria-label="Filtrar proyectos por categoría"
    >
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <div key={category} className="arq-btn-frame">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category)}
              className={`arq-btn-sm ${
                isActive ? '!bg-[#DB0909] !text-white !border-[#DB0909]' : ''
              }`}
            >
              {category === 'Todas' ? 'Portafolio >' : `${category} >`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
