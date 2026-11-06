import { memo, type ReactNode } from "react";

type values = {
    icon : ReactNode,
    label : string,
    text : string,
    title : string
    index : number
}


const index = ({icon,label,text,title,index}:values) => {
  return (
    <div
        data-gsap-rise
        data-gsap-delay={0.1 + index * 0.08}
        className="group flex flex-col gap-2.5 rounded-2xl border border-line bg-dark p-4 transition duration-300 hover:-translate-y-1 hover:border-fluo"
    >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-2 bg-panel">
            {icon}
        </div>
        <span className="font-cyber text-[10px] tracking-[0.14em] text-grid">
            {label}
        </span>
        <h3 className="font-cyber text-sm font-bold leading-snug">{title}</h3>
        <p className="text-base leading-snug text-grid">{text}</p>
    </div>
  )
}

export default memo(index);