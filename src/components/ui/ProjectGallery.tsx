'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (!images || images.length === 0) {
    return null;
  }

  // En el diseño original (03-proyecto-detalle.png), las láminas principales de vistas
  // se despliegan centradas a ancho completo del contenedor de proyecto.
  const mainSheets = images.slice(0, 2);

  return (
    <div>
      {/* Láminas de Galería idénticas a 03-proyecto-detalle.png */}
      <div className="max-w-4xl mx-auto space-y-10">
        {mainSheets.map((url, idx) => (
          <button
            key={`${url}-${idx}`}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="block w-full bg-white overflow-hidden cursor-pointer focus:outline-none group"
            aria-label={`Ampliar lámina ${idx + 1} de ${projectTitle}`}
          >
            <Image
              src={url}
              alt={`${projectTitle} - Lámina ${idx + 1}`}
              width={1600}
              height={1100}
              className="w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-95"
            />
          </button>
        ))}
      </div>

      {/* Visor Modal Lightbox a Pantalla Completa */}
      {isOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de imágenes - ${projectTitle}`}
        >
          {/* Barra Superior */}
          <div className="px-6 h-16 flex items-center justify-between text-white font-mono text-xs">
            <span>
              {projectTitle} — {selectedIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white text-white hover:bg-[#DB0909] hover:border-[#DB0909] transition-colors cursor-pointer"
              aria-label="Cerrar visor"
            >
              <span>ESC</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Imagen Central y Controles */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 sm:p-10 overflow-hidden"
            onClick={handleClose}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 z-10 w-10 h-10 bg-black border border-white text-white hover:bg-[#DB0909] hover:border-[#DB0909] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${projectTitle} - Imagen ${selectedIndex + 1}`}
                width={1600}
                height={1200}
                className="max-h-[80vh] w-auto max-w-full object-contain bg-white"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 z-10 w-10 h-10 bg-black border border-white text-white hover:bg-[#DB0909] hover:border-[#DB0909] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="px-6 py-4 flex items-center justify-center gap-3 overflow-x-auto">
            {images.map((thumbUrl, idx) => (
              <button
                key={`thumb-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-14 h-10 overflow-hidden border transition-all cursor-pointer ${
                  idx === selectedIndex
                    ? 'border-[#DB0909] opacity-100'
                    : 'border-white/30 opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`Miniatura ${idx + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover bg-white"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
