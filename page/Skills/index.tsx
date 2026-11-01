"use client";

import { useRef } from "react";
import { SKILLS } from "@/Data/";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function SkillCard({
  s,
  i,
}: {
  s: (typeof SKILLS)[number];
  i: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    { stiffness: 180, damping: 18 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    { stiffness: 180, damping: 18 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + i * 0.08,
        ease: "easeOut",
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#232830] bg-dark p-5 transition-colors duration-300 hover:border-fluo"
    >
      <style>{`
        @keyframes sk-pop {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.2) rotate(-8deg);
          }
        }

        .sk-chip:hover .sk-chip-icon {
          animation: sk-pop .6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-chip-icon {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fluo/10 blur-[70px]" />
      </div>

      {/* Icon */}
      <div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A3038] bg-[#1A1E25] transition-colors duration-300 group-hover:border-fluo"
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
            className="sk-chip inline-flex items-center gap-1.5 rounded-full border border-[#2C323A] px-2.5 py-0.5 text-sm font-semibold text-[#C9CDD3] transition-colors hover:border-fluo"
          >
            <Icon
              className="sk-chip-icon h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ color }}
              aria-hidden="true"
            />
            {name}
          </span>
        ))}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-fluo transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0B0D10] px-6 py-16 font-tech text-[#EDEEF0] md:px-12"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sk-chip-icon {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
