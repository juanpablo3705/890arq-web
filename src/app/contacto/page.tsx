import type { Metadata } from 'next';
import { ContactForm } from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacto directo con 890 ARQ – Arquitectura, Construcción, Tasación y Diseño.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-white text-black flex items-center justify-center py-20 px-6">
      {/* Composición idéntica a 04-contacto-original.png: Rótulo vertical CONTACTO > + Formulario con sombra roja */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Columna Izquierda: Rótulo vertical CONTACTO > */}
        <div className="md:col-span-3 flex items-center justify-center">
          <h1 className="font-mono text-2xl sm:text-[28px] font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 select-none">
            CONTACTO &gt;
          </h1>
        </div>

        {/* Columna Derecha: Formulario original */}
        <div className="md:col-span-9">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
