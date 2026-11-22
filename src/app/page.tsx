import { CanvasProvider } from "@/components/canvas/CanvasContext";
import { UIFrame } from "@/components/canvas/UIFrame";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";
import { HomeSection } from "@/components/sections/HomeSection";
import { ProyectosSection } from "@/components/sections/ProyectosSection";
import { ContactoSection } from "@/components/sections/ContactoSection";
import { OficinaSection } from "@/components/sections/OficinaSection";
import { CotizacionesSection } from "@/components/sections/CotizacionesSection";

// entrada principal del lienzo espacial 890 arq
export default function Page() {
  return (
    <CanvasProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-white">
        <UIFrame />
        <SpatialCanvas
          home={<HomeSection />}
          proyectos={<ProyectosSection />}
          contacto={<ContactoSection />}
          oficina={<OficinaSection />}
          cotizaciones={<CotizacionesSection />}
        />
      </main>
    </CanvasProvider>
  );
}
