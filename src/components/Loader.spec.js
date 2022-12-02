import React from "react";
import { render, screen } from "utils/test-utils";
import { Loader, InlineLoader } from "./Loader";

describe("Loader component", () => {
  window.scrollTo = jest.fn();
  it("Renders Loader", async () => {
    render(<Loader message="processing ..." />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("processing ...")).toBeInTheDocument();
  });

  it("Renders light Loader", async () => {
    render(<Loader message="processing ..." light />);
    expect(screen.getByRole("alert")).toHaveClass("text-white");
  });
});

describe("InlineLoader component", () => {
  window.scrollTo = jest.fn();
  it("Renders Loader", async () => {
    render(<InlineLoader message="processing ..." className="h-80" />);
    expect(screen.getByRole("alert")).toHaveClass("h-80");
  });
});
