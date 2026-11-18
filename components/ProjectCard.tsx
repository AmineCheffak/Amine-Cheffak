"use client";

import { useState, type MouseEvent } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  /** Optional screenshot, e.g. "/projects/shop.png" (file in /public/projects) */
  image?: string;
  /** Live demo URL */
  live?: string;
  /** Source code URL */
  repo?: string;
};

type Props = {
  project: Project;
  index: number;
};

// Updates the cursor position (relative to the card) as CSS variables
const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export default function ProjectCard({ project, index }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const number = String(index + 1).padStart(2, "0");
  const showImage = project.image && !imageFailed;

  return (
    <article
      onMouseMove={handleMouseMove}
      // 90% of the page width, almost the full screen height (minus the header)
      className="group relative flex h-[calc(100vh-8rem)] w-[90vw] shrink-0 flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:flex-row md:gap-10 md:p-8"
    >
      {/* Spotlight: red glow that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.16), transparent 70%)",
        }}
      />

      {/* Border glow: red border revealed only around the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.9), transparent 70%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />

      {/* Preview */}
      <div className="relative z-10 h-[45%] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-red-600/20 via-neutral-900 to-black md:h-full md:w-[58%]">
        {showImage ? (
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            onError={() => setImageFailed(true)}
            className="h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-[10rem] font-semibold leading-none text-white/10 transition-colors duration-300 group-hover:text-red-500/30 md:text-[18rem]">
              {number}
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-neutral-300 backdrop-blur">
          PROJECT {number}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col md:py-4 md:pr-4">
        <h3 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-neutral-400 md:mt-6 md:text-lg md:leading-8">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 md:mt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[10px] tracking-widest text-neutral-400 md:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-6 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-base text-white transition-colors hover:text-red-500"
            >
              Live demo
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-neutral-400 transition-colors hover:text-red-500"
            >
              <Code2 size={18} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}