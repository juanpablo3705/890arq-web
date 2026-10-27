import Link from 'next/link';
import SeaWaveBox from '@/components/ui/SeaWaveBox';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-white flex flex-col items-center justify-center px-6 py-24">
      {/* Composición en Cruz idéntica a 01-home-original.png y www.890arq.cl */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-12 sm:gap-16">
        {/* Fila Superior: Proyectos > */}
        <div className="flex justify-center pl-3.5 pt-3.5">
          <div className="arq-btn-frame">
            <Link href="/proyectos" className="arq-btn">
              Proyectos &gt;
            </Link>
          </div>
        </div>

        {/* Fila Central: Contacto >  |  [ 890 / ARQ ]  |  Nosotros > */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24">
          {/* Izquierda: Contacto > */}
          <div className="pl-3.5 pt-3.5">
            <div className="arq-btn-frame">
              <Link href="/contacto" className="arq-btn">
                Contacto &gt;
              </Link>
            </div>
          </div>

          {/* Centro: Cuadro arquitectónico 890 / ARQ con vaivén marino en las letras */}
          <SeaWaveBox />

          {/* Derecha: Nosotros > */}
          <div className="pl-3.5 pt-3.5">
            <div className="arq-btn-frame">
              <Link href="/nosotros" className="arq-btn">
                Nosotros &gt;
              </Link>
            </div>
          </div>
        </div>

        {/* Fila Inferior: Servicios > */}
        <div className="flex justify-center pl-3.5 pt-3.5">
          <div className="arq-btn-frame">
            <Link href="/servicios" className="arq-btn">
              Servicios &gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
