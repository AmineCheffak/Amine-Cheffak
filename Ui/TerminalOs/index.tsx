"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Minus,
  Square,
  X,
  Terminal as TerminalIcon,
} from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";

interface TerminalLine {
  id: number;
  type: "command" | "output" | "error" | "success";
  content: string;
}

const INITIAL_LINES: TerminalLine[] = [
  {
    id: 1,
    type: "success",
    content: "Welcome to Amine's Terminal 🚀",
  },
  {
    id: 2,
    type: "output",
    content: "Portfolio environment initialized successfully.",
  },
  {
    id: 3,
    type: "output",
    content: "Type 'help' to see the available commands.",
  },
];

const COMMANDS: Record<string, string> = {
  whoami: "Amine Cheffak — Full Stack Developer",

  about:
    "I'm Amine, a Full Stack Developer from Safi, Morocco, passionate about software engineering and building useful applications.",

  skills:
    "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express.js, NestJS, Java\nDatabase: MySQL, PostgreSQL, MongoDB\nTools: Git, GitHub, Docker",

  projects:
    "Explore my projects:\nGitHub: github.com/AmineCheffak\nPortfolio: aminecheffak.vercel.app",

  education:
    "ISTA NTIC Safi\nDevelopment Digital — Full Stack\n2025–2027",

  contact:
    "Let's work together!\nGitHub: github.com/AmineCheffak",

  pwd: "/home/amine/portfolio",

  ls: "about.tsx  skills.json  projects/  contact.ts  README.md",

  hostname: "amine-portfolio",

  "uname -s": "PortfolioOS",

  "sudo hire amine":
    "Excellent choice! 🚀\nContact Amine to discuss your next project.",
};

