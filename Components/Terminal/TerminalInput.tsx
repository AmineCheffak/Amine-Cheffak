"use client";

import { FormEvent, KeyboardEvent, RefObject, useState } from "react";

import { COMMAND_NAMES } from "./commands";

interface Props {
  history: string[];
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (command: string) => void;
}

export default function TerminalInput({ history, inputRef, onSubmit }: Props) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(input);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (history.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();

      if (!input) return;

      const match = COMMAND_NAMES.find((command) =>
        command.startsWith(input.toLowerCase())
      );

      if (match) setInput(match);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
      <span className="shrink-0 text-lime-400">amine@developer:~$</span>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
        aria-label="Terminal command input"
        className="min-w-0 flex-1 border-none bg-transparent text-white outline-none placeholder:text-white/20"
        placeholder="Type a command..."
      />

      <span className="terminal-cursor h-4 w-[7px] shrink-0 bg-lime-400" />

      <style jsx>{`
        .terminal-cursor {
          animation: cursorBlink 1s steps(2, start) infinite;
        }

        @keyframes cursorBlink {
          to {
            visibility: hidden;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor {
            animation: none;
          }
        }
      `}</style>
    </form>
  );
}