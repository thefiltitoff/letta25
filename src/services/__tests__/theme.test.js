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

// Stored choice wins, otherwise the default is always light — the system
// preference is intentionally ignored so the first visit is always light.
describe("resolveInitialTheme", () => {
  it("prefers the stored theme over the system preference", () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia({ dark: false });
    expect(resolveInitialTheme()).toBe("dark");
  });

  it("ignores the system preference and defaults to light", () => {
    mockMatchMedia({ dark: true });
    expect(resolveInitialTheme()).toBe("light");
  });

  it("defaults to light when nothing is stored", () => {
    mockMatchMedia({ dark: false });
    expect(resolveInitialTheme()).toBe("light");
  });
});

// Theme switches via data-theme on <html>.
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
