import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "../Modal";

const QUOTE = ["first line", "second line"];

function renderModal(props = {}) {
  return render(
    <Modal
      open={true}
      quote={QUOTE}
      sign="signature"
      ariaLabel="bonus"
      closeLabel="close"
      onClose={jest.fn()}
      {...props}
    />
  );
}

describe("Modal", () => {
  it("renders nothing while closed", () => {
    renderModal({ open: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is a labelled aria-modal dialog with the quote and signature", () => {
    renderModal();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "bonus");
    for (const line of QUOTE) expect(screen.getByText(line)).toBeInTheDocument();
    expect(screen.getByText("signature")).toBeInTheDocument();
  });

  it("moves focus to the close button on open (spec §11)", () => {
    renderModal();
    expect(screen.getByRole("button", { name: "close" })).toHaveFocus();
  });

  it("traps Tab on the close button (spec §11)", () => {
    renderModal();
    const close = screen.getByRole("button", { name: "close" });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Tab" });
    expect(close).toHaveFocus();
  });

  it("closes on Escape (spec §11)", () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not listen for Escape while closed", () => {
    const onClose = jest.fn();
    renderModal({ open: false, onClose });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on overlay tap but not on card tap (spec §13.4 default)", () => {
    const onClose = jest.fn();
    const { container } = renderModal({ onClose });
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(container.firstChild);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("returns focus to the opener on close (spec §11)", () => {
    const { rerender } = render(
      <div>
        <button type="button">opener</button>
        <Modal open={false} quote={QUOTE} sign="s" ariaLabel="b" closeLabel="close" onClose={jest.fn()} />
      </div>
    );
    const opener = screen.getByRole("button", { name: "opener" });
    opener.focus();

    rerender(
      <div>
        <button type="button">opener</button>
        <Modal open={true} quote={QUOTE} sign="s" ariaLabel="b" closeLabel="close" onClose={jest.fn()} />
      </div>
    );
    expect(screen.getByRole("button", { name: "close" })).toHaveFocus();

    rerender(
      <div>
        <button type="button">opener</button>
        <Modal open={false} quote={QUOTE} sign="s" ariaLabel="b" closeLabel="close" onClose={jest.fn()} />
      </div>
    );
    expect(opener).toHaveFocus();
  });
});
