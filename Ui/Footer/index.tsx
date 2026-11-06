"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Terminal,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub, SiGmail } from "react-icons/si";

import { gsap, useGSAP } from "@/lib/gsap";

interface FooterProps {
  onOpenTerminal: () => void;
}

const navigation = [
  { href: "#hero", label: "Accueil" },
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#service", label: "Services" },
];

const socials = [
  {
    href: "https://github.com/AmineCheffak",
    label: "GitHub",
    icon: SiGithub,
    external: true,
  },
  {
    href: "https://linkedin.com/in/amine-cheffak-59b661387",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    href: "mailto:a.cheffak6604@uca.ac.ma",
    label: "Gmail",
    icon: SiGmail,
    external: false,
  },
];

export default function Footer({ onOpenTerminal }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const elements = gsap.utils.toArray<HTMLElement>(
        "[data-footer-animate]",
        footer
      );
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(elements, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-10 border-t border-line bg-void/80 px-5 pb-8 pt-20 font-tech text-ink sm:px-8 md:px-12"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="pb-14">
          <span
            data-footer-animate
            className="font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs"
          >
            06 — CONTACT
          </span>
          <h2
            data-footer-animate
            className="mt-3 font-cyber text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Travaillons ensemble.
          </h2>
          <p
            data-footer-animate
            className="mt-4 max-w-xl text-lg leading-relaxed text-grid sm:text-xl"
          >
            Disponible pour un stage PFE. Parlons de votre prochain projet.
          </p>
          <div data-footer-animate className="mt-7 flex flex-wrap gap-3">
            <a
              href="mailto:a.cheffak6604@uca.ac.ma"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-fluo px-5 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo sm:px-7 sm:text-base"
            >
              M&apos;écrire
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="/CV_Amine_Cheffak.pdf"
              download="Amine_Cheffak_CV.pdf"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-2 bg-panel px-5 text-sm font-bold tracking-wide text-ink transition-all duration-300 hover:-translate-y-1 hover:border-fluo hover:bg-fluo hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo sm:px-7 sm:text-base"
            >
              Télécharger mon CV
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-t border-line py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <div data-footer-animate>
            <a
              href="#hero"
              className="font-cyber text-xl font-bold text-fluo focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo"
            >
              AmineCheffak<span className="text-ink">.</span>
            </a>
            <p className="mt-3 max-w-xs leading-relaxed text-grid">
              Étudiant en Développement Digital · Full Stack. Safi, Maroc.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page" data-footer-animate>
            <h3 className="font-cyber text-xs font-bold tracking-wider text-ink">
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col items-start gap-2">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="relative text-grid transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fluo after:transition-transform hover:text-fluo hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-animate>
            <h3 className="font-cyber text-xs font-bold tracking-wider text-ink">
              Restons connectés
            </h3>
            <div className="mt-4 flex items-center gap-2">
              {socials.map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-panel text-ink transition-colors hover:border-fluo hover:text-fluo focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenTerminal}
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-cyber text-[10px] tracking-wider text-grid transition-colors hover:text-fluo focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo"
            >
              <Terminal size={15} aria-hidden="true" />
              Ouvrir le terminal
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-5 text-sm text-grid sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Amine Cheffak. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:justify-end">
            <span>Fait avec Next.js, Tailwind &amp; GSAP</span>
            <button
              type="button"
              aria-label="Retour en haut"
              title="Retour en haut"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-2 bg-panel text-ink transition-colors hover:border-fluo hover:text-fluo focus-visible:outline focus-visible:outline-2 focus-visible:outline-fluo"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
