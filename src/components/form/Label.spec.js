import React from "react";
import { render, screen } from "utils/test-utils";
import { Label } from "./Label";


describe("Label component", () => {
  it("Renders default Label", async () => {
    render(<Label>name</Label>);
    expect(screen.getByText("name")).toBeInTheDocument();
  });

  it("Renders required Label", async () => {
    render(<Label required></Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

});
