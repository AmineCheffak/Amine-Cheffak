import { SERVICES } from "@/Data/";
import Service from "@/Ui/Service";

function Services() {
  return (
    <section
      id="services"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0B0D10] px-6 py-16 font-tech text-[#EDEEF0] md:px-12"
    >
      <style>{`
        @keyframes sv-rise { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform:none } }
        @keyframes sv-draw { 0% { stroke-dashoffset: 60 } 45%,80% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -60 } }
        @keyframes sv-pulse { 0%,100% { opacity:.55; transform: scale(1) } 50% { opacity:1; transform: scale(1.25) } }
        @keyframes sv-spin { to { transform: rotate(360deg) } }
        @keyframes sv-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        @keyframes sv-flow { to { stroke-dashoffset: -28 } }
        .sv-rise { animation: sv-rise .8s cubic-bezier(.2,.8,.2,1) both }
        .sv-ln { fill:none; stroke-width:2.5; stroke-linecap:round; stroke-linejoin:round }
        .sv-draw { stroke-dasharray:60; animation: sv-draw 3s ease-in-out infinite }
        .sv-flow { stroke-dasharray:3 4; animation: sv-flow 1.2s linear infinite }
        .sv-float { animation: sv-float 3s ease-in-out infinite }
        .sv-pulse, .sv-spin { transform-box: fill-box; transform-origin: center }
        .sv-pulse { animation: sv-pulse 2.4s ease-in-out infinite }
        .sv-spin { animation: sv-spin 12s linear infinite }
        @media (prefers-reduced-motion: reduce) { .sv-rise, .sv-draw, .sv-flow, .sv-float, .sv-pulse, .sv-spin { animation: none } }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="sv-rise font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
            05 — SERVICES
          </span>
          <h2 className="sv-rise font-cyber text-3xl font-bold" style={{ animationDelay: ".08s" }}>
            Ce que je peux faire pour vous.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Service key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;