import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nosotros – 890 ARQ Ltda. & 890 ARQ SpA',
  description:
    'Historia, estructura corporativa dual (890 ARQ Ltda. y 890 ARQ SpA), equipo profesional y visión arquitectónica de 890 ARQ.',
};

const TEAM_MEMBERS = [
  {
    name: 'Victor Flores Aguilera',
    lines: ['Arquitecto PUCV', 'Tasador PUC', 'CEO y Fundador 890ARQ'],
    image: '/images/original/team-vito.png',
  },
  {
    name: 'María Paz Zett',
    lines: ['Arquitecta PUCV', 'Directora Área Construcción'],
    image: '/images/original/team-mpaz.png',
  },
  {
    name: 'María José Espinosa',
    lines: ['Arquitecta PUC', 'Magister Arquitectura PUC', 'Directora Área Arquitectura'],
    image: '/images/original/team-cote.png',
  },
  {
    name: 'Juan Pablo Oyanedel',
    lines: ['Desarrollador web'],
    image: '/images/original/team-jp.png',
  },
];

export default function NosotrosPage() {
  return (
    <div className="bg-white text-black pt-14 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Botones superiores desplazados: Equipo / Visión (idénticos a 890arq.cl/nosotros) */}
        <div className="flex flex-col items-center sm:items-end sm:pr-24 gap-5 mb-16 pt-4">
          <div className="pl-3 pt-3">
            <div className="arq-btn-frame">
              <a href="#equipo" className="arq-btn-sm">
                Equipo
              </a>
            </div>
          </div>
          <div className="pl-3 pt-3">
            <div className="arq-btn-frame">
              <a href="#vision" className="arq-btn-sm">
                Visión
              </a>
            </div>
          </div>
        </div>

        {/* Sección 1: NOSOTROS > (Estructura Dual 890 ARQ LTDA. y 890 ARQ SpA) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-28">
          {/* Rótulo vertical izquierdo */}
          <div className="md:col-span-2 flex items-center justify-center">
            <h1 className="font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
              NOSOTROS &gt;
            </h1>
          </div>

          {/* Imagen de oficina */}
          <div className="md:col-span-5">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-100">
              <Image
                src="/images/original/nosotros-oficina.jpeg"
                alt="Estudio 890 ARQ"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto real de 890arq.cl/nosotros */}
          <div className="md:col-span-5 font-mono text-xs leading-relaxed text-justify space-y-4">
            <p>
              Iniciando sus actividades durante el año 2020, el estudio de arquitectura{' '}
              <strong>890 ARQ</strong> ha generado una expansión y diversificación de sus labores
              con el objetivo de abarcar gran parte de las aristas que dan cabida al desarrollo de
              proyectos.
            </p>
            <p>
              Bajo la conformación de <strong>890 ARQ LTDA.</strong> se da cabida a proyectos de
              diseño de inmuebles y paisajismo, además de tramitaciones municipales de obra,
              regularizaciones, tasaciones inmobiliarias particulares y comerciales, subdivisiones
              prediales, cambios de uso de suelo, entre otras funciones.
            </p>
            <p>
              Por otro lado, bajo el alero de <strong>890 ARQ SpA</strong> se realizan tareas de
              construcción y ejecución de obras, además de la rehabilitación, ampliación y
              remodelación de espacios.
            </p>
          </div>
        </section>

        {/* Sección 2: EQUIPO > (Flip Cards 3D idénticas a 890arq.cl/nosotros) */}
        <section id="equipo" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-28 scroll-mt-20">
          <div className="md:col-span-2 flex items-center justify-center">
            <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
              EQUIPO &gt;
            </h2>
          </div>

          <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="flip-card">
                <div className="flip-card-inner">
                  {/* Frente: Fotografía real */}
                  <div className="flip-card-front relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                  {/* Reverso: Fondo negro y tipografía IBM Plex Mono blanca */}
                  <div className="flip-card-back font-mono">
                    <h3 className="text-base font-bold mb-3">{member.name}</h3>
                    {member.lines.map((line) => (
                      <p key={line} className="text-xs text-zinc-200 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección 3: VISIÓN > */}
        <section id="vision" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center scroll-mt-20">
          <div className="md:col-span-2 flex items-center justify-center">
            <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
              VISIÓN &gt;
            </h2>
          </div>

          <div className="md:col-span-10 max-w-2xl font-mono text-xs leading-relaxed text-justify space-y-4">
            <p>
              En términos de diseño arquitectónico y construcción, <strong>890 ARQ</strong> se
              enfoca en alcanzar un desarrollo sostenible de sus proyectos, con énfasis en el diseño
              elemental y modular de las obras realizadas, profundizando en el aprovechamiento de
              las condiciones particulares de cada emplazamiento y la optimización constructiva.
            </p>
            <p>
              De manera simultánea, para toda clase de proyectos de arquitectura y obras civiles se
              busca establecer un canal de comunicación transparente con cada cliente, a modo de
              entregar soluciones expeditas y personalizadas tanto en diseño y gestión municipal (
              <strong>890 ARQ Ltda.</strong>) como en ejecución constructiva (
              <strong>890 ARQ SpA</strong>).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
