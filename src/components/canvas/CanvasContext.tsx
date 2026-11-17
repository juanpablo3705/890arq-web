"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CategoryId, SectionId } from "@/types/domain";

// estado global del lienzo espacial
interface CanvasContextValue {
  activeSection: SectionId;
  activeProjectSlug: string | null;
  selectedCategory: CategoryId | null;
  setActiveSection: (section: SectionId) => void;
  navigateTo: (section: SectionId) => void;
  goHome: () => void;
  setActiveProjectSlug: (slug: string | null) => void;
  openProject: (slug: string) => void;
  closeProject: () => void;
  setSelectedCategory: (category: CategoryId | null) => void;
}

const CanvasContext = createContext<CanvasContextValue | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>("home");
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingReset = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const navigateTo = useCallback(
    (section: SectionId) => {
      clearPendingReset();
      setActiveSectionState(section);

      // si vuelve al home limpiamos el estado de proyectos al terminar el desplazamiento
      if (section === "home") {
        resetTimerRef.current = setTimeout(() => {
          setActiveProjectSlug(null);
          setSelectedCategory(null);
          resetTimerRef.current = null;
        }, 700);
      }
    },
    [clearPendingReset]
  );

  const goHome = useCallback(() => {
    navigateTo("home");
  }, [navigateTo]);

  const openProject = useCallback((slug: string) => {
    setActiveProjectSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectSlug(null);
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        activeSection,
        activeProjectSlug,
        selectedCategory,
        setActiveSection: navigateTo,
        navigateTo,
        goHome,
        setActiveProjectSlug,
        openProject,
        closeProject,
        setSelectedCategory,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("usecanvas debe usarse dentro de canvasprovider");
  }
  return context;
}
