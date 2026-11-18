"use client";

import { useEffect, useRef } from "react";

const SIZE = 300;

type Pt = [number, number]; // [lon, lat]

const CONTINENTS: { name: string; pts: Pt[] }[] = [
  {
    name: "North America",
    pts: [[-168,66],[-140,70],[-120,72],[-95,72],[-80,68],[-62,60],[-55,50],[-67,45],[-76,38],[-81,31],[-80,25],[-90,29],[-97,26],[-97,20],[-87,21],[-83,15],[-78,8],[-86,11],[-92,15],[-105,20],[-110,24],[-115,30],[-123,38],[-125,48],[-135,58],[-150,60],[-165,60]],
  },
  {
    name: "South America",
    pts: [[-78,8],[-72,12],[-62,10],[-52,5],[-50,0],[-40,-3],[-35,-8],[-39,-15],[-41,-22],[-48,-26],[-58,-35],[-65,-42],[-68,-52],[-73,-50],[-72,-35],[-71,-18],[-77,-12],[-81,-5],[-79,2]],
  },
  {
    name: "Europe",
    pts: [[-9,37],[-9,43],[-2,43.5],[-4,48],[2,51],[8,54],[10,57],[6,62],[15,69],[28,71],[40,68],[60,68],[60,50],[50,46],[40,45],[30,45],[28,41],[23,37],[20,40],[13,45],[12,42],[16,38],[9,44],[3,43],[-1,37]],
  },
  {
    name: "Africa",
    pts: [[-17,21],[-10,30],[-6,36],[10,37],[20,32],[32,31],[35,28],[43,12],[51,12],[40,-3],[40,-15],[35,-25],[27,-34],[18,-34],[12,-17],[9,-1],[9,4],[-8,4],[-17,14]],
  },
  {
    name: "Asia",
    pts: [[60,68],[80,73],[110,77],[140,72],[170,70],[180,65],[160,58],[142,52],[140,45],[130,35],[122,30],[120,22],[108,18],[105,9],[100,13],[98,8],[103,1],[98,16],[92,22],[80,15],[77,8],[72,20],[67,25],[57,25],[57,20],[52,16],[43,13],[35,28],[35,36],[28,41],[40,45],[50,46],[60,50]],
  },
  {
    name: "Oceania",
    pts: [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[141,-38],[130,-32],[115,-34]],
  },
];

// Morocco (approximate outline)
const MOROCCO: Pt[] = [
  [-5.9, 35.8], [-5.3, 35.9], [-2.9, 35.3], [-1.8, 35.1],
  [-2.0, 34.1], [-1.7, 33.0], [-1.3, 32.1], [-3.0, 31.7],
  [-3.7, 30.9], [-5.5, 29.9], [-8.7, 28.7], [-8.7, 27.7],
  [-12.0, 26.0], [-12.0, 23.5], [-13.0, 21.4], [-17.0, 21.4],
  [-16.0, 23.7], [-14.5, 26.1], [-13.2, 27.7], [-11.5, 28.2],
  [-10.0, 29.5], [-9.8, 30.5], [-9.6, 31.5], [-8.5, 33.2],
  [-7.0, 34.0], [-6.4, 34.8],
];

const rad = (d: number) => (d * Math.PI) / 180;

export default function Globe({
  size = SIZE,
  showLabel = true,
}: {
  size?: number;
  showLabel?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // rotation state (degrees)
  const state = useRef({
    lambda: -20, // center longitude
    phi: 25, // center latitude (tilt)
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const C = size / 2;
    const R = size * 0.42;
    const AUTO_SPEED = 0.12; // deg / frame
    let raf = 0;

    // orthographic projection
    const project = (lon: number, lat: number) => {
      const { lambda, phi } = state.current;
      const l = rad(lon - lambda);
      const p = rad(lat);
      const p0 = rad(phi);
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
      const x = Math.cos(p) * Math.sin(l);
      const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
      return { x, y, visible: cosc > 0 };
    };

    const toScreen = (x: number, y: number) => [C + R * x, C - R * y] as const;

    const drawPolygon = (pts: Pt[], stroke = false) => {
      // hidden points are clamped to the horizon so shapes stay closed
      const screen = pts.map(([lon, lat]) => {
        const p = project(lon, lat);
        if (p.visible) return { ...p, vis: true };
        const len = Math.hypot(p.x, p.y) || 1;
        return { x: p.x / len, y: p.y / len, vis: false };
      });
      if (!screen.some((s) => s.vis)) return;
      ctx.beginPath();
      screen.forEach((s, i) => {
        const [sx, sy] = toScreen(s.x, s.y);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.closePath();
      ctx.fill();
      if (stroke) ctx.stroke();
    };

    const drawGraticule = () => {
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;

      const line = (pts: Pt[]) => {
        let pen = false;
        ctx.beginPath();
        for (const [lon, lat] of pts) {
          const p = project(lon, lat);
          if (!p.visible) {
            pen = false;
            continue;
          }
          const [sx, sy] = toScreen(p.x, p.y);
          if (!pen) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
          pen = true;
        }
        ctx.stroke();
      };

      for (let lon = -180; lon < 180; lon += 30) {
        const pts: Pt[] = [];
        for (let lat = -90; lat <= 90; lat += 5) pts.push([lon, lat]);
        line(pts);
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        const pts: Pt[] = [];
        for (let lon = -180; lon <= 180; lon += 5) pts.push([lon, lat]);
        line(pts);
      }
    };

    const render = (time: number) => {
      const s = state.current;

      if (!s.dragging) {
        // inertia, then settle into slow auto-rotation
        s.lambda += s.vx + AUTO_SPEED;
        s.phi += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
      }
      s.phi = Math.max(-70, Math.min(70, s.phi));

      ctx.clearRect(0, 0, size, size);

      // sphere
      const g = ctx.createRadialGradient(C - R * 0.3, C - R * 0.35, R * 0.1, C, C, R);
      g.addColorStop(0, "rgba(255,255,255,0.10)");
      g.addColorStop(1, "rgba(255,255,255,0.01)");
      ctx.beginPath();
      ctx.arc(C, C, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      drawGraticule();

      // continents + Morocco (clipped to sphere)
      ctx.save();
      ctx.beginPath();
      ctx.arc(C, C, R, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "rgba(255,255,255,0.55)";
      CONTINENTS.forEach((c) => drawPolygon(c.pts));

      // Morocco in red, with a soft breathing glow
      const pulse = 0.5 + 0.5 * Math.sin(time / 600);
      ctx.fillStyle = `rgba(239,68,68,${0.85 + 0.15 * pulse})`;
      ctx.strokeStyle = `rgba(252,165,165,${0.5 + 0.5 * pulse})`;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "rgba(239,68,68,0.9)";
      ctx.shadowBlur = 6 + 8 * pulse;
      drawPolygon(MOROCCO, true);
      ctx.shadowBlur = 0;

      ctx.restore();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // interaction
    const down = (e: PointerEvent) => {
      const s = state.current;
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.vx = 0;
      s.vy = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.lambda -= dx * 0.4;
      s.phi += dy * 0.4;
      s.vx = -dx * 0.4;
      s.vy = dy * 0.4;
    };
    const up = (e: PointerEvent) => {
      state.current.dragging = false;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [size]);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, cursor: "grab", touchAction: "none" }}
      />
      {showLabel && (
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-neutral-500">
          DRAG TO ROTATE · <span className="text-red-500">MOROCCO</span>
        </span>
      )}
    </div>
  );
}