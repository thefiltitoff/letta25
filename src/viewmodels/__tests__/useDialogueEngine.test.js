import { act, renderHook } from "@testing-library/react";
import { useDialogueEngine } from "../useDialogueEngine";
import {
  buttonLabelOf,
  dialogueNodes,
  indicatorDuration,
  linesOf,
} from "../../models/dialogueNodes";
import { lineTypingDuration } from "../../models/typewriter";
import { mockMatchMedia } from "../../testUtils";

// All expected timings are computed from the models, not hardcoded copy,
// so editing the dialogue texts must not break these tests.

const ru = (i) => linesOf(dialogueNodes[i], "ru");

const adv = async (ms) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

const flush = async () => {
  await act(async () => {});
};

const bubbles = (items) => items.filter((it) => it.kind === "bubble");
const indicators = (items) => items.filter((it) => it.kind === "indicator");
const buttons = (items) => items.filter((it) => it.kind === "button");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

function renderEngine(onEnd = jest.fn(), lang = "ru") {
  const utils = renderHook(({ l }) => useDialogueEngine(l, onEnd), {
    initialProps: { l: lang },
  });
  return { ...utils, onEnd };
}

describe("useDialogueEngine — bubble cycle timings", () => {
  it("plays the opening sequence with the expected timings", async () => {
    const { result } = renderEngine();
    act(() => result.current.start());

    // Initial 550ms beat before the first bubble.
    await adv(549);
    expect(result.current.items).toHaveLength(0);
    await adv(1);
    expect(bubbles(result.current.items)).toHaveLength(1);
    expect(result.current.items[0].lines).toEqual([ru(0)[0]]);

    // Reply button appears 320ms after the line finishes typing.
    await adv(lineTypingDuration(ru(0)[0]));
    await adv(319);
    expect(buttons(result.current.items)).toHaveLength(0);
    await adv(1);
    const btn = buttons(result.current.items)[0];
    expect(btn.label).toBe(buttonLabelOf(dialogueNodes[0], "ru"));
    expect(btn.done).toBe(false);
    expect(btn.cta).toBe(false);

    // Tap: the button freezes as done and the next node starts immediately.
    act(() => btn.onClick());
    await flush();
    expect(buttons(result.current.items)[0].done).toBe(true);
    expect(bubbles(result.current.items)).toHaveLength(2);

    // Node 2 has no button: 520ms gap, then node 3 shows its typing indicator.
    await adv(lineTypingDuration(ru(1)[0]));
    await adv(519);
    expect(indicators(result.current.items)).toHaveLength(0);
    await adv(1);
    expect(indicators(result.current.items)).toHaveLength(1);
    expect(indicators(result.current.items)[0].leaving).toBe(false);

    // Indicator lives for indicatorDuration, then fades out for 150ms.
    const idur = indicatorDuration(dialogueNodes[2], "ru");
    await adv(idur - 1);
    expect(indicators(result.current.items)[0].leaving).toBe(false);
    await adv(1);
    expect(indicators(result.current.items)[0].leaving).toBe(true);
    await adv(150);
    expect(indicators(result.current.items)).toHaveLength(0);
    expect(bubbles(result.current.items)).toHaveLength(3);

    // Stitched lines: the second line lands after typing + a 1000ms pause.
    const bubble3 = () => bubbles(result.current.items)[2];
    expect(bubble3().lines).toHaveLength(1);
    await adv(lineTypingDuration(ru(2)[0]));
    await adv(999);
    expect(bubble3().lines).toHaveLength(1);
    await adv(1);
    expect(bubble3().lines).toHaveLength(2);
    expect(bubble3().lines).toEqual(ru(2).slice(0, 2));
  });
});

describe("useDialogueEngine — full playthrough", () => {
  it("shows 18 bubbles, 14 indicators, 4 buttons and calls onEnd", async () => {
    const { result, onEnd } = renderEngine();
    act(() => result.current.start());

    const seenIndicators = new Set();
    for (let i = 0; i < 1500 && onEnd.mock.calls.length === 0; i++) {
      await adv(250);
      for (const ind of indicators(result.current.items)) seenIndicators.add(ind.key);
      const btn = buttons(result.current.items).find((b) => !b.done);
      if (btn) {
        act(() => btn.onClick());
        await flush();
      }
    }

    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(bubbles(result.current.items)).toHaveLength(dialogueNodes.length);
    expect(buttons(result.current.items)).toHaveLength(4);
    expect(buttons(result.current.items).every((b) => b.done)).toBe(true);
    expect(seenIndicators.size).toBe(14);

    // The last button is the CTA.
    const last = buttons(result.current.items)[3];
    expect(last.cta).toBe(true);
  });
});

describe("useDialogueEngine — restart", () => {
  it("start() resets the history and replays from the first bubble", async () => {
    const { result } = renderEngine();
    act(() => result.current.start());
    await adv(5000);
    expect(result.current.items.length).toBeGreaterThan(0);

    act(() => result.current.start());
    expect(result.current.items).toHaveLength(0);
    await adv(550);
    expect(bubbles(result.current.items)).toHaveLength(1);
    expect(result.current.items[0].lines).toEqual([ru(0)[0]]);
  });
});

describe("useDialogueEngine — prefers-reduced-motion", () => {
  it("skips indicators and pauses, showing full bubbles instantly", async () => {
    mockMatchMedia({ reduce: true });
    const { result, onEnd } = renderEngine();
    act(() => result.current.start());
    await flush();

    // Everything up to the first button renders without any timers.
    expect(bubbles(result.current.items)).toHaveLength(1);
    expect(result.current.items[0].lines).toEqual(ru(0));
    expect(indicators(result.current.items)).toHaveLength(0);
    expect(buttons(result.current.items)).toHaveLength(1);

    // Tapping through all four buttons completes the dialogue instantly.
    for (let i = 0; i < 4; i++) {
      const btn = buttons(result.current.items).find((b) => !b.done);
      expect(btn).toBeDefined();
      act(() => btn.onClick());
      await flush();
      expect(indicators(result.current.items)).toHaveLength(0);
    }
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(bubbles(result.current.items)).toHaveLength(dialogueNodes.length);
  });
});

describe("useDialogueEngine — language switching mid-flow", () => {
  it("retranslates already shown items without resetting progress", async () => {
    const { result, rerender } = renderEngine();
    act(() => result.current.start());
    await adv(550);
    expect(result.current.items[0].lines).toEqual([ru(0)[0]]);
    const count = result.current.items.length;

    rerender({ l: "en" });
    expect(result.current.items).toHaveLength(count);
    expect(result.current.items[0].lines).toEqual([linesOf(dialogueNodes[0], "en")[0]]);
  });

  it("retranslates visible reply buttons", async () => {
    const { result, rerender } = renderEngine();
    act(() => result.current.start());
    await adv(550);
    await adv(lineTypingDuration(ru(0)[0]));
    await adv(320);
    expect(buttons(result.current.items)[0].label).toBe(buttonLabelOf(dialogueNodes[0], "ru"));

    rerender({ l: "en" });
    expect(buttons(result.current.items)[0].label).toBe(buttonLabelOf(dialogueNodes[0], "en"));
  });
});
