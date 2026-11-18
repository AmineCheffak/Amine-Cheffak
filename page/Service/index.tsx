"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";

import {
  SiNextdotjs,
  SiSpringboot,
  SiDocker,
  SiTailwindcss,
  SiMysql,
  SiGithub,
  SiSqlalchemy,
  SiMyob,
} from "react-icons/si";

type Service = {
  title: string;
  description: string;
  icon: IconType;
  tags: string[];
};

const services: Service[] = [
  {
    title: "Web Application Development",
    description:
      "Modern and scalable web applications built from idea to production, with responsive interfaces and maintainable architecture.",
    icon: SiNextdotjs,
    tags: ["REACT", "NEXT.JS", "TYPESCRIPT"],
  },
  {
    title: "Backend & API Development",
    description:
      "Robust backend systems, REST APIs, authentication, and business logic designed for reliable applications.",
    icon: SiSpringboot,
    tags: ["SPRING BOOT", "REST API", "AUTH"],
  },
  {
    title: "Cloud & Deployment",
    description:
      "Application deployment, containerization, and infrastructure configuration for reliable production environments.",
    icon: SiDocker,
    tags: ["AWS", "DOCKER", "DEPLOYMENT"],
  },
  {
    title: "UI Implementation",
    description:
      "Clean, responsive, and interactive interfaces with smooth animations and consistent user experiences.",
    icon: SiTailwindcss,
    tags: ["TAILWIND CSS", "FRAMER MOTION", "RESPONSIVE"],
  },
  {
    title: "Database Design",
    description:
      "Structured relational databases, optimized queries, and efficient data management for scalable applications.",
    icon: SiMysql,
    tags: ["MYSQL", "SQL", "DATABASE DESIGN"],
  },
  {
    title: "Maintenance & Optimization",
    description:
      "Code refactoring, debugging, performance improvements, and continuous maintenance of existing applications.",
    icon: SiGithub,
    tags: ["GIT", "DEBUGGING", "OPTIMIZATION"],
  },
];

// Cursor spotlight
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  e.currentTarget.style.setProperty(
    "--mx",
    `${e.clientX - rect.left}px`
  );

  e.currentTarget.style.setProperty(
    "--my",
    `${e.clientY - rect.top}px`
  );
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black px-6 py-28 text-white md:px-12 lg:px-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">
              02 / SERVICES
            </span>

            <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What I can{" "}
              <span className="text-red-500">do for you</span>.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-neutral-400">
            From the first idea to a live product: design, build,
            deploy, and maintain.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (index % 3) * 0.1,
                }}
                whileHover="hover"
                onMouseMove={handleMouseMove}
                className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-red-500/30"
              >
                {/* Spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.18), transparent 70%)",
                  }}
                />

                {/* Border Glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    padding: 1,
                    background:
                      "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.9), transparent 70%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    mask:
                      "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
                  }}
                />

                {/* Number + Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500">
                    {number}
                  </span>

                  <motion.span
                    variants={{
                      hover: {
                        rotate: [0, -12, 12, -8, 0],
                        scale: 1.12,
                        transition: { duration: 0.6 },
                      },
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:border-red-500/50 group-hover:text-red-500"
                  >
                    <Icon size={23} />
                  </motion.span>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-10">
                  <h3 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-400">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-neutral-400 transition-colors group-hover:border-red-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:flex-row sm:items-center"
        >
          <p className="font-heading text-xl tracking-tight md:text-2xl">
            Have a project in mind?{" "}
            <span className="text-neutral-500">
              Let&apos;s talk about it.
            </span>
          </p>

          <a
            href="#contact"
            className="group/cta flex shrink-0 items-center gap-3 rounded-full bg-red-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_-6px_rgba(220,38,38,0.6)] transition-all hover:bg-red-500"
          >
            Get in touch

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover/cta:-translate-y-1 group-hover/cta:translate-x-1"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}