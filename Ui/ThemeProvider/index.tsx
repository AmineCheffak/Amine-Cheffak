"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { THEME_STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const listeners = new Set<() => void>();

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const hasSavedPreference = useRef(false);
  const transitionTimeout = useRef<number | null>(null);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    hasSavedPreference.current = isTheme(storedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme = isTheme(storedTheme)
      ? storedTheme
      : mediaQuery.matches
        ? "dark"
        : "light";
    if (getThemeSnapshot() !== initialTheme) applyTheme(initialTheme);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (hasSavedPreference.current) return;
      applyTheme(event.matches ? "dark" : "light");
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      hasSavedPreference.current = isTheme(event.newValue);
      applyTheme(
        isTheme(event.newValue)
          ? event.newValue
          : mediaQuery.matches
            ? "dark"
            : "light"
      );
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleStorage);
      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = getThemeSnapshot() === "light" ? "dark" : "light";
    const root = document.documentElement;

    if (transitionTimeout.current !== null) {
      window.clearTimeout(transitionTimeout.current);
    }

    root.dataset.themeTransition = "true";
    transitionTimeout.current = window.setTimeout(() => {
      root.removeAttribute("data-theme-transition");
      transitionTimeout.current = null;
    }, 280);

    hasSavedPreference.current = true;
    applyTheme(nextTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme remains active for this page even if storage is unavailable.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
