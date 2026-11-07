"use client";

import { Minus, Square, X, Terminal as TerminalIcon } from "lucide-react";

interface Props {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function TerminalTitleBar({
  onClose,
  onMinimize,
  onMaximize,
}: Props) {
  const stop =
    (fn: () => void) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      fn();
    };

  return (
    <div className="relative flex h-11 shrink-0 items-center border-b border-white/10 bg-white/[0.035] px-4">
      {/* macOS traffic lights */}
      <div className="group relative z-10 flex items-center gap-2">
        <button
          onClick={stop(onClose)}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-black/60 transition hover:brightness-110"
          aria-label="Close"
        >
          <X
            size={8}
            strokeWidth={3}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </button>

        <button
          onClick={stop(onMinimize)}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-black/60 transition hover:brightness-110"
          aria-label="Minimize"
        >
          <Minus
            size={8}
            strokeWidth={3}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </button>

        <button
          onClick={stop(onMaximize)}
          className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-black/60 transition hover:brightness-110"
          aria-label="Maximize"
        >
          <Square
            size={6}
            strokeWidth={3}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </button>
      </div>

      {/* Centered title */}
      <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2">
        <TerminalIcon size={13} className="text-lime-400" />
        <span className="text-xs font-medium tracking-wide text-white/70">
          amine@developer: ~
        </span>
      </div>
    </div>
  );
}