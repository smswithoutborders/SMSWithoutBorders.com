import React from "react";
import { render, screen } from "utils/test-utils";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("Renders Footer", async () => {
    render(<Footer />);
    expect(screen.getByText("SMSWithoutBorders")).toBeInTheDocument();
  });
});
