import type { ProjectItem } from "@/Data/";

interface ProjectProps extends ProjectItem {
  delay?: number;
}

const Project = ({ num, title, desc, stack, href, delay = 0 }: ProjectProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pr-rise flex min-h-[260px] flex-col gap-3 rounded-2xl border border-[#232830] bg-dark p-5 transition duration-300 hover:-translate-y-1.5 hover:border-fluo"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between">
        <span className="font-cyber text-xs text-fluo">{num}</span>
        <svg viewBox="0 0 24 24" className="pr-float h-6 w-6" aria-hidden="true">
          <path
            d="M7 17 L17 7 M9 7 H17 V15"
            fill="none"
            stroke="#C8FF3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="font-cyber text-base font-bold leading-snug">{title}</h3>
      <p className="text-lg leading-snug text-grid">{desc}</p>

      {/* Stack : une icône par technologie (nom au survol) */}
      <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Technologies utilisées">
        {stack.map(({ name, icon: Icon, color }) => (
          <li
            key={name}
            title={name}
            className="group/tech flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A3038] bg-[#1A1E25] transition duration-200 hover:-translate-y-0.5 hover:border-fluo"
          >
            <Icon
              className="h-5 w-5 transition-transform duration-200 group-hover/tech:scale-125"
              style={{ color }}
              aria-hidden="true"
            />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </a>
  );
};

export default Project;