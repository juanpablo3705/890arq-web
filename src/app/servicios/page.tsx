import type { Metadata } from 'next';
import Image from 'next/image';
import TasacionForm from '@/components/ui/TasacionForm';

export const metadata: Metadata = {
  title: 'Servicios – Arquitectura / Construcción / Tasación',
  description:
    'Servicios de Diseño y Gestión, Tramitación Municipal DOM, Ejecución de Obra, Asesoría ITO, Remodelaciones y Tasación en 890 ARQ.',
};

export default function ServiciosPage() {
  return (
    <div className="bg-white text-black pt-10 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 1. Tres botones superiores desplazados (Arquitectura, Construcción, Tasación) idénticos a 02-servicios-original.png */}
        <div className="flex flex-col items-center sm:items-end sm:pr-40 gap-5 mb-12 pt-4">
          <div className="pl-3 pt-3">
            <div className="arq-btn-frame">
              <a href="#arquitectura" className="arq-btn-sm">
                Arquitectura
              </a>
            </div>
          </div>
          <div className="pl-3 pt-3">
            <div className="arq-btn-frame">
              <a href="#construccion" className="arq-btn-sm">
                Construcción
              </a>
            </div>
          </div>
          <div className="pl-3 pt-3">
            <div className="arq-btn-frame">
              <a href="#tasacion" className="arq-btn-sm">
                Tasación
              </a>
            </div>
          </div>
        </div>

        {/* 2. Mapa conceptual / Nube de especialidades original (IMAGENES-WEB-01) */}
        <div className="max-w-3xl mx-auto mb-24">
          <Image
            src="/images/original/servicios-mapa.jpg"
            alt="Mapa de Servicios 890 ARQ: Arquitectura, Construcción, Tasación, Tramitación Municipal, Ejecución de Obra"
            width={1536}
            height={864}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 3. Bloque ARQUITECTURA: DISEÑO Y GESTIÓN + TRAMITACIÓN MUNICIPAL */}
        <section id="arquitectura" className="max-w-xl mx-auto mb-28 scroll-mt-20 space-y-12">
          {/* DISEÑO Y GESTIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <h2 className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wide text-black">
                DISEÑO Y GESTIÓN
              </h2>
            </div>
            <div className="sm:col-span-6">
              <ul className="font-mono text-[11px] sm:text-xs text-zinc-800 space-y-1 leading-relaxed">
                <li>• Diseño arquitectónico.</li>
                <li>• Paisajismo.</li>
                <li>• Gestión inmobiliaria.</li>
                <li>• Proyecto espacios públicos.</li>
              </ul>
            </div>
          </div>

          {/* TRAMITACIÓN MUNICIPAL */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <h2 className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wide text-black leading-snug">
                TRAMITACIÓN
                <br />
                MUNICIPAL
              </h2>
            </div>
            <div className="sm:col-span-6">
              <ul className="font-mono text-[11px] sm:text-xs text-zinc-800 space-y-1 leading-relaxed">
                <li>• Permiso de Edificación (obra mayor, menor y ampliación)</li>
                <li>• Ley 20.898 (Ley del Mono)</li>
                <li>• Recepción Municipal Definitiva</li>
                <li>• Loteo, Subdivisión y Fusión.</li>
                <li>• Obtención de patentes.</li>
                <li>• Cambio de uso de suelo y/o destino.</li>
                <li>• Informe Favorable para la Construcción (IFE).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Bloque CONSTRUCCIÓN: EJECUCIÓN DE OBRA + ASESORÍA DE OBRA + REMODELACIONES */}
        <section id="construccion" className="max-w-xl mx-auto mb-28 scroll-mt-20 space-y-12">
          {/* EJECUCIÓN DE OBRA */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <h2 className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wide text-black">
                EJECUCIÓN DE OBRA
              </h2>
            </div>
            <div className="sm:col-span-6">
              <ul className="font-mono text-[11px] sm:text-xs text-zinc-800 space-y-1 leading-relaxed">
                <li>• Planificación de obra.</li>
                <li>• Gestión de construcción.</li>
                <li>• Edificaciones de escala intermedia.</li>
                <li>• Obra nueva residencial.</li>
                <li>• Obra nueva comercial.</li>
              </ul>
            </div>
          </div>

          {/* ASESORÍA DE OBRA */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <h2 className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wide text-black">
                ASESORÍA DE OBRA
              </h2>
            </div>
            <div className="sm:col-span-6">
              <ul className="font-mono text-[11px] sm:text-xs text-zinc-800 space-y-1 leading-relaxed">
                <li>• Supervisión técnica.</li>
                <li>• Inspección Técnica de Obra (ITO).</li>
                <li>• Estudio de cabida.</li>
                <li>• Carta de planificación de proyectos constructivos.</li>
                <li>• Informe de habitabilidad.</li>
                <li>• Informe de cabida.</li>
                <li>• Logística de materiales y transporte.</li>
              </ul>
            </div>
          </div>

          {/* REMODELACIONES */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <h2 className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wide text-black">
                REMODELACIONES
              </h2>
            </div>
            <div className="sm:col-span-6">
              <ul className="font-mono text-[11px] sm:text-xs text-zinc-800 space-y-1 leading-relaxed">
                <li>• Remodelación parcial de obra.</li>
                <li>• Remodelación total de obra.</li>
                <li>• Ejecución obra intermedia.</li>
                <li>• Ejecución obra menor.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Bloque TASACIÓN > y Checklist Documental Municipal (idéntico a 02-servicios-original.png) */}
        <section id="tasacion" className="max-w-3xl mx-auto scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Rótulo vertical TASACIÓN > */}
            <div className="md:col-span-3 flex items-center justify-center">
              <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
                TASACIÓN &gt;
              </h2>
            </div>

            {/* Formulario con sombra desplazada roja #DB0909 y Checklist DOM */}
            <div className="md:col-span-9 flex justify-center md:justify-start">
              <TasacionForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
