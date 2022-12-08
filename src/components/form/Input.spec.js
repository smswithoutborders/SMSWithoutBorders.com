import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { Input } from "./Input";


describe("Input component", () => {
  it("Renders default Input", async () => {
    const user = userEvent.setup();
    render(
      <Input
        id="name"
        type="text"
        helperText="message"
      />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
    await user.type(input, "howdy");
    expect(input).toHaveValue("howdy");
  });

  it("Renders invalid input", async () => {
    render(
      <Input
        invalid={true}
        invalidText="invalid"
      />
    );
    expect(screen.getByRole("textbox")).toHaveClass("border-red-600");
    expect(screen.getByText("invalid")).toBeInTheDocument();
  });
});
