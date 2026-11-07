"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Terminal as TerminalIcon } from "lucide-react";

import TerminalTitleBar from "./TerminalTitleBar";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import { INITIAL_LINES, runCommand } from "./commands";
import { playCommandSound } from "./playCommandSound";
import { NewLine, TerminalLine } from "./types";

export default function TerminalOs() {
  const lineId = useRef(1);

  const withIds = (items: NewLine[]): TerminalLine[] =>
    items.map((item) => ({ ...item, id: lineId.current++ }));

  const [lines, setLines] = useState<TerminalLine[]>(() =>
    withIds(INITIAL_LINES)
  );
  const [history, setHistory] = useState<string[]>([]);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* AUTO SCROLL */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isMaximized]);

  /* MAXIMIZED: ESC + LOCK PAGE SCROLL */
  useEffect(() => {
    if (!isMaximized) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMaximized(false);
    };

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    inputRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      inputRef.current?.focus();
    };
  }, [isMaximized]);

  const focusInput = () => {
    if (!isClosed && !isMinimized) inputRef.current?.focus();
  };

  /* RUN COMMAND */
  const handleCommand = (raw: string) => {
    const command = raw.trim();
    if (!command) return;

    playCommandSound();

    setHistory((previous) => [...previous, command]);

    const [first, ...rest] = command.split(" ");
    const result = runCommand(first.toLowerCase(), rest.join(" "), history);

    if (result.action === "clear") {
      setLines([]);
      return;
    }

    if (result.action === "exit") {
      setIsMaximized(false);
      setIsClosed(true);
      return;
    }

    setLines((previous) => [
      ...previous,
      ...withIds([
        { type: "command", content: command, animated: false },
        ...result.lines.map((line) => ({ ...line, animated: true })),
      ]),
    ]);
  };

  /* CLOSED */
  if (isClosed) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-black/30 p-8 text-white/60 backdrop-blur-xl">
        <button
          onClick={() => setIsClosed(false)}
          className="rounded-lg border border-white/10 px-5 py-2 transition hover:border-lime-400/50 hover:text-lime-400"
        >
          <TerminalIcon size={16} className="mr-2 inline" />
          Reopen Terminal
        </button>
      </div>
    );
  }

  /* WINDOW */
  const windowEl = (
    <div
      className={`terminal-window flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080b10]/95 shadow-2xl shadow-black/40 backdrop-blur-2xl ${
        isMaximized
          ? "fixed inset-3 z-[100] sm:inset-6"
          : `relative w-full ${isMinimized ? "h-auto" : "h-full"}`
      }`}
      onClick={focusInput}
    >
      <TerminalTitleBar
        onClose={() => {
          setIsMaximized(false);
          setIsClosed(true);
        }}
        onMinimize={() => {
          setIsMinimized((value) => !value);
          setIsMaximized(false);
        }}
        onMaximize={() => {
          setIsMaximized((value) => !value);
          setIsMinimized(false);
        }}
      />

      {!isMinimized && (
        <>
          <TerminalOutput lines={lines} scrollRef={scrollRef}>
            <TerminalInput
              history={history}
              inputRef={inputRef}
              onSubmit={handleCommand}
            />
          </TerminalOutput>

          <div className="flex h-8 shrink-0 items-center justify-between border-t border-white/10 bg-white/[0.025] px-4 text-[10px] text-white/30">
            <span>zsh — 80 × 24</span>
            <span>UTF-8</span>
          </div>
        </>
      )}

      <style jsx>{`
        .terminal-window {
          animation: terminalEnter 0.5s ease-out backwards;
        }

        @keyframes terminalEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-window {
            animation: none;
          }
        }
      `}</style>
    </div>
  );

  /* MAXIMIZED: portal to <body> so `fixed` always works */
  if (isMaximized) {
    return createPortal(
      <>
        <div
          className="p-2 fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMaximized(false)}
        />
        {windowEl}
      </>,
      document.body
    );
  }

  return windowEl;
}