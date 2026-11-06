"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface IntroProps {
  /** Kaytnada mli l overlay kaybda yt-rfa3: hna kay-tlq l animations dyal l page. */
  onReveal: () => void;
  /** Kaytnada mli l overlay yfta: Pages kaymsa7ou. */
  onDone: () => void;
}

const NAME = Array.from("AmineCheffak");

export default function Intro({ onReveal, onDone }: IntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Mnaa3 scroll mn dwra l intro
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const counter = counterRef.current;
      const bar = barRef.current;
      if (!root || !counter || !bar) return;

      const mm = gsap.matchMedia();

      // Reduced motion: bla intro
      mm.add("(prefers-reduced-motion: reduce)", () => {
        onReveal();
        onDone();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const progress = { value: 0 };

        const tl = gsap.timeline({ onComplete: onDone });

        // 1) L7rouf dyal smiya kaytl3o mn t7t
        tl.from(".intro-char", {
          yPercent: 115,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.04,
        })
          // 2) Counter 000 → 100 + progress bar
          .to(
            progress,
            {
              value: 100,
              duration: 1.5,
              ease: "power2.inOut",
              onUpdate: () => {
                counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
              },
            },
            0.2
          )
          .to(
            bar,
            { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
            0.2
          )
          // 3) Contenu kayktfi
          .to(".intro-content", {
            autoAlpha: 0,
            y: -16,
            duration: 0.35,
            ease: "power2.in",
          }, ">0.2")
          // 4) L page kat-bda tban w overlay kayt-rfa3
          .call(onReveal, undefined, ">-0.1")
          .to(root, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
          }, "<");
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Chargement du portfolio"
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-void px-5 py-6 font-tech text-ink sm:px-8 md:px-12 md:py-10"
    >
      {/* Haut */}
      <div className="intro-content flex items-center justify-between font-cyber text-[10px] tracking-[0.14em] text-grid md:text-xs">
        <span>PORTFOLIO</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      {/* Centre : smiya */}
      <div className="intro-content flex flex-col items-center gap-4">
        <h1
          aria-hidden="true"
          className="flex font-cyber text-[clamp(2rem,8vw,6rem)] font-black leading-none tracking-tight"
        >
          {NAME.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <span className="intro-char inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
          <span className="inline-block overflow-hidden py-1">
            <span className="intro-char inline-block text-fluo will-change-transform">.</span>
          </span>
        </h1>
        <p className="font-cyber text-[10px] tracking-[0.2em] text-grid md:text-xs">
          FULL STACK DEVELOPER
        </p>
      </div>

      {/* Ta7t : counter + bar */}
      <div className="intro-content flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <span className="font-cyber text-[10px] tracking-[0.14em] text-grid md:text-xs">
            CHARGEMENT
          </span>
          <span
            ref={counterRef}
            className="font-cyber text-4xl font-bold tabular-nums text-fluo md:text-6xl"
          >
            000
          </span>
        </div>
        <div className="h-px w-full bg-line-2">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-fluo"
          />
        </div>
      </div>
    </div>
  );
}