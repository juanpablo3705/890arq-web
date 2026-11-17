import { CanvasProvider } from "@/components/canvas/CanvasContext";
import { UIFrame } from "@/components/canvas/UIFrame";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";

// entrada principal del lienzo espacial 890 arq
export default function Page() {
  return (
    <CanvasProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-white">
        <UIFrame />
        <SpatialCanvas />
      </main>
    </CanvasProvider>
  );
}
