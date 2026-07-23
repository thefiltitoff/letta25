import { useEffect, useRef } from "react";

export function Modal({ open, quote, sign, ariaLabel, closeLabel, onClose }) {
  const closeRef = useRef(null);

  // Focus trap: on open, focus moves to the close button — the only
  // focusable element of the card, and Tab stays on it; on close, focus
  // returns to the opener element (the chip).
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const trapTab = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      closeRef.current?.focus();
    }
  };

  return (
    <div
      onClick={onClose}
      onKeyDown={trapTab}
      className="absolute inset-0 z-[60] flex animate-[softIn_0.18s_ease-out_both] items-center justify-center bg-black/45 p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(event) => event.stopPropagation()}
        className="relative w-80 max-w-full animate-[fadeRise_0.24s_ease-out_both] rounded-[20px] border-[3px] border-border-primary bg-bg-surface px-[30px] py-8 shadow-[6px_6px_0_0_var(--border-primary)]"
      >
        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute -right-4 -top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-bg-surface font-sans text-[22px] font-semibold leading-none text-text-primary shadow-[inset_0_0_0_2.5px_var(--border-primary),2px_2px_0_0_var(--border-primary)]"
        >
          ×
        </button>
        <div className="flex flex-col gap-4">
          {quote.map((line, index) => (
            <p key={index} className="text-pretty m-0 font-sans text-base leading-[1.55] text-text-primary">
              {line}
            </p>
          ))}
        </div>
        <div className="mb-3.5 mt-[22px] h-0.5 w-[60px] bg-text-secondary" />
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm font-bold text-text-secondary">©</span>
          <span className="font-sans text-[15px] font-semibold text-text-primary">{sign}</span>
        </div>
      </div>
    </div>
  );
}
