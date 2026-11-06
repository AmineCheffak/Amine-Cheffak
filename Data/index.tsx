
import { FaJava, FaDatabase, FaPython } from "react-icons/fa";
import { TbApi, TbBinaryTree } from "react-icons/tb";
import {
  SiSpringboot,
  SiSpring,
  SiHibernate,
  SiSpringsecurity,
  SiJsonwebtokens,
  SiPhp,
  SiPython,
  SiNestjs,
  SiExpress,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiShadcnui,
  SiMui,
  SiMysql,
  SiMariadb,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiJira,
  SiOllama,
} from "react-icons/si";

export const INFOS = [
  {
    label: "FORMATION",
    title: "ISTA NTIC Safi",
    text: "Développement Digital, option Full Stack · 2025 – 2027",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <g className="about-float">
          <path className="about-ln stroke-fluo" d="M24 9 L43 18 L24 27 L5 18 Z" />
          <path className="about-ln stroke-ink" d="M13 22 V31 C13 34 18 37 24 37 C30 37 35 34 35 31 V22" />
        </g>
        <path className="about-ln stroke-fluo about-draw" pathLength="60" d="M43 18 V30" />
      </svg>
    ),
  },
  {
    label: "LOCALISATION",
    title: "Safi, Maroc",
    text: "Disponible pour un stage PFE.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="about-ln stroke-ink" d="M24 43 C24 43 11 30 11 20 A13 13 0 0 1 37 20 C37 30 24 43 24 43 Z" />
        <circle className="about-pulse fill-fluo" cx="24" cy="20" r="5" />
        <ellipse className="about-ping stroke-fluo" cx="24" cy="43" rx="10" ry="3" fill="none" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "LANGUES",
    title: "Arabe · Français",
    text: "Arabe : bon niveau. Français : niveau intermédiaire.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="about-ln stroke-fluo about-draw" pathLength="60" d="M6 9 H30 V25 H17 L10 31 V25 H6 Z" />
        <path className="about-ln stroke-ink about-draw" pathLength="60" style={{ animationDelay: ".6s" }} d="M22 29 V35 H32 L39 41 V35 H42 V19 H34" />
      </svg>
    ),
  },
  {
    label: "OBJECTIF",
    title: "Stage PFE Full Stack",
    text: "Participer à des projets réels et renforcer mes compétences en développement logiciel.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle className="about-ln stroke-ink" cx="24" cy="24" r="17" />
        <circle className="about-ln stroke-fluo about-spin" cx="24" cy="24" r="10" strokeDasharray="5 5" />
        <circle className="about-pulse fill-fluo" cx="24" cy="24" r="3.5" />
      </svg>
    ),
  },
];

export const STATS = [
  { value: "3+", label: "Bases de données" },
  { value: "4", label: "Frameworks backend" },
  { value: "2", label: "Projets full stack" },
];


const FLUO = "var(--color-fluo)";
const INK = "var(--color-ink)";

export const SKILLS = [
  {
    title: "Backend",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="sk-ln stroke-fluo sk-draw" pathLength="60" d="M18 14 L8 24 L18 34" />
        <path className="sk-ln stroke-fluo sk-draw" pathLength="60" d="M30 14 L40 24 L30 34" />
        <path className="sk-ln stroke-ink sk-draw" pathLength="60" d="M27 11 L21 37" />
      </svg>
    ),
    chips: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Python", icon: SiPython, color: "#4B8BBE" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Spring Data JPA", icon: SiSpring, color: "#6DB33F" },
      { name: "Hibernate", icon: SiHibernate, color: "#BCAE79" },
      { name: "Spring Security", icon: SiSpringsecurity, color: "#6DB33F" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
      { name: "PHP", icon: SiPhp, color: "#8892BF" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Express.js", icon: SiExpress, color: INK },
    ],
  },
  {
    title: "Frontend",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="sk-ln stroke-fluo sk-draw" pathLength="60" d="M7 38 C 7 12, 41 36, 41 10" />
        <rect className="sk-pulse fill-ink" x="4" y="35" width="6" height="6" />
        <rect className="sk-pulse fill-fluo" x="38" y="7" width="6" height="6" />
      </svg>
    ),
    chips: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#4A90D9" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Bootstrap 5", icon: SiBootstrap, color: "#9B6FE8" },
      { name: "shadcn/ui", icon: SiShadcnui, color: INK },
      { name: "Material UI", icon: SiMui, color: "#3EA6FF" },
    ],
  },
  {
    title: "Bases de données",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <ellipse className="sk-ln stroke-fluo" cx="24" cy="12" rx="14" ry="5" />
        <path className="sk-ln stroke-ink" d="M10 12 V36 C10 39 16 42 24 42 C32 42 38 39 38 36 V12" />
        <path className="sk-ln stroke-fluo sk-draw" pathLength="60" d="M10 24 C10 27 16 30 24 30 C32 30 38 27 38 24" />
      </svg>
    ),
    chips: [
      { name: "MySQL", icon: SiMysql, color: "#4DA3D9" },
      { name: "MariaDB", icon: SiMariadb, color: "#C49A6C" },
      { name: "MongoDB", icon: SiMongodb, color: "#5CBF5E" },
      { name: "SQL", icon: FaDatabase, color: FLUO },
      { name: "NoSQL", icon: FaDatabase, color: "#5CBF5E" },
    ],
  },
  {
    title: "Outils & IA",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="sk-ln stroke-fluo sk-spin" d="M24 5 L28.5 19.5 L43 24 L28.5 28.5 L24 43 L19.5 28.5 L5 24 L19.5 19.5 Z" />
        <circle className="sk-pulse fill-ink" cx="24" cy="24" r="3" />
      </svg>
    ),
    chips: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: INK },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Jira", icon: SiJira, color: "#2684FF" },
      { name: "Ollama (LLM local)", icon: SiOllama, color: INK },
      { name: "API REST", icon: TbApi, color: FLUO },
      { name: "Design Patterns", icon: TbBinaryTree, color: FLUO },
    ],
  },
];
// // À AJOUTER dans Data/index.tsx (fusionne les imports avec ceux que tu as déjà)
import type { IconType } from "react-icons";

