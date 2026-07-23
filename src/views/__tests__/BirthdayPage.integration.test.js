import { act, fireEvent, render, screen } from "@testing-library/react";
import confetti from "canvas-confetti";
import { BirthdayPage } from "../BirthdayPage";
import { buttonLabelOf, dialogueNodes, linesOf } from "../../models/dialogueNodes";
import { translations } from "../../models/translations";

jest.mock("canvas-confetti", () => jest.fn());

// End-to-end use-case flow through the real view → viewmodel → model/service
// stack. All expected strings come from the models, never hardcoded, so copy
// edits don't break the suite.

const adv = async (ms) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

// Step virtual time until a condition holds. 200ms steps comfortably sample
// every phase (shortest is the 150ms indicator fade, which we don't await here).
const until = async (cond, cap = 600) => {
  for (let i = 0; i < cap; i++) {
    if (cond()) return;
    await adv(200);
  }
  throw new Error("condition was not reached within the time budget");
};

const srTexts = (container) =>
  [...container.querySelectorAll(".sr-only")].map((el) => el.textContent);

const enabledButton = (label) => {
  const btn = screen.queryByRole("button", { name: label });
  return btn && !btn.disabled ? btn : null;
};

beforeEach(() => {
  jest.useFakeTimers();
  confetti.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("BirthdayPage — full use-case flow", () => {
  it("plays the whole experience end to end", async () => {
    const { container } = render(<BirthdayPage />);
    let t = translations.ru;

    // UC1: landing on the start screen with the persistent header.
    expect(screen.getByRole("button", { name: t.startBtn })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.aria.theme })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.aria.lang })).toHaveTextContent("RU");

    // UC6: theme toggling works at any point and persists.
    const themeToggle = screen.getByRole("button", { name: t.aria.theme });
    expect(document.documentElement.dataset.theme).toBe("light");
    fireEvent.click(themeToggle);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    fireEvent.click(themeToggle);
    expect(document.documentElement.dataset.theme).toBe("light");

    // UC7 (before the flow): the language chip cycles all four languages.
    const langChip = () => screen.getByRole("button", { name: t.aria.lang });
    fireEvent.click(langChip());
    t = translations.sr;
    expect(document.documentElement.lang).toBe("sr");
    expect(screen.getByRole("button", { name: t.startBtn })).toBeInTheDocument();
    for (const lang of ["cs", "en", "ru"]) {
      fireEvent.click(langChip());
      t = translations[lang];
      expect(document.documentElement.lang).toBe(lang);
    }

    // UC2: "Begin" opens the dialogue and the first bubble arrives on its own.
    fireEvent.click(screen.getByRole("button", { name: t.startBtn }));
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
    const firstLine = linesOf(dialogueNodes[0], "ru")[0];
    await until(() => srTexts(container).includes(firstLine));

    // UC3: the first reply button advances the dialogue and freezes as done.
    const buttonNodes = dialogueNodes.filter((n) => n.button);
    const firstLabel = buttonLabelOf(buttonNodes[0], "ru");
    await until(() => enabledButton(firstLabel));
    fireEvent.click(enabledButton(firstLabel));
    expect(screen.getByRole("button", { name: firstLabel })).toBeDisabled();

    // UC7 (mid-flow): switching the language retranslates shown bubbles
    // without resetting the dialogue progress.
    const shownBefore = srTexts(container).length;
    fireEvent.click(langChip());
    t = translations.sr;
    expect(srTexts(container)).toHaveLength(shownBefore);
    expect(srTexts(container)).toContain(linesOf(dialogueNodes[0], "sr")[0]);
    for (const lang of ["cs", "en", "ru"]) {
      fireEvent.click(langChip());
      t = translations[lang];
    }

    // UC4: tapping through the remaining buttons reaches the end screen.
    for (const node of buttonNodes.slice(1)) {
      const label = buttonLabelOf(node, "ru");
      await until(() => enabledButton(label));
      fireEvent.click(enabledButton(label));
      // The engine advances in a microtask after the tap resolves.
      await act(async () => {});
    }
    expect(screen.getByText(t.endDisplay)).toBeInTheDocument();

    // Confetti celebrates the finale 500ms after arrival.
    expect(confetti).not.toHaveBeenCalled();
    await adv(500);
    expect(confetti).toHaveBeenCalled();

    // UC5: the chip opens the bonus modal; Escape closes it and returns focus.
    const chip = screen.getByRole("button", { name: new RegExp(t.chip) });
    // A real browser focuses the chip on click; fireEvent doesn't, so focus
    // explicitly — the modal must return focus here after closing.
    chip.focus();
    fireEvent.click(chip);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(chip).toHaveFocus();

    // UC8: the ↑ arrow returns to the start, and "Begin" replays from scratch.
    fireEvent.click(screen.getByRole("button", { name: t.aria.top }));
    expect(screen.getByRole("button", { name: t.startBtn })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: t.startBtn }));
    await until(() => srTexts(container).length > 0);
    expect(srTexts(container)).toEqual([firstLine]);
  }, 30000);
});
