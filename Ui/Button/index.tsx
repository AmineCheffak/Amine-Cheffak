import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  methode?: MouseEventHandler<HTMLButtonElement>;
  style?:string
}

export default function Button({ children, methode ,style}: Props) {
  return (
    <button
      onClick={methode}
      className={`${style} pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1B1428] text-[#F5F0FC] transition-all duration-300 hover:border-[#A855F7] hover:bg-[#A855F7] hover:text-[#09070F] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]`}
    >
      {children}
    </button>
  );
}