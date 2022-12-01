import React from "react";
import { QRCode } from "./QRCode";
import { render, screen } from "utils/test-utils";

describe("QRCode component", () => {
    it("Renders QRCode", () => {
        render(<QRCode />);
        expect(screen.getByLabelText("qr-code")).toBeInTheDocument();
    });
});
