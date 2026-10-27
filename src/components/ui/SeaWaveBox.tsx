'use client';

import { useEffect, useRef } from 'react';

const TOP_CHARS = ['8', '9', '0'];
const BOTTOM_CHARS = ['A', 'R', 'Q'];

export default function SeaWaveBox() {
  const topRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = (now - startTime) / 1000;
      // Velocidad del oleaje (ciclo ~2.6s)
      const omega = 2.4;
      // Desfase entre cada letra para crear efecto de ola recorriendo la palabra
      const charPhaseStep = 0.9;

      // Vaivén horizontal general (resaca sutil de lado a lado)
      const globalSurgeTop = Math.sin(t * 1.6) * 1.45;
      const globalSurgeBottom = Math.sin(t * 1.6 - 0.8) * 1.45;

      TOP_CHARS.forEach((_, i) => {
        const el = topRefs.current[i];
        if (!el) return;
        const phase = t * omega - i * charPhaseStep;
        const x = globalSurgeTop + Math.cos(phase) * 0.85;
        const y = Math.sin(phase) * 1.45;
        const rot = Math.cos(phase) * 2.3;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });

      BOTTOM_CHARS.forEach((_, i) => {
        const el = bottomRefs.current[i];
        if (!el) return;
        // Desfase respecto a la fila superior para un movimiento orgánico de agua
        const phase = t * omega - i * charPhaseStep - 1.15;
        const x = globalSurgeBottom + Math.cos(phase) * 0.85;
        const y = Math.sin(phase) * 1.45;
        const rot = Math.cos(phase) * 2.3;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="w-[152px] h-[152px] border-[4px] border-black bg-white flex flex-col items-center justify-center select-none shrink-0"
      aria-label="890 ARQ"
    >
      {/* Fila superior: 890 (solo las letras tienen vaivén) */}
      <span className="font-mono text-[22px] font-medium leading-none text-black flex items-center justify-center">
        {TOP_CHARS.map((char, idx) => (
          <span
            key={`top-${idx}`}
            ref={(el) => {
              topRefs.current[idx] = el;
            }}
            className="arq-wave-letter"
          >
            {char}
          </span>
        ))}
      </span>

      {/* Barra separadora central: completamente estática */}
      <span className="block w-[96px] h-[4px] bg-black my-3" />

      {/* Fila inferior: ARQ (solo las letras tienen vaivén) */}
      <span className="font-mono text-[22px] font-medium leading-none text-black flex items-center justify-center">
        {BOTTOM_CHARS.map((char, idx) => (
          <span
            key={`bottom-${idx}`}
            ref={(el) => {
              bottomRefs.current[idx] = el;
            }}
            className="arq-wave-letter"
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
}
