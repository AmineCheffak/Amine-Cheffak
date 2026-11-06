import { memo } from "react";

import type { ServiceItem } from "@/Data/";

interface ServiceProps extends ServiceItem {
  index?: number;
}

const Service = ({ title, text, icon, index = 0 }: ServiceProps) => {
  return (
    <div
      data-gsap-rise
      data-gsap-delay={0.1 + index * 0.08}
      className="group flex flex-col gap-3 rounded-2xl border border-line bg-dark p-5 transition duration-300 hover:-translate-y-1.5 hover:border-fluo"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-2 bg-panel">
          {icon}
        </div>
        <span className="font-cyber text-xs text-grid transition-colors group-hover:text-fluo">
          0{index + 1}
        </span>
      </div>
      <h3 className="font-cyber text-sm font-bold leading-snug">{title}</h3>
      <p className="text-lg leading-snug text-grid">{text}</p>
    </div>
  );
};

export default memo(Service);