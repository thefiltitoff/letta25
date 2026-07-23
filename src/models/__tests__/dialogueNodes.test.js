import {
  LANGS,
  buttonLabelOf,
  dialogueNodes,
  indicatorDuration,
  linesOf,
} from "../dialogueNodes";

// Source of truth: 18 bubbles / 14 indicators / 4 buttons / 0 branching.
describe("dialogue structure invariants", () => {
  it("has exactly 18 nodes with unique sequential ids", () => {
    expect(dialogueNodes).toHaveLength(18);
    expect(dialogueNodes.map((node) => node.id)).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 1)
    );
  });

  it("has exactly 14 nodes with a typing indicator", () => {
    expect(dialogueNodes.filter((n) => n.indicator)).toHaveLength(14);
  });

  it("has exactly 4 nodes with a reply button", () => {
    expect(dialogueNodes.filter((n) => n.button)).toHaveLength(4);
  });

  it("has no branching: every button is 'next' except the final 'end'", () => {
    const buttonNodes = dialogueNodes.filter((n) => n.button);
    const last = buttonNodes[buttonNodes.length - 1];
    expect(last).toBe(dialogueNodes[dialogueNodes.length - 1]);
    expect(last.action).toBe("end");
    for (const node of buttonNodes.slice(0, -1)) {
      expect(node.action).toBe("next");
    }
  });

  it("every node has non-empty Russian lines and only known languages", () => {
    for (const node of dialogueNodes) {
      expect(Array.isArray(node.lines.ru)).toBe(true);
      expect(node.lines.ru.length).toBeGreaterThan(0);
      for (const line of node.lines.ru) {
        expect(typeof line).toBe("string");
        expect(line.length).toBeGreaterThan(0);
      }
      for (const key of Object.keys(node.lines)) {
        expect(LANGS).toContain(key);
      }
      if (node.button) {
        expect(typeof node.button.ru).toBe("string");
        for (const key of Object.keys(node.button)) {
          expect(LANGS).toContain(key);
        }
      }
    }
  });

  it("declares the four supported languages", () => {
    expect(LANGS).toEqual(["ru", "sr", "cs", "en"]);
  });
});

describe("linesOf", () => {
  const node = { lines: { ru: ["ru-line"], en: ["en-line"] } };

  it("returns the requested language", () => {
    expect(linesOf(node, "en")).toEqual(["en-line"]);
  });

  it("falls back to Russian when the language is missing", () => {
    expect(linesOf(node, "cs")).toEqual(["ru-line"]);
  });
});

describe("buttonLabelOf", () => {
  const node = { button: { ru: "ru-label", en: "en-label" } };

  it("returns the requested language", () => {
    expect(buttonLabelOf(node, "en")).toBe("en-label");
  });

  it("falls back to Russian when the language is missing", () => {
    expect(buttonLabelOf(node, "sr")).toBe("ru-label");
  });

  it("returns an empty string for a node without a button", () => {
    expect(buttonLabelOf({ lines: { ru: ["x"] } }, "ru")).toBe("");
  });
});

// 30ms per character of the upcoming text, clamped to 900–1500ms.
describe("indicatorDuration", () => {
  const nodeWith = (text) => ({ lines: { ru: [text] } });

  it("clamps short texts to the 900ms floor", () => {
    expect(indicatorDuration(nodeWith("hi"), "ru")).toBe(900);
  });

  it("scales at 30ms per character in the middle of the range", () => {
    const text = "x".repeat(40);
    expect(indicatorDuration(nodeWith(text), "ru")).toBe(40 * 30);
  });

  it("clamps long texts to the 1500ms ceiling", () => {
    const text = "x".repeat(200);
    expect(indicatorDuration(nodeWith(text), "ru")).toBe(1500);
  });

  it("measures the text of the requested language", () => {
    const node = { lines: { ru: ["x".repeat(40)], en: ["y".repeat(45)] } };
    expect(indicatorDuration(node, "en")).toBe(45 * 30);
  });

  it("stays within 900–1500ms for every real node and language", () => {
    for (const node of dialogueNodes) {
      for (const lang of LANGS) {
        const duration = indicatorDuration(node, lang);
        expect(duration).toBeGreaterThanOrEqual(900);
        expect(duration).toBeLessThanOrEqual(1500);
      }
    }
  });
});
