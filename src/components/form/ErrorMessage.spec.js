import React from "react";
import { render, screen } from "utils/test-utils";
import { ErrorMessage } from "./ErrorMessage";


describe("ErrorMessage component", () => {
  it("Renders default ErrorMessage", async () => {
    render(<ErrorMessage>error</ErrorMessage>);
    expect(screen.getByText("error")).toBeInTheDocument();
  });
});
