import { applyLanguageToDocument } from "../language";

describe("applyLanguageToDocument", () => {
  it("sets the document language attribute", () => {
    applyLanguageToDocument("cs");
    expect(document.documentElement.lang).toBe("cs");
    applyLanguageToDocument("ru");
    expect(document.documentElement.lang).toBe("ru");
  });
});
