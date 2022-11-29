import React from "react";
import { render, screen } from "utils/test-utils";
import { Button, LinkButton } from "./Buttons";


describe("Button component", () => {
  it("Renders default button", async () => {
    render(<Button>click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("click me");
  });

  it("Renders outline button", async () => {
    render(<Button outline />);
    expect(screen.getByRole("button")).toHaveClass("border border-blue-800");
  });

  it("Renders danger button", async () => {
    render(<Button danger />);
    expect(screen.getByRole("button")).toHaveClass("bg-red-600");
  });

  it("Renders disabled button", async () => {
    render(<Button disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("LinkButton component", () => {
  it("Renders Link button", async () => {
    render(<LinkButton to="/" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link").getAttribute("href")).toMatch("/")
  });
})