import { lineTypingDuration, segmentGraphemes } from "../typewriter";

// Spec §6-bis: grapheme-correct segmentation for Cyrillic, Czech diacritics and emoji.
describe("segmentGraphemes", () => {
  it("splits plain Cyrillic into single characters", () => {
    expect(segmentGraphemes("привет")).toEqual(["п", "р", "и", "в", "е", "т"]);
  });

  it("splits Czech diacritics correctly", () => {
    expect(segmentGraphemes("český")).toEqual(["č", "e", "s", "k", "ý"]);
  });

  it("keeps a base letter with a combining mark as one grapheme", () => {
    expect(segmentGraphemes("z\u0301")).toHaveLength(1);
  });

  it("keeps an emoji as one grapheme", () => {
    expect(segmentGraphemes("🙂")).toHaveLength(1);
  });

  it("returns an empty array for an empty string", () => {
    expect(segmentGraphemes("")).toEqual([]);
  });
});

// Spec §6-bis: 30–50ms per character (I use 38), capped at 1.5s per paragraph.
describe("lineTypingDuration", () => {
  it("scales at 38ms per grapheme", () => {
    expect(lineTypingDuration("abc")).toBe(3 * 38);
  });

  it("caps at 1500ms for long paragraphs", () => {
    expect(lineTypingDuration("x".repeat(200))).toBe(1500);
  });

  it("counts graphemes, not code units", () => {
    expect(lineTypingDuration("🙂🙂")).toBe(2 * 38);
  });
});
