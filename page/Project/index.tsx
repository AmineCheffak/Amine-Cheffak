"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ProjectCard, { type Project } from "@/components/ProjectCard";

/**
 * PLACEHOLDER projects: replace titles, descriptions, tags and links with your
 * own. Add a screenshot with `image: "/projects/name.png"` (file in
 * /public/projects). Without `image`, the card shows its number.
 */
const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Online store with product catalog, cart, and order management. REST API on the backend with a fast React storefront.",
    tags: ["SPRING BOOT", "REACT", "MYSQL"],
    live: "http://muscle-expected-intellectual-apartments.trycloudflare.com/",
    repo: "#",
    image: "/project1.png",
  },
  {
    title: "Personal Portfolio",
    description:
      "This website: an interactive portfolio with a 3D globe, animated sections, and a dark red design system.",
    tags: ["NEXT.JS", "FRAMER MOTION", "TAILWIND"],
    live: "#",
    image:"/project2.png",
    repo: "#",
  },
];

export default function Projects() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the track must travel horizontally = track width - viewport width
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () =>
      setDistance(Math.max(0, track.offsetWidth - window.innerWidth));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Vertical scroll through the area -> horizontal movement
  const { scrollYProgress } = useScroll({
    target: scrollAreaRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="projects" className="relative bg-black text-white">
      {/* Title (normal flow, scrolls away before the horizontal part starts) */}
      <div className="px-6 pb-12 pt-28 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 border-b border-white/10 pb-8"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">
              02 / PROJECTS
            </span>
            <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Selected <span className="text-red-500">work</span>.
            </h2>
          </div>

          <span className="hidden font-mono text-xs tracking-widest text-neutral-500 sm:block">
            SCROLL DOWN →
          </span>
        </motion.div>
      </div>

      {/* Tall area: its height = the vertical scroll needed for the horizontal move */}
      <div
        ref={scrollAreaRef}
        style={{ height: `calc(100vh + ${distance}px)` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-x-clip pt-20">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[140px]" />

          {/* Horizontal track: cards are 90vw wide, centered with 5vw sides */}
          <motion.div
            ref={trackRef}
            style={{ x, paddingLeft: "5vw", paddingRight: "5vw" }}
            className="relative z-10 flex w-max gap-[4vw]"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}