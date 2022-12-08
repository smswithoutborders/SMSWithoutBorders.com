import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { PhoneNumberInput } from "./PhoneNumberInput";


describe("PhoneNumberInput component", () => {
  const onChange = jest.fn();
  it("Renders default PhoneNumberInput", async () => {
    const user = userEvent.setup();
    render(
      <PhoneNumberInput
        id="name"
        type="text"
        helperText="message"
        onChange={onChange}
      />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
    await user.type(input, "670");
    expect(input).toHaveValue("+237 6 70");
  });

  it("Renders invalid input", async () => {
    render(
      <PhoneNumberInput
        invalid={true}
        invalidText="invalid"
        onChange={onChange}
      />
    );
    expect(screen.getByText("invalid")).toBeInTheDocument();
  });
});
