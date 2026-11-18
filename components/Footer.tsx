"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/AmineCheffak" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amine-cheffak-59b661387/" },
];
const data = new Date().getFullYear()

export default function Footer() {
    
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 pb-8 pt-16 text-white md:px-12 lg:px-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Link columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#home"
              className="font-heading text-2xl font-bold tracking-tighter"
            >
              AMINE<span className="text-red-500">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-400">
              Full Stack Developer building reliable web applications, scalable
              backends, and clean user experiences.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-neutral-500">
              NAVIGATION
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-red-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-neutral-500">
              SOCIAL
            </h3>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-red-500"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-neutral-500">
              LOCATION
            </h3>
            <p className="mt-5 text-sm leading-7 text-neutral-400">
              Morocco
              <br />
              Available for remote work
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-xs tracking-widest text-neutral-600">
            © {data} AMINE CHEFFAK
          </span>

          <span className="font-mono text-xs tracking-widest text-neutral-600">
            BUILT WITH NEXT.JS · TAILWIND · FRAMER MOTION
          </span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-neutral-500 transition-colors hover:text-red-500"
          >
            BACK TO TOP
            <ArrowUp
              size={15}
              className="transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}