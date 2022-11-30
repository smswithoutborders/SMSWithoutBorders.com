import React from "react";
import { render, screen } from "utils/test-utils";
import { PageAnimationWrapper } from "./PageAnimationWrapper";

describe("PageAnimationWrapper component", () => {
  it("Renders PageAnimationWrapper", () => {
    render(
      <PageAnimationWrapper>
        <p>content</p>
      </PageAnimationWrapper>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
