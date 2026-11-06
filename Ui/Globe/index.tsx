"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { Globe as CobeGlobe } from "cobe";

import { useTheme } from "@/Ui/ThemeProvider";

type Vec3 = [number, number, number];

const GLOBE_COLORS = {
  dark: {
    dark: 1,
    baseColor: [0.97, 0.97, 0.97] as [number, number, number],
    glowColor: [0.24, 0.2, 0.3] as [number, number, number],
  },
  light: {
    dark: 0,
    baseColor: [1, 1, 1] as [number, number, number],
    glowColor: [0.95, 0.95, 0.97] as [number, number, number],
  },
} satisfies Record<
  "dark" | "light",
  {
    dark: number;
    baseColor: [number, number, number];
    glowColor: [number, number, number];
  }
>;

// Safi, Maroc
const SAFI = { lat: 32.2994, lng: -9.2372 };

const GLOBE_RADIUS = 0.8; // cobe dessine la sphère à 0.8 du demi-canvas
const THETA = 0.3; // inclinaison vers le spectateur
const PIN_ALTITUDE = 0.05;
const SWAY = 0.9; // amplitude du balancement autour de Safi (radians)

function toCartesian(lat: number, lng: number): Vec3 {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180 - Math.PI;
  const c = Math.cos(la);
  return [-c * Math.cos(lo), Math.sin(la), c * Math.sin(lo)];
}

// Même rotation que cobe applique sur le GPU : le pin HTML reste collé à la carte.
function project([x, y, z]: Vec3, phi: number, theta: number, altitude: number) {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const radius = GLOBE_RADIUS * (1 + altitude);
  const sx = (cp * x + sp * z) * radius;
  const sy = (sp * st * x + ct * y - cp * st * z) * radius;
  const depth = -sp * ct * x + st * y + cp * ct * z;
  return { x: (sx + 1) / 2, y: (1 - sy) / 2, depth };
}

/** Rotation qui tourne une longitude face au spectateur. */
function facingPhi(lng: number) {
  return (3 * Math.PI) / 2 - (lng * Math.PI) / 180;
}

export default function Globe({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const initialThemeRef = useRef(theme);
  const boxRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<CobeGlobe | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    const host = hostRef.current;
    const pin = pinRef.current;
    if (!box || !host || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vector = toCartesian(SAFI.lat, SAFI.lng);
    const base = facingPhi(SAFI.lng);

    let size = box.clientWidth || 300;
    let drag = 0; // décalage ajouté par l'utilisateur, revient doucement à 0
    let dragging = false;
    let lastX = 0;
    let onScreen = true;
    let raf = 0;
    let last = 0;
    let time = 0;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(canvas);

    let globe: CobeGlobe | null = null;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        width: size,
        height: size,
        phi: base,
        theta: THETA,
        ...GLOBE_COLORS[initialThemeRef.current],
        diffuse: 1.2,
        mapSamples: 8000,
        mapBrightness: 1.2,
        markerColor: [0.18, 0.29, 1], // = #2F4BFF (fluo)
        markerElevation: 0,
      });
      globeRef.current = globe;
    } catch {
      globe = null;
      globeRef.current = null;
    }

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (!reduced) time += dt;
      if (!dragging) drag *= Math.pow(0.94, dt * 60);

      const sway = reduced ? 0 : Math.sin(time * 0.35) * SWAY;
      const phi = base + sway + drag;

      globe?.update({ phi, theta: THETA });

      const p = project(vector, phi, THETA, PIN_ALTITUDE);
      const opacity = p.depth > 0 ? Math.min(1, 0.3 + p.depth * 2.2) : 0;
      pin.style.opacity = opacity.toFixed(2);
      pin.style.transform = `translate(${(p.x * size).toFixed(1)}px, ${(p.y * size).toFixed(1)}px) translate(-6px, -50%)`;

      if (onScreen && !document.hidden) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
      }
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    start();

    const resize = new ResizeObserver(() => {
      size = box.clientWidth || size;
      globe?.update({ width: size, height: size });
      start();
    });
    resize.observe(box);

    const visibility = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
      start();
    });
    visibility.observe(box);
    const onVisible = () => start();
    document.addEventListener("visibilitychange", onVisible);

    // Glisser pour faire tourner la Terre
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      box.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      drag += ((e.clientX - lastX) / Math.max(size, 1)) * Math.PI;
      lastX = e.clientX;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (box.hasPointerCapture(e.pointerId)) box.releasePointerCapture(e.pointerId);
    };
    box.addEventListener("pointerdown", down);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerup", up);
    box.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      box.removeEventListener("pointerdown", down);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerup", up);
      box.removeEventListener("pointercancel", up);
      globe?.destroy();
      globeRef.current = null;
      host.replaceChildren();
    };
  }, []);

  useEffect(() => {
    globeRef.current?.update(GLOBE_COLORS[theme]);
  }, [theme]);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label="Globe terrestre centré sur Safi, Maroc"
      className={`relative aspect-square w-full cursor-grab touch-pan-y select-none active:cursor-grabbing ${className}`}
    >
      {/* Halo
      <div
        aria-hidden="true"
        className="globe-halo pointer-events-none absolute inset-[10%] rounded-full"
      /> */}

      {/* Canvas WebGL (créé par cobe) */}
      <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />

      {/* Pin sur Safi (positionné à chaque frame) */}
      <div
        ref={pinRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-2 will-change-transform"
        style={{ opacity: 0 }}
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-fluo/70" />
          <span className="relative h-3 w-3 rounded-full border-2 border-white bg-fluo" />
        </span>
        <span         className="whitespace-nowrap rounded-full border border-line-2 bg-panel px-3 py-1 font-cyber text-[10px] tracking-wider text-ink">
          SAFI, MAROC
        </span>
      </div>
    </div>
  );
}