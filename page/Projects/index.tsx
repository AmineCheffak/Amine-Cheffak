"use client";

import { useRef } from "react";

import Project from "@/Ui/Project";
import { PROJECTS } from "@/Data/";
import { gsap, useGSAP } from "@/lib/gsap";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray<HTMLElement>(
      "[data-gsap-rise]",
      container
    );
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(elements, { autoAlpha: 1, y: 0 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
      });
      elements.forEach((element) => {
        timeline.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          },
          Number(element.dataset.gsapDelay ?? 0)
        );
      });
    });

    return () => media.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative flex min-h-screen w-full items-center overflow-hidden px-5 pb-28 pt-28 font-tech text-ink sm:px-8 md:px-12 md:pt-32">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <span data-gsap-rise className="font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            04 — PROJETS
          </span>
          <h2
            data-gsap-rise
            data-gsap-delay=".08"
            className="font-cyber text-2xl font-bold sm:text-3xl"
          >
            Ce que j&apos;ai construit.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Project key={p.num} {...p} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;