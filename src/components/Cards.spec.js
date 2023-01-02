import React from "react";
import { render, screen } from "utils/test-utils";
import { TutorialCard } from "./Cards";

describe("TutorialCard component", () => {
  it("Renders default card", async () => {
    render(
      <TutorialCard
        title="Tutorial"
        caption="read me"
        link="https://swob.com"
      />
    );
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
    expect(screen.getByRole("link").getAttribute("href")).toMatch(
      "https://swob.com"
    );
  });
});
