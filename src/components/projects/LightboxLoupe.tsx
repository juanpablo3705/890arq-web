"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProjectMediaItem } from "@/types/domain";

const LOUPE_SIZE = 328;
const LOUPE_RADIUS = LOUPE_SIZE / 2;
const MIN_ZOOM = 1.8;
const MAX_ZOOM = 5;

interface LightboxLoupeProps {
  item: ProjectMediaItem;
  onZoomChange?: (zoom: number) => void;
}

// visor con lupa optica en gpu (translate3d) que sigue el puntero
export function LightboxLoupe({ item, onZoomChange }: LightboxLoupeProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);

  const rectRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef<{ rx: number; ry: number } | null>(null);
  const zoomRef = useRef<number>(2.6);
  const rafRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const computeBaseZoom = useCallback(
    (rect: DOMRect) => {
      const natW = imgRef.current?.naturalWidth || item.width;
      const nativeScale = rect.width > 0 ? natW / rect.width : 2.6;
      return Math.min(
        MAX_ZOOM,
        Math.max(2.6, Number((nativeScale * 1.45).toFixed(2)))
      );
    },
    [item.width]
  );

  // actualiza dimensiones de la imagen ampliada solo cuando cambia escala o tamano
  const syncZoomSize = useCallback((zoom: number) => {
    const rect = rectRef.current;
    const zoomImg = zoomImgRef.current;
    if (!rect || !zoomImg) return;

    zoomImg.style.width = `${(rect.width * zoom).toFixed(1)}px`;
    zoomImg.style.height = `${(rect.height * zoom).toFixed(1)}px`;
  }, []);

  // actualiza solo transformaciones gpu al desplazar el puntero
  const syncPositions = useCallback((rx: number, ry: number, zoom: number) => {
    const loupe = loupeRef.current;
    const zoomImg = zoomImgRef.current;
    if (!loupe || !zoomImg) return;

    loupe.style.transform = `translate3d(${(rx - LOUPE_RADIUS).toFixed(1)}px, ${(ry - LOUPE_RADIUS).toFixed(1)}px, 0)`;
    zoomImg.style.transform = `translate3d(${(LOUPE_RADIUS - rx * zoom).toFixed(1)}px, ${(LOUPE_RADIUS - ry * zoom).toFixed(1)}px, 0)`;
  }, []);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    rectRef.current = rect;
    const nextZoom = computeBaseZoom(rect);
    zoomRef.current = nextZoom;
    onZoomChange?.(nextZoom);
    syncZoomSize(nextZoom);
    if (pointerRef.current) {
      syncPositions(pointerRef.current.rx, pointerRef.current.ry, nextZoom);
    }
  }, [computeBaseZoom, onZoomChange, syncPositions, syncZoomSize]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const ro = new ResizeObserver(measure);
    ro.observe(img);
    measure();
    return () => {
      ro.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [item.url, measure]);

  // ajusta el nivel de aumento con la rueda del mouse mientras la lupa esta activa
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      if (!pointerRef.current || !rectRef.current) return;
      e.preventDefault();
      const step = e.deltaY < 0 ? 0.35 : -0.35;
      const clamped = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, Number((zoomRef.current + step).toFixed(2)))
      );
      if (clamped === zoomRef.current) return;
      zoomRef.current = clamped;
      onZoomChange?.(clamped);
      syncZoomSize(clamped);
      syncPositions(pointerRef.current.rx, pointerRef.current.ry, clamped);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", handleWheel);
    };
  }, [onZoomChange, syncPositions, syncZoomSize]);

  const schedulePositionSync = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!pointerRef.current) return;
      syncPositions(
        pointerRef.current.rx,
        pointerRef.current.ry,
        zoomRef.current
      );
    });
  };

  const updateFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const img = imgRef.current;
    if (!img) return;
    const hadRect = Boolean(rectRef.current);
    const rect = rectRef.current ?? img.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    if (!hadRect) {
      rectRef.current = rect;
      const baseZoom = computeBaseZoom(rect);
      zoomRef.current = baseZoom;
      onZoomChange?.(baseZoom);
      syncZoomSize(baseZoom);
    }
    const rx = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ry = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    pointerRef.current = { rx, ry };
    schedulePositionSync();
    if (!isActive) setIsActive(true);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    // refresca dimensiones por si el modal cambio de posicion al abrirse
    rectRef.current = null;
    updateFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateFromPointer(e);
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <div
      ref={stageRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative inline-block max-w-full select-none ${
        isActive ? "cursor-none" : "cursor-crosshair"
      }`}
    >
      <Image
        ref={imgRef}
        src={item.url}
        alt={item.alt}
        width={item.width}
        height={item.height}
        unoptimized
        onLoad={measure}
        draggable={false}
        className="block max-w-full max-h-[78dvh] w-auto h-auto object-contain"
      />

      {/* lente circular con imagen a resolucion nativa sincronizada al puntero */}
      <div
        ref={loupeRef}
        aria-hidden="true"
        data-active={isActive ? "true" : "false"}
        style={{ width: LOUPE_SIZE, height: LOUPE_SIZE }}
        className="loupe-lens"
      >
        <Image
          ref={zoomImgRef}
          src={item.url}
          alt=""
          width={item.width}
          height={item.height}
          unoptimized
          draggable={false}
          className="loupe-zoom-img"
        />

        {/* reticula optica al centro de la lupa */}
        <span className="loupe-reticle" />
      </div>
    </div>
  );
}
