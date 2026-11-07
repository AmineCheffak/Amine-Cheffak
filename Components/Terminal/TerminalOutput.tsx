"use client";

import { ReactNode, RefObject } from "react";
import { Circle } from "lucide-react";

import Linkify from "./Linkify";
import TypewriterText from "./TypewriterText";
import { TerminalLine } from "./types";

interface Props {
  lines: TerminalLine[];
  scrollRef: RefObject<HTMLDivElement | null>;
  children: ReactNode; // the input form
}

const COLORS: Record<TerminalLine["type"], string> = {
  command: "text-white",
  error: "text-red-400",
  success: "text-lime-400",
  output: "text-white/65",
};

export default function TerminalOutput({ lines, scrollRef, children }: Props) {
  return (
    <div
      ref={scrollRef}
      className="terminal-body min-h-0 flex-1 overflow-y-auto px-5 py-5 font-mono text-[13px] leading-6 sm:text-sm"
    >
      {/* STATUS */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-white/35">
        <Circle size={7} fill="currentColor" className="text-lime-400" />
        <span>Connected</span>
        <span className="text-white/15">|</span>
        <span>zsh</span>
        <span className="text-white/15">|</span>
        <span>UTF-8</span>
      </div>

      {/* LINES */}
      {lines.map((line) => (
        <div
          key={line.id}
          className={`whitespace-pre-wrap break-words ${COLORS[line.type]}`}
        >
          {line.type === "command" && (
            <span className="mr-2 text-lime-400">amine@developer:~$</span>
          )}

          {line.animated ? (
            <TypewriterText text={line.content} speed={18} />
          ) : (
            <Linkify text={line.content} />
          )}
        </div>
      ))}

      {/* INPUT */}
      {children}

      <style jsx>{`
        .terminal-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(163, 230, 53, 0.25) transparent;
        }

        .terminal-body::-webkit-scrollbar {
          width: 5px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(163, 230, 53, 0.25);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}