import { useEffect, useRef } from "react";
import tattoo from "../assets/tattoo-sun-moon.png";
import { prefersReducedMotion } from "../services/reducedMotion";
import { TypingIndicator } from "./TypingIndicator";
import { MessageBubble } from "./MessageBubble";
import { ReplyButton } from "./ReplyButton";

export function DialogueScreen({ items }) {
  const dlgRef = useRef(null);

  // Keep the newest item in view as the dialogue grows.
  useEffect(() => {
    const el = dlgRef.current;
    if (!el || items.length === 0) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    // Safety net: if the smooth scroll didn't make it (lag / rAF throttling), snap the rest instantly
    const fallback = setTimeout(() => {
      if (el.scrollHeight - el.clientHeight - el.scrollTop > 4) {
        el.scrollTo({ top: el.scrollHeight });
      }
    }, 700);
    return () => clearTimeout(fallback);
  }, [items]);

  return (
    <section
      ref={dlgRef}
      className="absolute inset-0 animate-[screenIn_0.4s_ease-out_both] overflow-x-hidden overflow-y-auto px-0 pb-24 pt-[104px]"
    >
      <img
        src={tattoo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[5%] left-1/2 z-0 h-[80px] w-[60px] -translate-x-1/2 object-contain opacity-30 dark:brightness-0 dark:invert"
      />
      {/* Floating background decor (per the design prototype): the same shapes as on
          the Start screen, but muted (opacity .3–.5) and fixed — they don't scroll with the bubbles */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[7%] top-[27%] z-0 h-[14px] w-10 rotate-[16deg] animate-[floaty_7s_ease-in-out_infinite] bg-brand-pink opacity-40 [--r:16deg]"
      />
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--border-primary)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        className="pointer-events-none fixed left-[9%] top-[50%] z-0 animate-[floaty_8s_ease-in-out_infinite] opacity-30 [--r:8deg]"
      >
        <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[24%] left-[5%] z-0 h-[13px] w-7 rotate-[28deg] rounded-full bg-deco-sage opacity-45"
      />
      <svg
        aria-hidden="true"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--border-primary)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        className="pointer-events-none fixed left-[86%] top-[20%] z-0 animate-[floaty_6s_ease-in-out_infinite] opacity-30 [--r:-10deg]"
      >
        <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[88%] top-[35%] z-0 h-3 w-3 rounded-full bg-brand-pink opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[90%] top-[66%] z-0 h-[11px] w-[11px] animate-[floaty_9s_ease-in-out_infinite] rounded-full bg-brand-yellow opacity-40"
      />
      <div aria-live="polite" className="relative z-10 mx-auto flex w-[min(560px,calc(100%-48px))] flex-col gap-4">
        {items.map((item) => {
          if (item.kind === "indicator") return <TypingIndicator key={item.key} leaving={item.leaving} />;
          if (item.kind === "bubble") return <MessageBubble key={item.key} lines={item.lines} />;
          if (item.kind === "button") {
            return (
              <ReplyButton
                key={item.key}
                label={item.label}
                cta={item.cta}
                done={item.done}
                onClick={item.onClick}
              />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}
