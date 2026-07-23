// Shared test helpers. Lives outside __tests__ folders so CRA's Jest doesn't
// collect it as a test suite.

export function mockMatchMedia({ reduce = false, dark = false } = {}) {
  window.matchMedia = jest.fn((query) => ({
    matches: query.includes("prefers-reduced-motion")
      ? reduce
      : query.includes("prefers-color-scheme: dark")
      ? dark
      : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

export function unsetMatchMedia() {
  window.matchMedia = undefined;
}
