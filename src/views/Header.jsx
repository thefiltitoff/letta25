import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";

const toggleBtnClass =
  "flex h-12 w-12 items-center justify-center rounded-full border-none bg-bg-surface shadow-[inset_0_0_0_3px_var(--border-primary),3px_3px_0_0_var(--border-primary)] md:h-[52px] md:w-[52px] " +
  "transition-transform duration-75 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[inset_0_0_0_3px_var(--border-primary),1.5px_1.5px_0_0_var(--border-primary)]";

export function Header({ isDark, toggleTheme, langLabel, cycleLang, aria }) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-6">
      <div
        aria-label="Letta"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink font-script text-[30px] font-bold text-[#3C2E2A] shadow-[inset_0_0_0_3px_var(--border-primary),3px_3px_0_0_var(--border-primary)] md:h-16 md:w-16 md:text-[34px]"
      >
        Л
      </div>
      <div className="pointer-events-auto flex gap-3">
        <button type="button" onClick={toggleTheme} aria-label={aria.theme} className={`${toggleBtnClass} text-border-primary`}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          type="button"
          onClick={cycleLang}
          aria-label={aria.lang}
          className={`${toggleBtnClass} font-sans text-[15px] font-bold text-text-primary`}
        >
          {langLabel}
        </button>
      </div>
    </header>
  );
}
