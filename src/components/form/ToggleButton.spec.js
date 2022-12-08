import React, { useState } from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { ToggleButton } from "./ToggleButton";

const Wrapper = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <ToggleButton
      toggle={toggle}
      onToggle={setToggle} />
  );
};

describe("ToggleButton component", () => {
  it("Renders default ToggleButton", async () => {
    render(<Wrapper />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles button", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    expect(screen.getByTitle("show")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.getByTitle("hide")).toBeInTheDocument();
  });
});
