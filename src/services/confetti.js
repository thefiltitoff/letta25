import confetti from "canvas-confetti";

const FALLBACK_COLORS = ["#F9C1BB", "#FBF04D", "#A9B79B", "#EEB3B0", "#FFD84D"];

// Below the modal overlay (z-60), above the content and header (z-10/z-40)
const CONFETTI_Z_INDEX = 50;

// Colors come from the active theme tokens (design system §2.4), with a static palette fallback
function themedColors() {
  const styles = getComputedStyle(document.documentElement);
  const colors = ["--brand-pink", "--brand-yellow", "--deco-sage"]
    .map((name) => styles.getPropertyValue(name).trim())
    .filter(Boolean);
  return colors.length === 3 ? colors : FALLBACK_COLORS;
}

// One burst at the center + ~900ms of side streams at the edges — ports fireConfetti()
// from the original dc.html. Returns a cancel function for cleanup on unmount.
export function fireConfettiCelebration() {
  if (typeof window === "undefined" || !confetti) return () => {};
  const palette = themedColors();

  confetti({
    particleCount: 130,
    spread: 95,
    startVelocity: 42,
    origin: { y: 0.42 },
    colors: palette,
    zIndex: CONFETTI_Z_INDEX,
  });

  const end = Date.now() + 900;
  let frameId;
  let cancelled = false;

  const frame = () => {
    if (cancelled) return;
    confetti({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0, y: 0.6 }, colors: palette, zIndex: CONFETTI_Z_INDEX });
    confetti({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1, y: 0.6 }, colors: palette, zIndex: CONFETTI_Z_INDEX });
    if (Date.now() < end) frameId = requestAnimationFrame(frame);
  };
  frame();

  return () => {
    cancelled = true;
    if (frameId) cancelAnimationFrame(frameId);
  };
}
