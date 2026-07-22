import { useCallback, useEffect, useState } from "react";
import { LANGS } from "../models/dialogueNodes";
import { translations } from "../models/translations";
import { applyLanguageToDocument } from "../services/language";
import { trackEvent } from "../services/analytics";

const DEFAULT_LANG = "ru";

export function useLanguage() {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    applyLanguageToDocument(lang);
  }, [lang]);

  const cycleLang = useCallback(() => {
    setLang((current) => {
      const i = LANGS.indexOf(current);
      const next = LANGS[(i + 1) % LANGS.length];
      trackEvent("button_click", { button_id: "language_switch", from_lang: current, next_lang: next });
      return next;
    });
  }, []);

  return { lang, langLabel: lang.toUpperCase(), cycleLang, t: translations[lang] };
}
