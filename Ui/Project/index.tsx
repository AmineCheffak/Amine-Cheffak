"use client";

import { memo, useRef } from "react";

import type { ProjectItem } from "@/Data/";
import { gsap, useGSAP } from "@/lib/gsap";

interface ProjectProps extends ProjectItem {
  delay?: number;
}

const Project = ({
  num,
  title,
  desc,
  stack,
  href,
  delay = 0,
}: ProjectProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
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

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <a
      ref={cardRef}
      data-gsap-rise
      data-gsap-delay={delay}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex min-h-[340px] flex-col gap-5 rounded-2xl border border-line bg-dark p-7 transition-colors duration-300 hover:border-fluo"
    >
      {/* Glow Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-fluo/10 blur-[80px]" />
      </div>

      {/* Header */}
      <div
        className="relative z-10 flex items-start justify-between"
        style={{ transform: "translateZ(35px)" }}
      >
        <span className="font-cyber text-xs text-fluo">{num}</span>

        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-fluo transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M7 17 L17 7 M9 7 H17 V15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10"
        style={{ transform: "translateZ(25px)" }}
      >
        <h3 className="font-cyber text-xl font-bold leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-xl leading-relaxed text-grid">
          {desc}
        </p>
      </div>

      {/* Technologies */}
      <ul
        className="relative z-10 mt-auto flex flex-wrap gap-2 pt-2"
        aria-label="Technologies utilisées"
        style={{ transform: "translateZ(40px)" }}
      >
        {stack.map(({ name, icon: Icon, color }) => (
          <li
            key={name}
            title={name}
            className="group/tech flex h-10 w-10 items-center justify-center rounded-lg border border-line-2 bg-panel transition duration-200 hover:-translate-y-1 hover:border-fluo"
          >
            <Icon
              className="h-5 w-5 transition-transform duration-200 group-hover/tech:scale-125"
              style={{ color }}
              aria-hidden="true"
            />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-fluo transition-all duration-500 group-hover:w-full" />
    </a>
  );
};

export default memo(Project);
