import React from "react";
import { render, screen, userEvent } from "utils/test-utils";
import { NavLink, DashNavLink, MobileNavLink, ExternalLink, DropDownLink } from "./NavLinks";

describe("Navlinks component", () => {
  it("Renders Navlink", () => {
    render(<NavLink to="/home" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home")
  });

  it("Renders DashNavlink", () => {
    render(<DashNavLink to="/home" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home")
  });

  it("Renders MobileNavLink", () => {
    render(<MobileNavLink to="/home" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home")
  });

  it("Renders ExternalLink", () => {
    render(<ExternalLink href="/home" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home")
  });

  it("Renders DropDownLink", async () => {
    const user = userEvent.setup();

    const { debug } = render(
      <DropDownLink
        key="resources"
        label="dropdown"
        links={[
          {
            external: true,
            key: "link",
            path: "/link",
            label: "link",
          },
        ]}
      />
    );
    expect(screen.getByText("dropdown")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("menuitem")).toHaveAttribute("href", "/link");
  });


});

