import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/projects-service';
import ProjectGallery from '@/components/ui/ProjectGallery';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto solicitado no se encuentra disponible en 890 ARQ.',
    };
  }

  return {
    title: `${project.title} – ${project.location}`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | 890 ARQ`,
      description: project.shortDescription,
      images: project.coverImageUrl
        ? [
            {
              url: project.coverImageUrl,
              alt: project.title,
            },
          ]
        : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // En 03-proyecto-detalle.png, Cabañas Ocoa muestra el rótulo "PROYECTOS/ MODULARES"
  const verticalCategoryLabel =
    project.slug === 'cabanas-ocoa' ? 'MODULARES' : project.category.toUpperCase();

  // Planimetría superior según el proyecto
  const isOcoa = project.slug === 'cabanas-ocoa';
  const isCodequir = project.slug === 'edificio-codequir';

  // Separamos el título en líneas como "Cabañas / Ocoa" en la captura original
  const titleWords = project.title.split(' ');
  const firstLineTitle = titleWords[0];
  const restTitle = titleWords.slice(1).join(' ');

  return (
    <div className="bg-white text-black pt-16 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ===================================================================
            SECCIÓN 1: RÓTULO VERTICAL + PLANIMETRÍA + MEMORIA (03-proyecto-detalle.png)
        =================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-24">
          {/* Columna 1: Rótulo vertical "PROYECTOS/ MODULARES" */}
          <div className="md:col-span-2 flex items-center justify-center md:pt-12">
            <Link
              href="/proyectos"
              className="font-mono text-lg sm:text-xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 text-black hover:text-[#FF0000] transition-colors select-none"
            >
              PROYECTOS/ {verticalCategoryLabel}
            </Link>
          </div>

          {/* Columna 2: Planimetrías (Elevaciones y Plantas) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center space-y-12 pt-4">
            {isOcoa ? (
              <>
                <Image
                  src="/images/original/ocoa-elevaciones.jpeg"
                  alt="Elevaciones Cabañas Ocoa"
                  width={1200}
                  height={900}
                  className="w-full max-w-[320px] h-auto object-contain"
                />
                <Image
                  src="/images/original/ocoa-plantas.png"
                  alt="Plantas Cabañas Ocoa"
                  width={1200}
                  height={900}
                  className="w-full max-w-[360px] h-auto object-contain"
                />
              </>
            ) : isCodequir ? (
              <Image
                src="/images/original/codequir-2.jpeg"
                alt={`Planimetría ${project.title}`}
                width={1200}
                height={900}
                className="w-full max-w-[420px] h-auto object-contain"
              />
            ) : (
              <Image
                src={project.galleryUrls[1] || project.coverImageUrl}
                alt={`Planimetría ${project.title}`}
                width={1200}
                height={900}
                className="w-full max-w-[380px] h-auto object-contain filter grayscale"
              />
            )}
          </div>

          {/* Columna 3: Título, Ubicación y Memoria en columna angosta justificada */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h1 className="font-mono text-2xl sm:text-[26px] font-bold leading-snug text-black mb-3">
              <span className="block">{firstLineTitle}</span>
              {restTitle && <span className="block">{restTitle}</span>}
            </h1>

            <p className="font-mono text-[11px] text-zinc-800 mb-4 max-w-[200px] leading-snug">
              {project.location}
            </p>

            <p className="font-mono text-[10.5px] leading-[1.6] text-justify text-zinc-900 max-w-[215px]">
              {project.fullDescription}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECCIÓN 2: RENDER PRINCIPAL + SUPERFICIE Y PARTIDA ESTRUCTURAL
        =================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-24">
          <div className="md:col-span-7 md:col-start-2">
            <Image
              src={isOcoa ? '/images/original/ocoa-principal.jpeg' : project.coverImageUrl}
              alt={project.title}
              width={1600}
              height={1067}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="md:col-span-4 font-mono text-[11px] space-y-3 text-black">
            <p>
              <strong className="font-bold">Superficie:</strong>{' '}
              {project.areaM2 ? `${project.areaM2.toFixed(1)} m².` : '00.0 m².'}
            </p>
            <p>
              <strong className="font-bold">Partida estructural:</strong> –
            </p>
            <p className="text-zinc-500 pt-1">
              <strong className="font-bold text-black">División:</strong> {project.division} (
              {project.year})
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECCIÓN 3: LÁMINAS DE VISTAS EXTERIORES E INTERIORES (<ProjectGallery />)
        =================================================================== */}
        <section>
          <ProjectGallery images={project.galleryUrls} projectTitle={project.title} />
        </section>
      </div>
    </div>
  );
}
