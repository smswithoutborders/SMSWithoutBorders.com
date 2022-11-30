import React from "react";
import { QRCode } from "./QRCode";
import { render, screen } from "utils/test-utils";

// mock canvas 
HTMLCanvasElement.prototype.getContext = () => jest.fn();

// mock qrious
// jest.mock('context', () => ({
//     clearRect: () => jest.fn()
// }));

describe("QRCode component", () => {
    it("Renders QRCode", () => {
        render(<QRCode />);
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});