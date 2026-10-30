import LanyardView from "@/Ui/LanyardView";

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0B0D10] px-5 pb-28 pt-28 font-tech text-[#EDEEF0] sm:px-8 md:px-12 md:pt-32"
    >
      {/* Animation d'apparition du contenu */}
      <style>{`
        @keyframes rise { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform:none } }
        .rise { animation: rise .8s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .rise { animation: none } }
      `}</style>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:gap-10 lg:gap-16">
        {/* Texte */}
        <div className="flex w-full max-w-xl flex-1 flex-col gap-5 text-center md:gap-6 md:text-left">
          <span className="rise font-cyber text-[11px] tracking-[0.14em] text-fluo sm:text-xs md:text-sm">
            DÉVELOPPEUR FULL STACK JUNIOR · STAGE PFE
          </span>

          <h1
            className="rise font-cyber text-3xl font-black leading-tight sm:text-4xl md:text-5xl"
            style={{ animationDelay: ".08s" }}
          >
            Je construis des apps full stack.
          </h1>

          <p
            className="rise text-lg leading-snug text-grid md:text-2xl"
            style={{ animationDelay: ".16s" }}
          >
            Étudiant en Développement Digital à l'ISTA NTIC Safi. Spring Boot,
            React.js et MySQL au quotidien, avec une curiosité pour l'IA
            générative en local (Ollama).
          </p>

        </div>

        {/* Carte professionnelle 3D interactive */}
        <div
          className="rise w-full max-w-[420px] shrink-0 md:w-[48%] md:max-w-none"
          style={{ animationDelay: ".16s" }}
        >
          <LanyardView />
        </div>
      </div>
    </section>
  );
}

export default Hero;