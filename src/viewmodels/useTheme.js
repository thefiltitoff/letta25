import { useCallback, useEffect, useState } from "react";
import { applyThemeToDocument, persistTheme, resolveInitialTheme } from "../services/theme";
import { trackEvent } from "../services/analytics";

export function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      persistTheme(next);
      trackEvent("button_click", { button_id: "theme_toggle", next_theme: next });
      return next;
    });
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme };
}
