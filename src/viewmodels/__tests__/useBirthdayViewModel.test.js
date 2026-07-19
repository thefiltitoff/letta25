import { act, renderHook } from "@testing-library/react";
import { useBirthdayViewModel } from "../useBirthdayViewModel";
import { useDialogueEngine } from "../useDialogueEngine";
import { fireConfettiCelebration } from "../../services/confetti";
import { translations } from "../../models/translations";
import { mockMatchMedia } from "../../testUtils";

// The dialogue engine and the confetti service are mocked: this file tests
// how the composing viewmodel wires the layers together, not their internals.
jest.mock("../useDialogueEngine");
jest.mock("../../services/confetti");

let engineStart;
let engineOnEnd;
let confettiCancel;

beforeEach(() => {
  jest.useFakeTimers();
  engineStart = jest.fn();
  useDialogueEngine.mockImplementation((lang, onEnd) => {
    engineOnEnd = onEnd;
    return { items: [], start: engineStart };
  });
  confettiCancel = jest.fn();
  fireConfettiCelebration.mockReturnValue(confettiCancel);
});

afterEach(() => {
  jest.useRealTimers();
});

describe("useBirthdayViewModel — screens", () => {
  it("starts on the start screen with the modal closed", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    expect(result.current.screen).toBe("start");
    expect(result.current.modalOpen).toBe(false);
  });

  it("begin() switches to the dialogue and starts the engine", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    act(() => result.current.begin());
    expect(result.current.screen).toBe("dialogue");
    expect(engineStart).toHaveBeenCalledTimes(1);
  });

  it("the engine's onEnd moves to the end screen", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    act(() => result.current.begin());
    act(() => engineOnEnd());
    expect(result.current.screen).toBe("end");
  });

  it("scrollTop() returns to the start screen", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    act(() => result.current.begin());
    act(() => engineOnEnd());
    act(() => result.current.scrollTop());
    expect(result.current.screen).toBe("start");
  });

  it("passes the current language to the engine", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    expect(useDialogueEngine).toHaveBeenLastCalledWith("ru", expect.any(Function));
    act(() => result.current.cycleLang());
    expect(useDialogueEngine).toHaveBeenLastCalledWith("sr", expect.any(Function));
  });
});

describe("useBirthdayViewModel — confetti on the end screen", () => {
  const goEnd = (result) => {
    act(() => result.current.begin());
    act(() => engineOnEnd());
  };

  it("fires confetti 500ms after entering the end screen", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    goEnd(result);
    act(() => jest.advanceTimersByTime(499));
    expect(fireConfettiCelebration).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(1));
    expect(fireConfettiCelebration).toHaveBeenCalledTimes(1);
  });

  it("cancels the celebration when leaving the end screen", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    goEnd(result);
    act(() => jest.advanceTimersByTime(500));
    act(() => result.current.scrollTop());
    expect(confettiCancel).toHaveBeenCalled();
  });

  it("does not fire at all if the user leaves within the 500ms delay", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    goEnd(result);
    act(() => jest.advanceTimersByTime(499));
    act(() => result.current.scrollTop());
    act(() => jest.advanceTimersByTime(2000));
    expect(fireConfettiCelebration).not.toHaveBeenCalled();
  });

  it("respects prefers-reduced-motion (spec §7.7)", () => {
    mockMatchMedia({ reduce: true });
    const { result } = renderHook(() => useBirthdayViewModel());
    goEnd(result);
    act(() => jest.advanceTimersByTime(2000));
    expect(fireConfettiCelebration).not.toHaveBeenCalled();
  });
});

describe("useBirthdayViewModel — modal and composition", () => {
  it("opens and closes the bonus modal", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    act(() => result.current.openModal());
    expect(result.current.modalOpen).toBe(true);
    act(() => result.current.closeModal());
    expect(result.current.modalOpen).toBe(false);
  });

  it("exposes the theme and language API to the view", () => {
    const { result } = renderHook(() => useBirthdayViewModel());
    expect(typeof result.current.toggleTheme).toBe("function");
    expect(typeof result.current.cycleLang).toBe("function");
    expect(typeof result.current.isDark).toBe("boolean");
    expect(result.current.t).toBe(translations[result.current.lang]);
  });
});