export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface ProjectItem {
  num: string;
  title: string;
  desc: string;
  stack: TechItem[];
  href: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    title: "Application E-commerce Full Stack",
    desc: "API REST avec Spring Boot, gestion des produits et des commandes, interface en React.js.",
    stack: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Spring Data JPA", icon: SiSpring, color: "#6DB33F" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "MySQL", icon: SiMysql, color: "#4DA3D9" },
    ],
    href: "https://github.com/AmineCheffak/Store.git",
  },
  {
    num: "02",
    title: "Chatbot IA avec Ollama et React",
    desc: "Chat en temps réel avec historique, modèle de langage local et réponses en streaming. le projet en cours de développement.",
    stack: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Ollama (LLM local)", icon: SiOllama, color: INK },
      { name: "API REST", icon: TbApi, color: FLUO },
    ],
    href: "#",
  },
  {
    num: "03",
    title: "Application Bancaire Full Stack",
    desc: "Application bancaire développée en équipe, avec gestion des comptes bancaires et des opérations financières.",
    stack: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
    ],
    href: "https://github.com/AmineCheffak/Bank-Application-Amine-Cheffak-Mohammad-El-Jaid",
  }
];
// À AJOUTER à la fin de Data/index.tsx (et garde l'import de ReactNode en haut)
import type { ReactNode } from "react";

export interface ServiceItem {
  title: string;
  text: string;
  icon: ReactNode;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Développement Full Stack",
    text: "Applications web complètes, du backend à l'interface, avec Spring Boot, React.js et MySQL.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path className="sv-ln stroke-fluo sv-draw" pathLength={60} d="M18 14 L8 24 L18 34" />
        <path className="sv-ln stroke-fluo sv-draw" pathLength={60} d="M30 14 L40 24 L30 34" />
        <path className="sv-ln stroke-ink sv-draw" pathLength={60} d="M27 11 L21 37" />
      </svg>
    ),
  },
  {
    title: "API REST & Backend",
    text: "Conception d'API REST, gestion des données avec JPA/Hibernate, authentification avec Spring Security et JWT.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <rect className="sv-ln stroke-ink" x="8" y="8" width="32" height="12" rx="3" />
        <rect className="sv-ln stroke-ink" x="8" y="28" width="32" height="12" rx="3" />
        <circle className="sv-pulse fill-fluo" cx="15" cy="14" r="2" />
        <circle className="sv-pulse fill-fluo" cx="15" cy="34" r="2" style={{ animationDelay: ".6s" }} />
        <path className="sv-ln stroke-fluo sv-flow" d="M24 21 V27" />
      </svg>
    ),
  },
  {
    title: "Interfaces React",
    text: "Interfaces modernes et responsives avec React.js, TypeScript et Tailwind CSS.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <g className="sv-spin">
          <ellipse className="sv-ln stroke-fluo" cx="24" cy="24" rx="17" ry="7" />
          <ellipse className="sv-ln stroke-fluo" cx="24" cy="24" rx="17" ry="7" transform="rotate(60 24 24)" />
          <ellipse className="sv-ln stroke-fluo" cx="24" cy="24" rx="17" ry="7" transform="rotate(120 24 24)" />
        </g>
        <circle className="sv-pulse fill-ink" cx="24" cy="24" r="3" />
      </svg>
    ),
  },
  {
    title: "IA locale & Docker",
    text: "Intégration d'un LLM local avec Ollama (chatbot en streaming) et conteneurisation des projets avec Docker.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <g className="sv-float">
          <rect className="sv-ln stroke-fluo" x="8" y="22" width="9" height="8" rx="1.5" />
          <rect className="sv-ln stroke-fluo" x="19.5" y="22" width="9" height="8" rx="1.5" />
          <rect className="sv-ln stroke-fluo" x="31" y="22" width="9" height="8" rx="1.5" />
          <rect className="sv-ln stroke-ink" x="19.5" y="13" width="9" height="8" rx="1.5" />
        </g>
        <path className="sv-ln stroke-ink sv-draw" pathLength={60} d="M5 36 C14 42 34 42 44 33" />
      </svg>
    ),
  },
];