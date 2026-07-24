import { useEffect, useRef, useState } from "react";
import tattoo from "../assets/tattoo-sun-moon.png";
import { trackEvent } from "../services/analytics";

export function EndScreen({ t, openModal, scrollTop }) {
  const chipRef = useRef(null);
  const [chipVisible, setChipVisible] = useState(true);

  // Run the shimmer only while the chip is in the viewport
  useEffect(() => {
    const node = chipRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setChipVisible(entry.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section className="absolute inset-0 flex animate-[screenIn_0.5s_ease-out_both] flex-col overflow-x-hidden overflow-y-auto px-0 pb-8 pt-[104px]">
      <img
        src={tattoo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[88px] h-[70px] w-[52px] -translate-x-1/2 object-contain opacity-45 dark:brightness-0 dark:invert"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[34%] top-[16%] h-[22px] w-4 animate-[floaty_6s_ease-in-out_infinite] rounded-[3px] bg-brand-yellow opacity-85 [--r:-18deg]"
        style={{ transform: "rotate(-18deg)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[62%] top-[22%] h-[22px] w-4 rotate-[20deg] rounded-[3px] bg-brand-yellow opacity-85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[22%] h-[14px] w-[14px] rounded-full bg-brand-pink opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[90%] top-[29%] h-3 w-3 rounded-full bg-brand-pink opacity-80"
      />
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="var(--deco-sage)"
        className="pointer-events-none absolute left-[44%] top-[30%] animate-[floaty_7s_ease-in-out_infinite] opacity-85 [--r:14deg]"
      >
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
      </svg>
      <svg
        aria-hidden="true"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="var(--deco-sage)"
        className="pointer-events-none absolute left-[82%] top-[19%] opacity-85"
      >
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[13%] h-[14px] w-10 -rotate-[14deg] bg-brand-yellow opacity-80"
      />
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 30 30"
        fill="var(--brand-yellow)"
        className="pointer-events-none absolute left-[70%] top-[15%] opacity-80"
      >
        <path d="M15 0l2.3 6.3L22.5 2l-1.1 6.6L28 7.5l-4.3 5.2L30 15l-6.3 2.3L28 22.5l-6.6-1.1L22.5 28l-5.2-4.3L15 30l-2.3-6.3L7.5 28l1.1-6.6L2 22.5l4.3-5.2L0 15l6.3-2.3L2 7.5l6.6 1.1L7.5 2l5.2 4.3z" />
      </svg>

      <div className="relative z-10 mx-auto flex w-[min(560px,calc(100%-48px))] flex-1 flex-col items-center justify-center gap-[22px] text-center">
        <h2 className="m-0 animate-[fadeRise_0.55s_ease-out_both] font-script text-[clamp(52px,15vw,80px)] font-bold leading-none text-text-primary">
          {t.endDisplay}
        </h2>
        <div className="flex flex-col gap-0.5">
          {t.endText.map((line, index) => (
            <p key={index} className="m-0 font-script text-[clamp(24px,6.4vw,32px)] font-medium leading-[1.35] text-text-primary">
              {line}
            </p>
          ))}
        </div>
        <p className="m-0 mt-1.5 max-w-[20ch] font-script text-[clamp(24px,6.4vw,32px)] font-medium leading-[1.35] text-text-primary">
          {t.endClosing}
        </p>
        <div className="mt-3.5">
          {/* The shimmer is the button's own background layer, not an overlay
              element: a background can never paint over the label or clip it,
              no matter how the browser composites the animation. */}
          <button
            type="button"
            ref={chipRef}
            onClick={openModal}
            style={{ animation: chipVisible ? undefined : "none" }}
            className="relative cursor-pointer rounded-full border-2 border-border-primary bg-bg-surface bg-[linear-gradient(105deg,transparent_20%,var(--shimmer)_50%,transparent_80%)] bg-no-repeat [background-size:45%_100%] [background-position:-100%_0] animate-[shimmerSlide_3.2s_ease-in-out_infinite] px-6 py-2 font-script text-[clamp(23px,5.6vw,28px)] font-bold leading-[1.1] text-text-primary shadow-[2px_2px_0_0_var(--border-primary)] transition-transform duration-100 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1px_1px_0_0_var(--border-primary)]"
          >
            {t.chip}
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-[min(560px,calc(100%-48px))]">
        <div className="mb-[18px] flex justify-end">
          <button
            type="button"
            onClick={scrollTop}
            aria-label={t.aria.top}
            className="flex h-11 w-11 items-center justify-center cursor-pointer rounded-full border-none bg-transparent text-lg font-bold text-text-primary shadow-[inset_0_0_0_2.5px_var(--border-primary)] md:h-12 md:w-12"
          >
            ↑
          </button>
        </div>
        <div className="h-px bg-text-secondary opacity-50" />
        <div className="mt-5 flex justify-center gap-3">
          <a
            href="https://www.figma.com/design/8w9zFTa2Sfd2ULZg7ZMf2m/Letta-s-Birthday-%E2%80%94-Design-System-Board?node-id=0-1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("link_click", { destination: "figma" })}
            className="inline-block rounded-full border-2 border-border-primary bg-bg-surface px-[18px] py-[7px] font-sans text-sm font-semibold text-text-primary no-underline shadow-[2px_2px_0_0_var(--border-primary)] transition-transform duration-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_var(--border-primary)]"
          >
            Figma ↗
          </a>
          <a
            href="https://github.com/thefiltitoff/letta25"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("link_click", { destination: "github" })}
            className="inline-block rounded-full border-2 border-border-primary bg-bg-surface px-[18px] py-[7px] font-sans text-sm font-semibold text-text-primary no-underline shadow-[2px_2px_0_0_var(--border-primary)] transition-transform duration-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_var(--border-primary)]"
          >
            GitHub ↗
          </a>
        </div>
        <p className="mt-[18px] text-center font-script text-[19px] font-medium text-text-secondary">
          Designed and Created by Felix for Letta 💛
        </p>
      </div>
    </section>
  );
}
