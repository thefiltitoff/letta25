import { useCallback, useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import { useLanguage } from "./useLanguage";
import { useDialogueEngine } from "./useDialogueEngine";
import { fireConfettiCelebration } from "../services/confetti";
import { prefersReducedMotion } from "../services/reducedMotion";

// Top-level composing ViewModel for BirthdayPage: assembles the theme, language
// and dialogue engine into a single set of data/callbacks for the View, and
// drives screen transitions and the bonus modal.
export function useBirthdayViewModel() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { lang, langLabel, cycleLang, t } = useLanguage();
  const [screen, setScreen] = useState("start");
  const [modalOpen, setModalOpen] = useState(false);

  const goEnd = useCallback(() => setScreen("end"), []);
  const { items, start } = useDialogueEngine(lang, goEnd);

  const begin = useCallback(() => {
    setScreen("dialogue");
    start();
  }, [start]);

  const scrollTop = useCallback(() => setScreen("start"), []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (screen !== "end" || prefersReducedMotion()) return;
    let cancelConfetti = () => {};
    const timer = setTimeout(() => {
      cancelConfetti = fireConfettiCelebration();
    }, 500);
    return () => {
      clearTimeout(timer);
      cancelConfetti();
    };
  }, [screen]);

  return {
    theme,
    isDark,
    toggleTheme,
    lang,
    langLabel,
    cycleLang,
    t,
    screen,
    begin,
    scrollTop,
    items,
    modalOpen,
    openModal,
    closeModal,
  };
}
