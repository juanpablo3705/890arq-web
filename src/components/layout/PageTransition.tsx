'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const TRANSITION_DURATION_MS = 1500; // 1.5 segundos exactos

interface Snapshot {
  html: string;
  scrollY: number;
  pathname: string;
}

/**
 * Calcula el vector inicial (inStartX, inStartY) en porcentaje desde donde entra
 * la nueva pantalla. La pantalla que se abandona se desplaza en sentido opuesto
 * (-inStartX, -inStartY).
 *
 * Mapa espacial en cruz en torno al Home ('/'):
 * - Arriba:    '/proyectos'
 * - Izquierda: '/contacto'
 * - Centro:    '/' (Home: 890 - ARQ)
 * - Derecha:   '/nosotros'
 * - Abajo:     '/servicios'
 */
function getIncomingStartVector(
  fromPath: string,
  toPath: string
): { inStartX: number; inStartY: number } {
  // 1. Desde Home ('/') hacia las 4 secciones principales
  if (fromPath === '/') {
    if (toPath === '/nosotros') {
      // Home va a la izquierda (-100, 0), Nosotros entra por la derecha (+100, 0)
      return { inStartX: 100, inStartY: 0 };
    }
    if (toPath === '/proyectos') {
      // Home va hacia abajo (0, +100), Proyectos entra por arriba (0, -100)
      return { inStartX: 0, inStartY: -100 };
    }
    if (toPath === '/contacto') {
      // Home va a la derecha (+100, 0), Contacto entra por la izquierda (-100, 0)
      return { inStartX: -100, inStartY: 0 };
    }
    if (toPath === '/servicios') {
      // Home va hacia arriba (0, -100), Servicios entra por abajo (0, +100)
      return { inStartX: 0, inStartY: 100 };
    }
  }

  // 2. Regreso inverso desde cada una de las 4 secciones principales hacia el Home ('/')
  if (toPath === '/') {
    if (fromPath === '/nosotros') {
      // Nosotros va a la derecha (+100, 0), Home entra por la izquierda (-100, 0)
      return { inStartX: -100, inStartY: 0 };
    }
    if (fromPath === '/proyectos') {
      // Proyectos va hacia arriba (0, -100), Home entra por abajo (0, +100)
      return { inStartX: 0, inStartY: 100 };
    }
    if (fromPath === '/contacto') {
      // Contacto va a la izquierda (-100, 0), Home entra por la derecha (+100, 0)
      return { inStartX: 100, inStartY: 0 };
    }
    if (fromPath === '/servicios') {
      // Servicios va hacia abajo (0, +100), Home entra por arriba (0, -100)
      return { inStartX: 0, inStartY: -100 };
    }
  }

  // 3. Cualquier otro vínculo con transición (ej. /proyectos <-> /proyectos/[slug] o desde subpáginas al Home):
  // La página que se abandona se escapa a la derecha (+100, 0) y la nueva entra por la izquierda (-100, 0)
  return { inStartX: -100, inStartY: 0 };
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);
  const outgoingWrapperRef = useRef<HTMLDivElement | null>(null);
  const outgoingContentRef = useRef<HTMLDivElement | null>(null);
  const incomingWrapperRef = useRef<HTMLDivElement | null>(null);
  const snapshotRef = useRef<Snapshot>({
    html: '',
    scrollY: 0,
    pathname,
  });
  const animFrameRef = useRef<number | null>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Guarda el estado visual actual de la pantalla antes de abandonarla
  const captureCurrentScreen = () => {
    if (!incomingWrapperRef.current) return;
    snapshotRef.current = {
      html: incomingWrapperRef.current.innerHTML,
      scrollY: window.scrollY,
      pathname: prevPathnameRef.current,
    };
  };

  // Captura preventiva al interactuar con enlaces internos o hacer scroll
  useEffect(() => {
    captureCurrentScreen();

    const handlePointerOrClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank'
      ) {
        return;
      }

      captureCurrentScreen();
    };

    const handleScroll = () => {
      if (!isTransitioningRef.current) {
        snapshotRef.current.scrollY = window.scrollY;
      }
    };

    window.addEventListener('pointerdown', handlePointerOrClick, true);
    window.addEventListener('click', handlePointerOrClick, true);
    window.addEventListener('keydown', handlePointerOrClick, true);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerOrClick, true);
      window.removeEventListener('click', handlePointerOrClick, true);
      window.removeEventListener('keydown', handlePointerOrClick, true);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ejecución sincrónica antes del repintado del navegador cuando cambia la ruta interna
  useLayoutEffect(() => {
    const fromPath = prevPathnameRef.current;
    const toPath = pathname;

    if (fromPath === toPath) {
      captureCurrentScreen();
      return;
    }

    const outgoingWrapper = outgoingWrapperRef.current;
    const outgoingContent = outgoingContentRef.current;
    const incomingWrapper = incomingWrapperRef.current;

    if (!outgoingWrapper || !outgoingContent || !incomingWrapper) {
      prevPathnameRef.current = toPath;
      return;
    }

    // Cancelar cualquier animación previa en curso
    if (animFrameRef.current !== null) {
      window.cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const snap = snapshotRef.current;
    prevPathnameRef.current = toPath;
    isTransitioningRef.current = true;

    const { inStartX, inStartY } = getIncomingStartVector(fromPath, toPath);
    const outEndX = -inStartX;
    const outEndY = -inStartY;

    // 1. Preparar la pantalla que se abandona en su posición actual (0%, 0%)
    outgoingContent.innerHTML = snap.html;
    outgoingContent.style.transform = `translate3d(0, -${snap.scrollY}px, 0)`;
    outgoingWrapper.style.display = 'block';
    outgoingWrapper.style.willChange = 'transform';
    outgoingWrapper.style.transform = 'translate3d(0%, 0%, 0)';

    // 2. Preparar la nueva sección con alto de viewport (100vh) durante la transición
    // para que los desplazamientos verticales y horizontales calcen borde con borde
    incomingWrapper.style.height = '100vh';
    incomingWrapper.style.overflow = 'hidden';
    incomingWrapper.style.willChange = 'transform';
    incomingWrapper.style.transform = `translate3d(${inStartX}%, ${inStartY}%, 0)`;

    // 3. Posicionar el scroll arriba para la nueva sección
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const startTime = performance.now();

    // Curva suave easeInOutCubic
    const easeInOutCubic = (x: number): number =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / TRANSITION_DURATION_MS);
      const eased = easeInOutCubic(rawProgress);

      const outX = outEndX * eased;
      const outY = outEndY * eased;
      const inX = inStartX * (1 - eased);
      const inY = inStartY * (1 - eased);

      outgoingWrapper.style.transform = `translate3d(${outX.toFixed(3)}%, ${outY.toFixed(3)}%, 0)`;
      incomingWrapper.style.transform = `translate3d(${inX.toFixed(3)}%, ${inY.toFixed(3)}%, 0)`;

      if (rawProgress < 1) {
        animFrameRef.current = window.requestAnimationFrame(step);
      } else {
        // Limpieza al finalizar los 1.5 segundos
        outgoingWrapper.style.display = 'none';
        outgoingWrapper.style.transform = '';
        outgoingWrapper.style.willChange = '';
        outgoingContent.innerHTML = '';
        outgoingContent.style.transform = '';

        incomingWrapper.style.height = '';
        incomingWrapper.style.overflow = '';
        incomingWrapper.style.transform = '';
        incomingWrapper.style.willChange = '';

        isTransitioningRef.current = false;
        animFrameRef.current = null;

        // Guardar snapshot de la nueva pantalla ya asentada
        captureCurrentScreen();
      }
    };

    animFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        window.cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Pantalla que se abandona */}
      <div
        ref={outgoingWrapperRef}
        aria-hidden="true"
        className="fixed inset-0 z-30 pointer-events-none overflow-hidden bg-white"
        style={{ display: 'none' }}
      >
        <div ref={outgoingContentRef} className="w-full min-h-screen bg-white" />
      </div>

      {/* Nueva sección que se abre */}
      <div ref={incomingWrapperRef} className="relative z-20 w-full bg-white">
        {children}
      </div>
    </div>
  );
}
