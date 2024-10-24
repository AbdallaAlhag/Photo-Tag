// src/__tests__/HomePage.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "../Pages/HomePage";
import { BrowserRouter } from "react-router-dom";

describe("HomePage component", () => {
  it("renders the HomePage correctly", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Test for the main heading
    expect(screen.getByText(/Maps/i)).toBeInTheDocument();

    // Test for specific map names
    expect(screen.getByText(/Syndicate Tower/i)).toBeInTheDocument();
    expect(screen.getByText(/Universe 113/i)).toBeInTheDocument();
    expect(screen.getByText(/Dragon Island/i)).toBeInTheDocument();

    // Test for the Start Game link
    expect(screen.getAllByText(/Start Game/i)).toHaveLength(3);
  });
});
