import { act, fireEvent, render, screen } from "@testing-library/react";
import { EndScreen } from "../EndScreen";
import { translations } from "../../models/translations";

const t = translations.ru;

class MockIntersectionObserver {
  constructor(cb) {
    this.cb = cb;
    MockIntersectionObserver.last = this;
  }
  observe() {}
  disconnect() {}
}

let originalIO;

beforeEach(() => {
  originalIO = global.IntersectionObserver;
  global.IntersectionObserver = MockIntersectionObserver;
});

afterEach(() => {
  global.IntersectionObserver = originalIO;
});

function renderEnd(props = {}) {
  return render(<EndScreen t={t} openModal={jest.fn()} scrollTop={jest.fn()} {...props} />);
}

describe("EndScreen", () => {
  it("opens the bonus modal from the chip", () => {
    const openModal = jest.fn();
    renderEnd({ openModal });
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.chip) }));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  it("returns to the top from the ↑ arrow", () => {
    const scrollTop = jest.fn();
    renderEnd({ scrollTop });
    fireEvent.click(screen.getByRole("button", { name: t.aria.top }));
    expect(scrollTop).toHaveBeenCalledTimes(1);
  });

  it("pauses the chip shimmer while the chip is off-screen (spec §7.5)", () => {
    renderEnd();
    const chip = screen.getByRole("button", { name: new RegExp(t.chip) });
    expect(chip.style.animation).not.toBe("none");

    act(() => MockIntersectionObserver.last.cb([{ isIntersecting: false }]));
    expect(chip.style.animation).toBe("none");

    act(() => MockIntersectionObserver.last.cb([{ isIntersecting: true }]));
    expect(chip.style.animation).not.toBe("none");
  });

  it("renders the footer links as placeholder anchors (spec §13.1 default)", () => {
    renderEnd();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute("href", "#");
  });
});
