"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import type { ProjectItem } from "@/Data/";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex min-h-[340px] flex-col gap-5 rounded-2xl border border-[#232830] bg-dark p-7 transition-colors duration-300 hover:border-fluo"
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
            className="group/tech flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A3038] bg-[#1A1E25] transition duration-200 hover:-translate-y-1 hover:border-fluo"
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
    </motion.a>
  );
};

export default Project;
