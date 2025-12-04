import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../src/components/layout/Header";

describe("Header Component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByText(/justbuyit/i);
    expect(logo).toBeInTheDocument();
  });
});
