const STORAGE_KEY = "theme";

export function readStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch (error) {
    return null;
  }
}

export function persistTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // localStorage unavailable (private mode etc.) — the theme just won't persist
  }
}

export function systemPrefersDark() {
  return (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function resolveInitialTheme() {
  return readStoredTheme() || (systemPrefersDark() ? "dark" : "light");
}

export function applyThemeToDocument(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#1E1B18" : "#FCFBF4");
}
