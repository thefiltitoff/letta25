import confetti from "canvas-confetti";
import { fireConfettiCelebration } from "../confetti";

jest.mock("canvas-confetti", () => jest.fn());

beforeEach(() => {
  jest.useFakeTimers();
  confetti.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("fireConfettiCelebration", () => {
  it("fires the central burst below the modal overlay (z-index 50)", () => {
    fireConfettiCelebration();
    expect(confetti).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        particleCount: 130,
        spread: 95,
        startVelocity: 42,
        origin: { y: 0.42 },
        zIndex: 50,
        colors: expect.any(Array),
      })
    );
  });

  it("streams side jets from both edges", () => {
    fireConfettiCelebration();
    // The first frame runs synchronously: one jet per edge.
    const sideCalls = confetti.mock.calls.slice(1).map(([args]) => args);
    expect(sideCalls).toHaveLength(2);
    expect(sideCalls[0]).toMatchObject({ angle: 60, origin: { x: 0, y: 0.6 }, zIndex: 50 });
    expect(sideCalls[1]).toMatchObject({ angle: 120, origin: { x: 1, y: 0.6 }, zIndex: 50 });
  });

  it("keeps streaming for ~900ms and then stops", () => {
    fireConfettiCelebration();
    jest.advanceTimersByTime(900);
    const afterStream = confetti.mock.calls.length;
    expect(afterStream).toBeGreaterThan(3);
    jest.advanceTimersByTime(2000);
    // One trailing frame may still fire at the boundary, then the loop stops.
    expect(confetti.mock.calls.length - afterStream).toBeLessThanOrEqual(2);
  });

  it("returns a cancel function that stops the stream", () => {
    const cancel = fireConfettiCelebration();
    const before = confetti.mock.calls.length;
    cancel();
    jest.advanceTimersByTime(2000);
    expect(confetti.mock.calls.length).toBe(before);
  });

  it("uses the active theme tokens when available", () => {
    jest.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: (name) =>
        ({ "--brand-pink": " #ff0001 ", "--brand-yellow": "#ff0002", "--deco-sage": "#ff0003" }[
          name
        ] || ""),
    });
    fireConfettiCelebration();
    expect(confetti.mock.calls[0][0].colors).toEqual(["#ff0001", "#ff0002", "#ff0003"]);
  });

  it("falls back to the static palette when tokens are missing", () => {
    jest.spyOn(window, "getComputedStyle").mockReturnValue({ getPropertyValue: () => "" });
    fireConfettiCelebration();
    const colors = confetti.mock.calls[0][0].colors;
    expect(colors).toHaveLength(5);
    for (const c of colors) expect(c).toMatch(/^#/);
  });
});