export default function TerminalOs({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);

  const [isOpen, setIsOpen] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(4);
  const lastAnimatedLineId = useRef(3);
  const reducedMotionRef = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const overlay = overlayRef.current;
      const terminalWindow = windowRef.current;
      if (!overlay || !terminalWindow) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        reducedMotionRef.current = true;
        gsap.set([overlay, terminalWindow], {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        reducedMotionRef.current = false;
        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: "power1.out" }
        );
        gsap.fromTo(
          terminalWindow,
          { autoAlpha: 0, scale: 0.85, y: 30 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          }
        );
      });

      return () => media.revert();
    },
    { scope: overlayRef }
  );

  useGSAP(
    () => {
      const content = contentRef.current;
      if (!content) return;

      gsap.set(content, {
        autoAlpha: 1,
        scaleY: 1,
        transformOrigin: "top",
      });
    },
    { scope: overlayRef }
  );

  useGSAP(
    () => {
      const body = bodyRef.current;
      if (!body) return;

      const newLines = lines.filter(
        (line) => line.id > lastAnimatedLineId.current
      );

      newLines.forEach((line) => {
        const element = body.querySelector<HTMLElement>(
          `[data-terminal-line-id="${line.id}"]`
        );
        if (!element) return;

        if (reducedMotionRef.current) {
          gsap.set(element, { autoAlpha: 1, x: 0 });
        } else {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: -8 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.2,
              ease: "power2.out",
            }
          );
        }
        lastAnimatedLineId.current = line.id;
      });
    },
    { scope: overlayRef, dependencies: [lines] }
  );

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((previous) => [
      ...previous,
      {
        id: nextId.current++,
        type,
        content,
      },
    ]);
  };

  const executeCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();

    if (!command) return;

    addLine("command", command);

    setCommandHistory((previous) => [...previous, command]);

    setHistoryIndex(-1);

    const normalizedCommand = command.toLowerCase();

    if (normalizedCommand === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (normalizedCommand === "help") {
      addLine(
        "success",
        `AVAILABLE COMMANDS

  help              Show available commands
  about             About Amine
  whoami            Developer identity
  skills            Technical skills
  projects           Explore projects
  education          Education
  contact            Contact information
  date               Current date
  pwd                Current directory
  ls                 List portfolio files
  hostname           Display hostname
  uname -s           Display system name
  sudo hire amine    Hire Amine
  echo <text>        Print text
  banner             Display welcome banner
  history            Command history
  clear              Clear terminal
  exit               Close terminal`
      );
    } else if (normalizedCommand === "banner") {
      addLine(
        "success",
        `
   _    __  __ ___ _   _ _____
  / \\  |  \\/  |_ _| \\ | | ____|
 / _ \\ | |\\/| || ||  \\| |  _|
/ ___ \\| |  | || || |\\  | |___
/_/   \\_\\_|  |_|___|_| \\_|_____|

  FULL STACK DEVELOPER
  Safi, Morocco`
      );
    } else if (normalizedCommand === "history") {
      addLine(
        "output",
        commandHistory.length
          ? commandHistory
              .map((item, index) => `  ${index + 1}  ${item}`)
              .join("\n")
          : "No previous commands."
      );
    } else if (normalizedCommand === "date") {
      addLine("output", new Date().toString());
    } else if (normalizedCommand === "exit") {
      setInput("");
      closeTerminal();
      return;
    } else if (normalizedCommand.startsWith("echo ")) {
      addLine("output", command.slice(5));
    } else if (COMMANDS[normalizedCommand] !== undefined) {
      addLine("output", COMMANDS[normalizedCommand]);
    } else {
      addLine(
        "error",
        `zsh: command not found: ${command}\nType 'help' to see available commands.`
      );
    }

    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex + 1;

        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }

    if (event.key === "Escape") {
      setInput("");
    }
  };

  const closeTerminal = contextSafe(() => {
    if (!isOpen) return;

    setIsOpen(false);
    if (reducedMotionRef.current || !overlayRef.current) {
      setShouldRender(false);
      onClose();
      return;
    }

    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
      onComplete: () => {
        setShouldRender(false);
        onClose();
      },
    });
  });

  const toggleMinimize = contextSafe(() => {
    const nextIsMinimized = !isMinimized;
    setIsMinimized(nextIsMinimized);

    const content = contentRef.current;
    if (!content) return;

    const target = nextIsMinimized ? 0 : 1;
    if (reducedMotionRef.current) {
      gsap.set(content, { autoAlpha: target, scaleY: target });
      return;
    }

    gsap.to(content, {
      autoAlpha: target,
      scaleY: target,
      transformOrigin: "top",
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99] flex items-center justify-center bg-void/30 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeTerminal();
        }
      }}
    >
      <div
        ref={windowRef}
        onClick={() => inputRef.current?.focus()}
        className={`terminal-window flex flex-col overflow-hidden rounded-xl border border-terminal-border bg-terminal-bg/75 font-mono text-terminal-fg shadow-2xl backdrop-blur-xl ${
          isMaximized
            ? "h-[96vh] w-[96vw]"
            : "h-[90vh] w-[60vw] max-md:w-[95vw]"
        } ${isMinimized ? "!h-12" : ""}`}
      >
        {/* Title Bar */}
        <div className="relative flex h-12 shrink-0 items-center justify-between border-b border-terminal-border bg-terminal-chrome/60 px-4">
          <div className="flex items-center gap-2">
            {/* Close */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeTerminal();
              }}
              aria-label="Close terminal"
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F57] text-black/70 transition hover:brightness-125"
            >
              <X size={9} />
            </button>

            {/* Minimize */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleMinimize();
              }}
              aria-label="Minimize terminal"
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FEBC2E] text-black/70 transition hover:brightness-125"
            >
              <Minus size={9} />
            </button>

            {/* Maximize */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsMaximized((previous) => !previous);
                setIsMinimized(false);
              }}
              aria-label="Maximize terminal"
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28C840] text-black/70 transition hover:brightness-125"
            >
              <Square size={7} />
            </button>
          </div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-terminal-muted">
            <TerminalIcon size={14} />

            <span className="whitespace-nowrap">amine — zsh — 80×24</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Animated Terminal Content */}
        <div
          ref={contentRef}
          aria-hidden={isMinimized}
          className={`flex min-h-0 flex-1 flex-col overflow-hidden ${
            isMinimized ? "pointer-events-none" : ""
          }`}
        >
          {/* Terminal Body */}
          <div
            ref={bodyRef}
            className="min-h-0 flex-1 overflow-y-auto p-5 text-xs leading-6 sm:text-sm sm:leading-7"
          >
            <p className="mb-4 text-terminal-muted">
              PortfolioOS [Version 1.0.0]
            </p>

            {/* Command History */}
            {lines.map((line) => (
              <div
                key={line.id}
                data-terminal-line-id={line.id}
                className="mb-1 whitespace-pre-wrap break-words"
              >
                {line.type === "command" ? (
                  <p>
                    <span className="text-terminal-prompt">
                      amine@portfolio ~ %
                    </span>

                    <span className="ml-2 text-terminal-fg">
                      {line.content}
                    </span>
                  </p>
                ) : (
                  <p
                    className={
                      line.type === "error"
                        ? "text-terminal-error"
                        : line.type === "success"
                          ? "text-terminal-success"
                          : "text-terminal-output"
                    }
                  >
                    {line.content}
                  </p>
                )}
              </div>
            ))}

            {/* Input Line */}
            <form
              onSubmit={executeCommand}
              className="mt-2 flex items-center gap-2"
            >
              <span className="shrink-0 text-terminal-prompt">
                amine@portfolio ~ %
              </span>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="min-w-0 flex-1 border-none bg-transparent text-terminal-output outline-none caret-terminal-prompt"
                autoFocus
              />

              <span className="pointer-events-none hidden h-4 w-1 animate-pulse bg-terminal-prompt sm:block" />
            </form>
          </div>

          {/* Status Bar */}
          <div className="flex h-8 shrink-0 items-center justify-between border-t border-terminal-border bg-terminal-chrome/60 px-4 text-[10px] text-terminal-muted">
            <span>zsh · interactive shell</span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28C840]" />
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}