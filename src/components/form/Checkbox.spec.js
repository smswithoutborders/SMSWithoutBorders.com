import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { useForm } from "react-hook-form";
import { Checkbox } from "./Checkbox";

const Form = () => {
  const { control } = useForm();
  return (
    <form>
      <Checkbox
        required
        control={control}
        name="test"
      />
    </form>
  );
};

describe("Checkbox component", () => {
  it("Renders default Checkbox", async () => {
    render(<Form />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("Checks checkbox", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
