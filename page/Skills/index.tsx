import { SKILLS } from "@/Data/";

function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0B0D10] px-6 py-16 font-tech text-[#EDEEF0] md:px-12"
    >
      <style>{`
        @keyframes sk-rise { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform:none } }
        @keyframes sk-draw { 0% { stroke-dashoffset: 60 } 45%,80% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -60 } }
        @keyframes sk-pulse { 0%,100% { opacity:.55; transform: scale(1) } 50% { opacity:1; transform: scale(1.25) } }
        @keyframes sk-spin { to { transform: rotate(360deg) } }
        @keyframes sk-pop { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        .sk-rise { animation: sk-rise .8s cubic-bezier(.2,.8,.2,1) both }
        .sk-ln { fill:none; stroke-width:2.5; stroke-linecap:round; stroke-linejoin:round }
        .sk-draw { stroke-dasharray:60; animation: sk-draw 3s ease-in-out infinite }
        .sk-pulse, .sk-spin { transform-box: fill-box; transform-origin: center }
        .sk-pulse { animation: sk-pulse 2.4s ease-in-out infinite }
        .sk-spin { animation: sk-spin 14s linear infinite }
        .sk-chip:hover .sk-chip-icon { animation: sk-pop .6s ease-in-out infinite; transform: scale(1.2) rotate(-8deg) }
        @media (prefers-reduced-motion: reduce) { .sk-rise, .sk-draw, .sk-pulse, .sk-spin, .sk-chip:hover .sk-chip-icon { animation: none } }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="sk-rise font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            03 — COMPÉTENCES
          </span>
          <h2 className="sk-rise font-cyber text-3xl font-bold" style={{ animationDelay: ".08s" }}>
            Ma stack technique.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <div
              key={s.title}
              className="sk-rise flex flex-col gap-3 rounded-2xl border border-[#232830] bg-dark p-5 transition duration-300 hover:-translate-y-1.5 hover:border-fluo"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A3038] bg-[#1A1E25]">
                {s.icon}
              </div>
              <h3 className="font-cyber text-sm font-bold">{s.title}</h3>

              <div className="flex flex-wrap gap-2">
                {s.chips.map(({ name, icon: Icon, color }) => (
                  <span
                    key={name}
                    className="sk-chip inline-flex items-center gap-1.5 rounded-full border border-[#2C323A] px-2.5 py-0.5 text-sm font-semibold text-[#C9CDD3] transition-colors hover:border-fluo"
                  >
                    <Icon
                      className="sk-chip-icon h-4 w-4 shrink-0 transition-transform duration-200"
                      style={{ color }}
                      aria-hidden="true"
                    />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;