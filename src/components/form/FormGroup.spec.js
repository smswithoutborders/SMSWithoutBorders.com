import React from "react";
import { render, screen } from "utils/test-utils";
import { FormGroup } from "./FormGroup";


describe("FormGroup component", () => {
  it("Renders default FormGroup", async () => {
    render(<FormGroup>text</FormGroup>);
    expect(screen.getByText("text")).toBeInTheDocument();
  });



});
