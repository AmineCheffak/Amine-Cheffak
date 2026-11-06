"use client";

import { useRef } from "react";
import { SKILLS } from "@/Data/";
import { gsap, useGSAP } from "@/lib/gsap";

function SkillCard({ s }: { s: (typeof SKILLS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateXRef = useRef<((value: number) => void) | null>(null);
  const rotateYRef = useRef<((value: number) => void) | null>(null);

  const { contextSafe } = useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, {
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });

    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        rotateXRef.current = gsap.quickTo(card, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        rotateYRef.current = gsap.quickTo(card, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        return () => {
          rotateXRef.current = null;
          rotateYRef.current = null;
        };
      }
    );

    return () => media.revert();
  }, { scope: cardRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateXRef.current?.(-y * 20);
    rotateYRef.current?.(x * 20);
  });

  const handleMouseLeave = contextSafe(() => {
    rotateXRef.current?.(0);
    rotateYRef.current?.(0);
  });

  return (
    <div
      ref={cardRef}
      data-skill-card
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-dark p-5 transition-colors duration-300 hover:border-fluo hover:will-change-transform"
    >
      {/* Glow + accent (overflow-hidden ici, pas sur la carte, pour garder le 3D) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fluo/10 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-fluo transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Icon */}
      <div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-line-2 bg-panel transition-colors duration-300 group-hover:border-fluo"
        style={{ transform: "translateZ(35px)" }}
      >
        {s.icon}
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-cyber text-sm font-bold transition-colors duration-300 group-hover:text-fluo"
        style={{ transform: "translateZ(25px)" }}
      >
        {s.title}
      </h3>

      {/* Skills */}
      <div
        className="relative z-10 flex flex-wrap gap-2"
        style={{ transform: "translateZ(40px)" }}
      >
        {s.chips.map(({ name, icon: Icon, color }) => (
          <span
            key={name}
            className="sk-chip inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-panel px-2.5 py-0.5 text-sm font-semibold text-soft transition-colors hover:border-fluo"
          >
            <Icon
              className="sk-chip-icon h-4 w-4 shrink-0"
              style={{ color }}
              aria-hidden="true"
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-skill-card]", grid);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { autoAlpha: 1, y: 0 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        immediateRender: true,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => media.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-16 font-tech text-ink md:px-12">

      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8"
        style={{ perspective: "1200px" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            03 — COMPÉTENCES
          </span>

          <h2 className="font-cyber text-3xl font-bold">
            Ma stack technique.
          </h2>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => (
            <SkillCard key={s.title} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;