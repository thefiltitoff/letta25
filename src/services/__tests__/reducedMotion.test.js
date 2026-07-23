import { prefersReducedMotion } from "../reducedMotion";
import { mockMatchMedia, unsetMatchMedia } from "../../testUtils";

describe("prefersReducedMotion", () => {
  it("is true when the user requests reduced motion", () => {
    mockMatchMedia({ reduce: true });
    expect(prefersReducedMotion()).toBe(true);
  });

  it("is false otherwise", () => {
    mockMatchMedia({ reduce: false });
    expect(prefersReducedMotion()).toBe(false);
  });

  it("is false when matchMedia is unavailable", () => {
    unsetMatchMedia();
    expect(prefersReducedMotion()).toBe(false);
  });
});
