import { act, render } from "@testing-library/react";
import { TypewriterLine } from "../TypewriterLine";
import { lineTypingDuration } from "../../models/typewriter";
import { mockMatchMedia } from "../../testUtils";

const TEXT = "какой-то достаточно длинный текст для теста";
const TEXT2 = "совсем другой текст";

const srText = (container) => container.querySelector(".sr-only").textContent;
const typedText = (container) => {
  const overlay = container.querySelector('[aria-hidden="true"]');
  return overlay.lastChild.textContent;
};
const placeholderText = (container) =>
  container.querySelector('[aria-hidden="true"]').firstChild.textContent;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("TypewriterLine", () => {
  it("always exposes the full text to screen readers", () => {
    const { container } = render(<TypewriterLine text={TEXT} />);
    expect(srText(container)).toBe(TEXT);
    expect(typedText(container)).toBe("");
  });

  it("reserves the final line size with an invisible copy", () => {
    const { container } = render(<TypewriterLine text={TEXT} />);
    expect(placeholderText(container)).toBe(TEXT);
  });

  it("types progressively and finishes within the model duration", async () => {
    const { container } = render(<TypewriterLine text={TEXT} />);
    const total = lineTypingDuration(TEXT);

    await act(async () => {
      jest.advanceTimersByTime(Math.floor(total / 2));
    });
    const midway = typedText(container).length;
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(TEXT.length);

    await act(async () => {
      jest.advanceTimersByTime(total);
    });
    expect(typedText(container)).toBe(TEXT);
  });

  it("shows the full text instantly under prefers-reduced-motion", () => {
    mockMatchMedia({ reduce: true });
    const { container } = render(<TypewriterLine text={TEXT} />);
    expect(typedText(container)).toBe(TEXT);
  });

  it("swaps a finished line instantly on language change", async () => {
    const { container, rerender } = render(<TypewriterLine text={TEXT} />);
    await act(async () => {
      jest.advanceTimersByTime(lineTypingDuration(TEXT) + 100);
    });
    expect(typedText(container)).toBe(TEXT);

    rerender(<TypewriterLine text={TEXT2} />);
    expect(typedText(container)).toBe(TEXT2);
    expect(srText(container)).toBe(TEXT2);
  });

  it("restarts typing when the text changes mid-typing", async () => {
    const { container, rerender } = render(<TypewriterLine text={TEXT} />);
    await act(async () => {
      jest.advanceTimersByTime(Math.floor(lineTypingDuration(TEXT) / 2));
    });

    rerender(<TypewriterLine text={TEXT2} />);
    expect(typedText(container)).toBe("");
    await act(async () => {
      jest.advanceTimersByTime(lineTypingDuration(TEXT2) + 100);
    });
    expect(typedText(container)).toBe(TEXT2);
  });
});
