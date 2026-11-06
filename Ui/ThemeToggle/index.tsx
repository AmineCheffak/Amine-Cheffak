"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/Ui/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} mode`}
      className="theme-toggle pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-panel text-ink shadow-sm transition-colors hover:border-fluo hover:text-fluo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fluo sm:h-11 sm:w-11"
    >
      <Sun
        aria-hidden="true"
        className="theme-toggle__sun absolute h-5 w-5 transition-all duration-300"
      />
      <Moon
        aria-hidden="true"
        className="theme-toggle__moon absolute h-5 w-5 transition-all duration-300"
      />
    </button>
  );
}
