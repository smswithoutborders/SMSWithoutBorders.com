import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { PasswordInput } from "./PasswordInput";


describe("PasswordInput component", () => {
  const onChange = jest.fn();
  it("Renders default PasswordInput", async () => {
    const user = userEvent.setup();
    render(
      <PasswordInput
        id="password"
        name="password"
        helperText="message"
        aria-label="password"
        onChange={onChange}
      />);
    const input = screen.getByLabelText("password");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
    await user.type(input, "howdy");
    expect(input).toHaveValue("howdy");
    expect(onChange).toHaveBeenCalled();
  });

  it("toggles password view", async () => {
    const user = userEvent.setup();
    render(<PasswordInput />);
    expect(screen.getByTitle("show")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.getByTitle("hide")).toBeInTheDocument();
  });
});
