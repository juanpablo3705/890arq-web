"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CategoryId, SectionId } from "@/types/domain";
import { SocialChannelId } from "./socialChannels";

export type SocialDockPhase =
  | "corner"
  | "flying-to-contacto"
  | "docked"
  | "flying-to-corner";

// estado global del lienzo espacial
interface CanvasContextValue {
  activeSection: SectionId;
  activeProjectSlug: string | null;
  selectedCategory: CategoryId | null;
  socialDockPhase: SocialDockPhase;
  setActiveSection: (section: SectionId) => void;
  navigateTo: (section: SectionId) => void;
  goHome: () => void;
  setActiveProjectSlug: (slug: string | null) => void;
  openProject: (slug: string) => void;
  closeProject: () => void;
  setSelectedCategory: (category: CategoryId | null) => void;
  setSocialDockPhase: (phase: SocialDockPhase) => void;
  registerContactoPane: (el: HTMLDivElement | null) => void;
  getContactoPane: () => HTMLDivElement | null;
  registerSocialSlot: (id: SocialChannelId, el: HTMLElement | null) => void;
  getSocialSlot: (id: SocialChannelId) => HTMLElement | null;
}

const CanvasContext = createContext<CanvasContextValue | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>("home");
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [socialDockPhase, setSocialDockPhase] = useState<SocialDockPhase>("corner");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contactoPaneRef = useRef<HTMLDivElement | null>(null);
  const socialSlotRefs = useRef<Record<SocialChannelId, HTMLElement | null>>({
    mail: null,
    whatsapp: null,
    instagram: null,
  });

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

  const registerContactoPane = useCallback((el: HTMLDivElement | null) => {
    contactoPaneRef.current = el;
  }, []);

  const getContactoPane = useCallback(() => contactoPaneRef.current, []);

  const registerSocialSlot = useCallback(
    (id: SocialChannelId, el: HTMLElement | null) => {
      socialSlotRefs.current[id] = el;
    },
    []
  );

  const getSocialSlot = useCallback(
    (id: SocialChannelId) => socialSlotRefs.current[id],
    []
  );

  return (
    <CanvasContext.Provider
      value={{
        activeSection,
        activeProjectSlug,
        selectedCategory,
        socialDockPhase,
        setActiveSection: navigateTo,
        navigateTo,
        goHome,
        setActiveProjectSlug,
        openProject,
        closeProject,
        setSelectedCategory,
        setSocialDockPhase,
        registerContactoPane,
        getContactoPane,
        registerSocialSlot,
        getSocialSlot,
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
