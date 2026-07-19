import { act, render } from "@testing-library/react";
import { DialogueScreen } from "../DialogueScreen";
import { mockMatchMedia } from "../../testUtils";

const bubble = { key: "bub1", kind: "bubble", lines: ["a line"] };
const indicator = { key: "ind2", kind: "indicator", leaving: false };
const button = { key: "btn1", kind: "button", label: "go", cta: false, done: false, onClick: jest.fn() };

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("DialogueScreen", () => {
  it("announces new items politely and renders every item kind", () => {
    const { container, getByRole } = render(
      <DialogueScreen items={[bubble, indicator, button]} />
    );
    const feed = container.querySelector('[aria-live="polite"]');
    expect(feed).toBeInTheDocument();
    expect(container.querySelector(".sr-only").textContent).toBe("a line");
    expect(container.querySelectorAll('[aria-live="polite"] [aria-hidden="true"]').length).toBeGreaterThan(0);
    expect(getByRole("button", { name: "go" })).toBeInTheDocument();
  });

  it("auto-scrolls smoothly to the newest item", () => {
    const scrollTo = jest.spyOn(Element.prototype, "scrollTo");
    render(<DialogueScreen items={[bubble]} />);
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
  });

  it("scrolls instantly under prefers-reduced-motion (spec §7.7)", () => {
    mockMatchMedia({ reduce: true });
    const scrollTo = jest.spyOn(Element.prototype, "scrollTo");
    render(<DialogueScreen items={[bubble]} />);
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "auto" }));
  });

  it("does not scroll while the dialogue is empty", () => {
    const scrollTo = jest.spyOn(Element.prototype, "scrollTo");
    render(<DialogueScreen items={[]} />);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("snaps the rest of the way if the smooth scroll stalls", async () => {
    const scrollTo = jest.spyOn(Element.prototype, "scrollTo");
    const { container } = render(<DialogueScreen items={[bubble]} />);
    const section = container.querySelector("section");
    Object.defineProperty(section, "scrollHeight", { value: 1000, configurable: true });
    Object.defineProperty(section, "clientHeight", { value: 400, configurable: true });

    scrollTo.mockClear();
    await act(async () => {
      jest.advanceTimersByTime(700);
    });
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000 });
  });
});
