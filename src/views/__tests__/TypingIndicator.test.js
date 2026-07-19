import { render } from "@testing-library/react";
import { TypingIndicator } from "../TypingIndicator";

describe("TypingIndicator", () => {
  it("is hidden from screen readers (decorative, spec §11)", () => {
    const { container } = render(<TypingIndicator />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders three bouncing dots (spec §7.3)", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll("span");
    expect(dots).toHaveLength(3);
    for (const dot of dots) {
      expect(dot.className).toContain("dotBounce_0.9s");
    }
  });

  it("fades in for 150ms and fades out for 150ms when leaving (spec §7.1)", () => {
    const { container, rerender } = render(<TypingIndicator leaving={false} />);
    expect(container.firstChild.className).toContain("softIn_0.15s");
    rerender(<TypingIndicator leaving={true} />);
    expect(container.firstChild.className).toContain("softOut_0.15s");
  });
});
