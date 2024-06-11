import React from "react";
import { render, screen } from "utils/test-utils";
import { MainNavbar } from "./MainNavbar";

describe("MainNavbar component", () => {
  it("Renders MainNavbar", async () => {
    render( 
    <MainNavbar />);
    expect(screen.getAllByRole("navigation")).toHaveLength(2);
  });
});
