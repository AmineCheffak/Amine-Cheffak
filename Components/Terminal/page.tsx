"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import TerminalTitleBar from "./TerminalTitleBar";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import { INITIAL_LINES, runCommand } from "./commands";
import { playCommandSound } from "./playCommandSound";
import { NewLine, TerminalLine } from "./types";

export default function TerminalOs() {
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    INITIAL_LINES.map((item, index) => ({ ...item, id: index + 1 }))
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

    const inputElement = inputRef.current;

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    inputElement?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      inputElement?.focus();
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

    setLines((previous) => {
      const nextLines = [
        { type: "command", content: command, animated: false },
        ...result.lines.map((line) => ({ ...line, animated: true })),
      ] as NewLine[];

      return [
        ...previous,
        ...nextLines.map((item, index) => ({
          ...item,
          id: previous.length + index + 1,
        })),
      ];
    });
  };

  /* CLOSED */
  if (isClosed) {
    return null;
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