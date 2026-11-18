"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Server,
  LayoutDashboard,
  Cloud,
  Code2,
  HardDrive,
  Database,
  Zap,
  ShieldCheck,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import {
  SiSpringboot,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";
import Globe from "@/components/Globe";

type Skill = {
  name: string;
  icon: ReactNode;
};

type Card = {
  title: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  tags?: Skill[];
  globe?: boolean;
  avatar?: boolean;
  className?: string;
};

const cards: Card[] = [
  {
    label: "WHO I AM",
    title: "Amine Cheffak",
    icon: Code2,
    description:
      "Full Stack Developer who enjoys turning ideas into reliable, well-structured web applications. I care about clean code, solid backend architecture, and interfaces that feel simple to use.",
    avatar: true,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    label: "LOCATION",
    title: "Morocco",
    icon: MapPin,
    description: "Drag the globe to explore. Open to remote and on-site work.",
    globe: true,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    label: "EDUCATION",
    title: "ISTA NTIC",
    icon: GraduationCap,
    description: "Web & software development training.",
  },
  {
    label: "BACKEND",
    title: "APIs & Data",
    icon: Server,
    tags: [
      { name: "Spring Boot", icon: <SiSpringboot size={14} /> },
      { name: "MySQL", icon: <SiMysql size={14} /> },
      { name: "Mongodb", icon: <SiMongodb size={14} /> },
      { name: "REST", icon: <Webhook size={14} /> },
    ],
  },
  {
    label: "FRONTEND",
    title: "Modern UI",
    icon: LayoutDashboard,
    tags: [
      { name: "React", icon: <SiReact size={14} /> },
      { name: "Next.js", icon: <SiNextdotjs size={14} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={14} /> },
    ],
  },
  {
    label: "CLOUD",
    title: "AWS",
    icon: Cloud,
    tags: [
      { name: "EC2", icon: <Server size={14} /> },
      { name: "S3", icon: <HardDrive size={14} /> },
      { name: "RDS", icon: <Database size={14} /> },
      { name: "Lambda", icon: <Zap size={14} /> },
      { name: "IAM", icon: <ShieldCheck size={14} /> },
    ],
  },
];

// Updates the cursor position (relative to the card) as CSS variables
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

/**
 * Circular photo that turns and leans toward the cursor while the mouse
 * is over its card, then eases back to the center when the mouse leaves.
 * Put your photo in /public/amine.jpg (or change AVATAR_SRC).
 */
const AVATAR_SRC = "/image.jpeg";

function Avatar({ size = 150 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // pointer position relative to the avatar center, normalized to -1..1
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 160, damping: 16, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 160, damping: 16, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-9, 9]);
  const rotateX = useTransform(sy, [-1, 1], [9, -9]);
  const shiftX = useTransform(sx, [-1, 1], [-10, 10]);
  const shiftY = useTransform(sy, [-1, 1], [-10, 10]);
  // photo inside moves a bit more than the frame -> depth effect
  const imgX = useTransform(sx, [-1, 1], [-8, 8]);
  const imgY = useTransform(sy, [-1, 1], [-8, 8]);

  useEffect(() => {
    const el = ref.current;
    const card = el?.closest<HTMLElement>("[data-card]");
    if (!el || !card) return;

    const onMove = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      nx.set(clamp((e.clientX - cx) / 220));
      ny.set(clamp((e.clientY - cy) / 220));
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [nx, ny]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: size, height: size, perspective: 700 }}
    >
      {/* glow behind the photo */}
      <div className="absolute inset-0 rounded-full bg-red-600/30 blur-2xl" />

      <motion.div
        style={{
          rotateX,
          rotateY,
          x: shiftX,
          y: shiftY,
          clipPath: "circle(50%)",
        }}
        className="relative h-full w-full overflow-hidden rounded-full border-2 border-red-500/70 bg-neutral-900 shadow-[0_0_40px_-8px_rgba(239,68,68,0.7)]"
      >
        {failed ? (
          <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-semibold text-red-500">
            AC
          </div>
        ) : (
          <motion.img
            src={AVATAR_SRC}
            alt="Amine Cheffak"
            draggable={false}
            onError={() => setFailed(true)}
            style={{ x: imgX, y: imgY, scale: 1.3 }}
            className="h-full w-full select-none object-cover object-[50%_15%]"
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Skill pill with an icon. On hover the pill lifts with a little spring
 * and the icon wiggles, grows and turns red.
 */
function SkillPill({ skill }: { skill: Skill }) {
  return (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -4 } }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="group/pill flex cursor-default items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-red-500/60 hover:text-white"
    >
      <motion.span
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: {
            rotate: [0, -14, 14, -10, 0],
            scale: 1.25,
            transition: { duration: 0.6 },
          },
        }}
        className="flex text-neutral-500 transition-colors group-hover/pill:text-red-500"
      >
        {skill.icon}
      </motion.span>
      {skill.name}
    </motion.span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-28 text-white md:px-12 lg:px-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[140px]" />

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
              01 / ABOUT
            </span>
            <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A bit about <span className="text-red-500">me</span>.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-xs tracking-widest text-neutral-400">
              CURRENTLY BUILDING
            </span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[minmax(180px,auto)]">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                data-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onMouseMove={handleMouseMove}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 ${
                  card.className ?? ""
                }`}
              >
                {/* Spotlight: red glow that follows the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.18), transparent 70%)",
                  }}
                />

                {/* Border glow: red border revealed only around the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    padding: 1,
                    background:
                      "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.9), transparent 70%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500">
                    {card.label}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400">
                    <Icon size={18} />
                  </span>
                </div>

                {/* Avatar (Who I am card) */}
                {card.avatar && (
                  <div className="relative z-10 my-6 flex justify-center">
                    <Avatar size={240} />
                  </div>
                )}

                {/* Globe (Location card) */}
                {card.globe && (
                  <div className="relative z-10 my-4 flex justify-center">
                    <Globe size={260} showLabel={false} />
                  </div>
                )}

                <div
                  className={`relative z-10 ${
                    card.globe || card.avatar ? "mt-2" : "mt-10"
                  }`}
                >
                  <h3
                    className={`font-heading font-medium tracking-tight ${
                      card.className?.includes("row-span-2")
                        ? "text-3xl md:text-4xl"
                        : "text-xl"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {card.description && (
                    <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
                      {card.description}
                    </p>
                  )}

                  {card.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <SkillPill key={tag.name} skill={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}