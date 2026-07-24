import { act, renderHook } from "@testing-library/react";
import { useTheme } from "../useTheme";
import { mockMatchMedia } from "../../testUtils";

describe("useTheme", () => {
  it("initializes from the stored theme", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(result.current.isDark).toBe(true);
  });

  it("initializes to light when nothing is stored, ignoring the system preference", () => {
    mockMatchMedia({ dark: true });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("applies the theme to the document (viewmodel → service)", () => {
    localStorage.setItem("theme", "dark");
    renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("toggles, persists and re-applies the theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");
    expect(result.current.isDark).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
