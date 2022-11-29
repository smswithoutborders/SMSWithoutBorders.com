import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { Alert } from "./Alert";

describe("Alert component", () => {

  it("Renders default alert", async () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Displays warning", async () => {
    render(<Alert kind="warning" />)
    expect(screen.getByRole("alert")).toHaveClass("bg-yellow-100");
  })

  it("Displays negative", async () => {
    render(<Alert kind="negative" />)
    expect(screen.getByRole("alert")).toHaveClass("bg-red-100");
  })

  it("Displays affirmative", async () => {
    render(<Alert kind="affirmative" />)
    expect(screen.getByRole("alert")).toHaveClass("bg-green-100");
  })

  it("Displays correct message", async () => {
    render(<Alert message="Hello there!" />);
    expect(screen.getByText("Hello there!")).toBeInTheDocument();
  })

  it("Disappears when closed", async () => {
    const user = userEvent.setup();
    render(<Alert />)
    await user.click(screen.getByTitle("close"));
    expect(screen.getByRole("alert")).toHaveClass("hidden");
  })
});