import type { MouseEventHandler, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  methode?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  "aria-label"?: string;
}

export default function Button({
  children,
  methode,
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  return (
    <button
      onClick={methode}
      aria-label={ariaLabel}
      className={`${className} theme-button-shadow pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-line-2 bg-panel text-ink transition-all duration-300 hover:border-fluo hover:bg-fluo hover:text-white`}
    >
      {children}
    </button>
  );
}