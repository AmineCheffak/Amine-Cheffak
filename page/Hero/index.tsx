import Globe from "@/Ui/Globe/index";
// import LanyardView from "@/Components/LanyardView";
import { FaJava, FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import {
  SiDocker,
  SiGithub,
  SiMysql,
  SiReact,
  SiSpringboot,
} from "react-icons/si";

interface HeroProps {
  /** Navigation entre les pages (1 = Hero, 2 = About, 3 = Skills, 4 = Projects, 5 = Service) */
  goTo?: (page: number) => void;
}

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/AmineCheffak",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/amine-cheffak-59b661387",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:a.cheffak6604@uca.ac.ma",
    icon: FiMail,
  },
];

const TECH = [
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "MySQL", icon: SiMysql, color: "#4DA3D9" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

function Hero({ goTo }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0B0D10] px-4 pb-24 pt-24 font-tech text-[#EDEEF0] sm:px-8 sm:pt-28 md:px-12 md:pt-32"
    >
      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }

        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .rise {
          animation: rise .8s cubic-bezier(.2,.8,.2,1) both;
        }

        .hero-float {
          animation: hero-float 4s ease-in-out infinite;
        }

        .hero-float-2 {
          animation: hero-float 5s ease-in-out infinite;
          animation-delay: -2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .rise, .hero-float, .hero-float-2 {
            animation: none;
          }
        }
      `}</style>

      {/* Grille de points en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:gap-8 md:flex-row md:gap-10 lg:gap-16">

        {/* Globe : premier sur mobile */}
        <div
          className="rise relative z-10 order-1 flex w-full flex-1 items-center justify-center md:order-2 md:min-w-[45%]"
          style={{ animationDelay: ".16s" }}
        >
          <div className="relative w-[min(108vw,460px)] max-w-none sm:w-[440px] md:w-[360px] lg:w-[440px] xl:w-[480px]">
            <Globe />

            {/* Cartes flottantes autour de la Terre */}
            <div className="hero-float pointer-events-none absolute -left-4 top-[14%] hidden items-center gap-2 rounded-xl border border-[#232830] bg-dark/90 px-3 py-2 backdrop-blur md:flex">
              <SiSpringboot
                className="h-4 w-4 text-[#6DB33F]"
                aria-hidden="true"
              />
              <span className="font-cyber text-[10px] tracking-wider">
                SPRING BOOT
              </span>
            </div>

            <div className="hero-float-2 pointer-events-none absolute -right-4 top-[42%] hidden items-center gap-2 rounded-xl border border-[#232830] bg-dark/90 px-3 py-2 backdrop-blur md:flex">
              <SiReact
                className="h-4 w-4 text-[#61DAFB]"
                aria-hidden="true"
              />
              <span className="font-cyber text-[10px] tracking-wider">
                REACT.JS
              </span>
            </div>

            <div className="hero-float pointer-events-none absolute -bottom-2 left-[8%] hidden items-center gap-2 rounded-xl border border-[#232830] bg-dark/90 px-3 py-2 backdrop-blur md:flex">
              <SiDocker
                className="h-4 w-4 text-[#2496ED]"
                aria-hidden="true"
              />
              <span className="font-cyber text-[10px] tracking-wider">
                DOCKER
              </span>
            </div>
          </div>
        </div>

        {/* Texte */}
        <div className="order-2 flex w-full max-w-xl flex-1 flex-col items-center gap-4 text-center sm:gap-5 md:order-1 md:items-start md:gap-6 md:text-left">

          {/* Badge de disponibilité */}
          <span className="rise inline-flex items-center gap-2 rounded-full border border-[#2C323A] bg-dark/80 px-3 py-1.5 font-cyber text-[9px] tracking-[0.12em] text-[#C9CDD3] sm:px-4 sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-fluo/70" />
              <span className="relative h-2 w-2 rounded-full bg-fluo" />
            </span>
            DISPONIBLE POUR UN STAGE PFE
          </span>

          <h1
            className="rise font-cyber text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ animationDelay: ".08s" }}
          >
            Je construis des apps{" "}
            <span className="text-fluo">full stack.</span>
          </h1>

          <p
            className="rise max-w-lg text-sm leading-relaxed text-grid sm:text-base md:text-lg lg:text-xl"
            style={{ animationDelay: ".16s" }}
          >
            Étudiant en Développement Digital à l&apos;ISTA NTIC Safi.
            Spring Boot, React.js et MySQL au quotidien, avec une
            curiosité pour l&apos;IA générative en local (Ollama).
          </p>

          {/* Boutons */}
          <div
            className="rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
            style={{ animationDelay: ".24s" }}
          >
            <button
              type="button"
              onClick={() => goTo?.(4)}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-fluo px-5 text-sm font-bold tracking-wide text-[#0B0D10] transition hover:-translate-y-0.5 hover:brightness-110 sm:px-7 sm:text-base"
            >
              Voir mes projets
              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <a
              href="/CV_Amine_Cheffak.pdf"
              download="Amine_Cheffak_CV.pdf"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#2C323A] px-5 text-sm font-bold tracking-wide transition hover:-translate-y-0.5 hover:border-fluo sm:px-7 sm:text-base"
            >
              <FiDownload
                className="transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              Télécharger mon CV
            </a>
          </div>

          {/* Réseaux + stack */}
          <div
            className="rise flex flex-col items-center gap-4 pt-1 sm:flex-row sm:gap-6 md:items-center"
            style={{ animationDelay: ".32s" }}
          >
            <ul className="flex items-center gap-2" aria-label="Mes liens">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2C323A] bg-dark text-[#EDEEF0] transition hover:-translate-y-0.5 hover:border-fluo hover:text-fluo sm:h-11 sm:w-11"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              className="hidden h-8 w-px bg-[#232830] sm:block"
            />

            <ul
              className="flex items-center gap-4"
              aria-label="Technologies principales"
            >
              {TECH.map(({ name, icon: Icon, color }) => (
                <li
                  key={name}
                  title={name}
                  className="transition-transform hover:-translate-y-0.5"
                >
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pour la carte 3D à la place de la Terre :
      <div className="relative z-10 h-[480px] w-full md:h-[min(80vh,750px)]">
        <LanyardView />
      </div>
      */}
    </section>
  );
}

export default Hero;