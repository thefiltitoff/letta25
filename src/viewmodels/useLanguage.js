import { useCallback, useEffect, useState } from "react";
import { LANGS } from "../models/dialogueNodes";
import { translations } from "../models/translations";
import { applyLanguageToDocument } from "../services/language";

const DEFAULT_LANG = "ru";

export function useLanguage() {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    applyLanguageToDocument(lang);
  }, [lang]);

  const cycleLang = useCallback(() => {
    setLang((current) => {
      const i = LANGS.indexOf(current);
      return LANGS[(i + 1) % LANGS.length];
    });
  }, []);

  return { lang, langLabel: lang.toUpperCase(), cycleLang, t: translations[lang] };
}
