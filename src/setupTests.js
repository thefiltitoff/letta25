// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement element scrolling
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  jest.restoreAllMocks();
  window.matchMedia = originalMatchMedia;
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  document.documentElement.removeAttribute("lang");
});
