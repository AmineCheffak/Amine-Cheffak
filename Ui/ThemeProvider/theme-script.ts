export const THEME_STORAGE_KEY = "amine-portfolio-theme";

export const THEME_INIT_SCRIPT = `(() => {
  const root = document.documentElement;
  let theme = null;

  try {
    theme = localStorage.getItem("${THEME_STORAGE_KEY}");
  } catch {
    theme = null;
  }

  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
})();`;
