import { fireEvent, render, screen } from "@testing-library/react";
import { ReplyButton } from "../ReplyButton";

describe("ReplyButton", () => {
  it("renders the label and handles a tap", () => {
    const onClick = jest.fn();
    render(<ReplyButton label="tap me" cta={false} done={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "tap me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("stays visible but disabled after being tapped", () => {
    const onClick = jest.fn();
    render(<ReplyButton label="tapped" cta={false} done={true} onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "tapped" });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
