import { act, renderHook } from "@testing-library/react";
import { useLanguage } from "../useLanguage";
import { LANGS } from "../../models/dialogueNodes";
import { translations } from "../../models/translations";

describe("useLanguage", () => {
  it("starts in Russian with matching dictionary and label", () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.lang).toBe("ru");
    expect(result.current.langLabel).toBe("RU");
    expect(result.current.t).toBe(translations.ru);
    expect(document.documentElement.lang).toBe("ru");
  });

  it("cycles through all languages in order and wraps around", () => {
    const { result } = renderHook(() => useLanguage());
    const expected = [...LANGS.slice(1), LANGS[0]];
    for (const lang of expected) {
      act(() => result.current.cycleLang());
      expect(result.current.lang).toBe(lang);
      expect(result.current.langLabel).toBe(lang.toUpperCase());
      expect(result.current.t).toBe(translations[lang]);
      expect(document.documentElement.lang).toBe(lang);
    }
  });
});
