"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Cloud,
  Server,
  HardDrive,
  Database,
  Zap,
  ShieldCheck,
  Globe as GlobeIcon,
} from "lucide-react";
import Globe from "@/components/Globe";
import { SiSpringboot, SiReact, SiNextdotjs, SiMysql } from "react-icons/si";

const technologies = [
  { name: "Spring Boot", icon: <SiSpringboot size={16} /> },
  { name: "React", icon: <SiReact size={16} /> },
  { name: "Next.js", icon: <SiNextdotjs size={16} /> },
  { name: "MySQL", icon: <SiMysql size={16} /> },
];

const awsSkills = [
  { name: "EC2", icon: <Server size={14} /> },
  { name: "S3", icon: <HardDrive size={14} /> },
  { name: "RDS", icon: <Database size={14} /> },
  { name: "Lambda", icon: <Zap size={14} /> },
  { name: "IAM", icon: <ShieldCheck size={14} /> },
  { name: "CloudFront", icon: <GlobeIcon size={14} /> },
];

export default function Home() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-28 text-white md:px-12 lg:px-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center justify-between border-b border-white/10 pb-5"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">
            PORTFOLIO / 2026
          </span>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-mono text-xs tracking-widest text-neutral-400">
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6 text-sm text-neutral-400"
            >
              Hello, I&apos;m <span className="text-white">Amine Cheffak</span> —
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="font-heading text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
            >
              I build
              <br />
              <span className="text-red-500">digital</span> products
              <br />
              that make sense.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 max-w-lg text-sm leading-7 text-neutral-400 md:text-base"
            >
              Full Stack Developer focused on building reliable web
              applications, scalable backend systems, and clean user
              experiences. Turning ideas into practical digital solutions.
            </motion.p>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-neutral-400 transition-colors hover:border-red-500/50 hover:text-white"
                >
                  <span className="transition-colors group-hover:text-red-500">
                    {tech.icon}
                  </span>
                  {tech.name}
                </span>
              ))}
            </motion.div>

            {/* AWS skills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              className="mt-6"
            >
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neutral-500">
                <Cloud size={13} className="text-red-500" />
                AWS CLOUD
              </div>
              <div className="flex flex-wrap gap-2">
                {awsSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="group flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.04] px-3.5 py-1.5 text-xs text-neutral-300 transition-colors hover:border-red-500/60 hover:text-white"
                  >
                    <span className="text-red-500">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="group flex items-center gap-3 rounded-full bg-red-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_-6px_rgba(220,38,38,0.6)] transition-all hover:bg-red-500"
              >
                Explore projects
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm text-white transition-colors hover:border-red-500 hover:text-red-500"
              >
                Contact me
              </Link>
            </motion.div>
          </div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center pb-8"
          >
            <Globe size={400} />
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 flex items-center justify-between border-t border-white/10 pt-6"
        >
          <span className="font-mono text-xs tracking-widest text-neutral-600">
            © 2026 AMINE CHEFFAK
          </span>

          <Link
            href="#about"
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-neutral-500 transition-colors hover:text-red-500"
          >
            SCROLL TO EXPLORE
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}