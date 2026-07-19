import { fireEvent, render, screen } from "@testing-library/react";
import { StartScreen } from "../StartScreen";
import { translations } from "../../models/translations";

const t = translations.ru;

describe("StartScreen", () => {
  it("starts the dialogue from the CTA button", () => {
    const begin = jest.fn();
    render(<StartScreen t={t} begin={begin} />);
    fireEvent.click(screen.getByRole("button", { name: t.startBtn }));
    expect(begin).toHaveBeenCalledTimes(1);
  });

  it("starts the dialogue from the scroll indicator arrow", () => {
    const begin = jest.fn();
    render(<StartScreen t={t} begin={begin} />);
    fireEvent.click(screen.getByRole("button", { name: t.aria.next }));
    expect(begin).toHaveBeenCalledTimes(1);
  });

  it("keeps decorative layers away from assistive tech (spec §11)", () => {
    const { container } = render(<StartScreen t={t} begin={jest.fn()} />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("aria-hidden", "true");
    expect(img).toHaveAttribute("alt", "");
    for (const el of container.querySelectorAll('[aria-hidden="true"]')) {
      expect(el.classList.contains("pointer-events-none")).toBe(true);
    }
  });
});
