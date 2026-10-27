import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects-service';
import ProjectsCatalog from '@/components/ui/ProjectsCatalog';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sección Proyectos',
  description:
    'Portafolio de proyectos de Arquitectura Habitacional, Proyectos Híbridos, Viviendas Modulares, Obras Civiles e Industriales de 890 ARQ.',
};

export default async function ProyectosPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-[calc(100vh-76px)] bg-white text-black">
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto pt-14 pb-24 px-6 font-mono text-xs text-zinc-500 text-center">
            Cargando catálogo de proyectos...
          </div>
        }
      >
        <ProjectsCatalog projects={projects} />
      </Suspense>
    </div>
  );
}
