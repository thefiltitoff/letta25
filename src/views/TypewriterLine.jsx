import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../services/reducedMotion";
import { lineTypingDuration, segmentGraphemes } from "../models/typewriter";

// Typewriter line of a bubble (§7.1.3): types grapheme by grapheme, anchored to
// real time (resilient to timer throttling). The full text is always in the DOM
// for screen readers; the per-character typing sits under aria-hidden (§11). The
// invisible full text reserves the final line size — the bubble doesn't jump while
// typing. Language switch mid-flow (§10): a finished line swaps instantly, a line
// still being typed restarts from scratch.
export function TypewriterLine({ text, className }) {
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? text : ""));
  const doneRef = useRef(prefersReducedMotion());

  useEffect(() => {
    if (doneRef.current) {
      setTyped(text);
      return;
    }
    const graphemes = segmentGraphemes(text);
    const total = lineTypingDuration(text);
    const step = Math.max(16, Math.round(total / Math.max(1, graphemes.length)));
    const startedAt = performance.now();
    setTyped("");
    const id = setInterval(() => {
      const shown = Math.min(graphemes.length, Math.floor((performance.now() - startedAt) / step) + 1);
      setTyped(graphemes.slice(0, shown).join(""));
      if (shown >= graphemes.length) {
        doneRef.current = true;
        clearInterval(id);
      }
    }, step);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">{typed}</span>
      </span>
    </p>
  );
}
