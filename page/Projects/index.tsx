import Project from "@/Ui/Project";

import { PROJECTS } from "@/Data/";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0B0D10] px-5 pb-28 pt-28 font-tech text-[#EDEEF0] sm:px-8 md:px-12 md:pt-32"
    >
      <style>{`
        @keyframes pr-rise { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform:none } }
        @keyframes pr-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
        .pr-rise { animation: pr-rise .8s cubic-bezier(.2,.8,.2,1) both }
        .pr-float { animation: pr-float 3s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .pr-rise, .pr-float { animation: none } }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <span className="pr-rise font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            04 — PROJETS
          </span>
          <h2 className="pr-rise font-cyber text-2xl font-bold sm:text-3xl" style={{ animationDelay: ".08s" }}>
            Ce que j&apos;ai construit.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Project key={p.num} {...p} delay={0.1 + i * 0.08} />
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;