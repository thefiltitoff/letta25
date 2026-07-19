// Grapheme segmentation (§6-bis): Intl.Segmenter correctly splits Cyrillic,
// Serbian ђ ћ џ љ њ ј, Czech diacritics and emoji; fallback splits by code points.
export function segmentGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

const MS_PER_GRAPHEME = 38; // spec range: 30–50ms per character
const MAX_LINE_MS = 1500; // 1.5s cap per paragraph (§6-bis)

export function lineTypingDuration(text) {
  return Math.min(MAX_LINE_MS, segmentGraphemes(text).length * MS_PER_GRAPHEME);
}
