import {
  applyThemeToDocument,
  persistTheme,
  readStoredTheme,
  resolveInitialTheme,
  systemPrefersDark,
} from "../theme";
import { mockMatchMedia, unsetMatchMedia } from "../../testUtils";

describe("readStoredTheme", () => {
  it("returns null when nothing is stored", () => {
    expect(readStoredTheme()).toBeNull();
  });

  it("returns a stored valid theme", () => {
    localStorage.setItem("theme", "dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("ignores garbage values", () => {
    localStorage.setItem("theme", "purple");
    expect(readStoredTheme()).toBeNull();
  });

  it("returns null when localStorage throws", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    expect(readStoredTheme()).toBeNull();
  });
});

describe("persistTheme", () => {
  it("stores the theme", () => {
    persistTheme("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("swallows storage errors (private mode etc.)", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(() => persistTheme("dark")).not.toThrow();
  });
});

describe("systemPrefersDark", () => {
  it("reflects the media query", () => {
    mockMatchMedia({ dark: true });
    expect(systemPrefersDark()).toBe(true);
    mockMatchMedia({ dark: false });
    expect(systemPrefersDark()).toBe(false);
  });

  it("is false when matchMedia is unavailable", () => {
    unsetMatchMedia();
    expect(systemPrefersDark()).toBe(false);
  });
});

// Spec §9: stored choice wins, otherwise prefers-color-scheme decides.
describe("resolveInitialTheme", () => {
  it("prefers the stored theme over the system preference", () => {
    localStorage.setItem("theme", "light");
    mockMatchMedia({ dark: true });
    expect(resolveInitialTheme()).toBe("light");
  });

  it("falls back to the system preference", () => {
    mockMatchMedia({ dark: true });
    expect(resolveInitialTheme()).toBe("dark");
  });

  it("defaults to light", () => {
    mockMatchMedia({ dark: false });
    expect(resolveInitialTheme()).toBe("light");
  });
});

// Spec §9: theme switches via data-theme on <html>.
describe("applyThemeToDocument", () => {
  it("sets data-theme on the root element", () => {
    applyThemeToDocument("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    applyThemeToDocument("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("updates the theme-color meta when present", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
    try {
      applyThemeToDocument("dark");
      expect(meta.getAttribute("content")).toBe("#1E1B18");
      applyThemeToDocument("light");
      expect(meta.getAttribute("content")).toBe("#FCFBF4");
    } finally {
      meta.remove();
    }
  });

  it("does not crash without the meta tag", () => {
    expect(() => applyThemeToDocument("dark")).not.toThrow();
  });
});
