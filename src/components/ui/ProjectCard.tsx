import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/domain';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Tarjeta visual idéntica a .card de www.890arq.cl (hover grayscale + texto IBM Plex Mono blanco) */}
      <Link
        href={`/proyectos/${project.slug}`}
        className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 flex items-center justify-center transition-all duration-500 group-hover:grayscale"
      >
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Velo sutil para legibilidad del rótulo blanco como en 890arq.cl */}
        <div className="absolute inset-0 bg-[#9b0606]/35 group-hover:bg-black/45 transition-colors duration-300" />

        <div className="relative z-10 w-full px-6 text-left">
          <h3 className="font-mono text-sm sm:text-base font-bold text-white drop-shadow-xs">
            {project.title} &gt;
          </h3>
        </div>
      </Link>

      {/* Pie técnico minimalista en IBM Plex Mono */}
      <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-600">
        <span className="truncate">
          {project.division} · {project.location.split(',')[0]}
        </span>
        {project.areaM2 && (
          <span className="shrink-0 font-semibold text-black">{project.areaM2} m²</span>
        )}
      </div>
    </article>
  );
}
