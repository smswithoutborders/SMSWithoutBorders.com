import React from "react";
import { render, screen } from "utils/test-utils";
import { DashNavbar } from "./DashNavbar";

describe("DashNavbar component", () => {
  it("Renders DashNavbar", async () => {
    render(<DashNavbar />);
    expect(screen.getAllByRole("navigation")).toHaveLength(2);
  });
});
