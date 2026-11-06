"use client";

import { useRef } from "react";

import { SERVICES } from "@/Data/";
import Service from "@/Ui/Service";
import { gsap, useGSAP } from "@/lib/gsap";

function Services() {
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
    <div ref={containerRef} className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-16 font-tech text-ink md:px-12">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span data-gsap-rise className="font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            05 — SERVICES
          </span>
          <h2
            data-gsap-rise
            data-gsap-delay=".08"
            className="font-cyber text-3xl font-bold"
          >
            Ce que je peux faire pour vous.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Service key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;