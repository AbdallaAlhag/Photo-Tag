import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import GamePage from "../Pages/GamePage";

// Define the mock data outside and before any vi.mock calls
const mockMapsData = {
  map1: {
    names: ["Character1", "Character2"],
    characters: ["image1.png", "image2.png"],
    xPercentage: [10, 50],
    yPercentage: [20, 60],
    widthPercentage: [5, 5],
    heightPercentage: [5, 5],
    map: "map1.png",
  },
};

// Mock modules before the test suite
vi.mock("../Components", () => ({
  maps: mockMapsData,
  Footer: () => <div>Footer Component</div>,
}));

// Mock axios
vi.mock("axios");

describe("GamePage", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("renders GamePage component", () => {
    render(
      <MemoryRouter initialEntries={["/game/1"]}>
        <Routes>
          <Route path="/game/:mapId" element={<GamePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the header is rendered
    expect(screen.getByText("Photo-Tag")).toBeInTheDocument();

    // Check that characters are rendered
    const characterImages = screen.getAllByRole("img");
    expect(characterImages).toHaveLength(2); // Assuming 2 characters from mock data
  });

  it("shows the username popup when the game is completed", () => {
    render(
      <MemoryRouter initialEntries={["/game/1"]}>
        <Routes>
          <Route path="/game/:mapId" element={<GamePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate finding all characters
    fireEvent.click(screen.getByAltText("Character1"));
    fireEvent.click(screen.getByAltText("Character2"));

    // Check if the congratulations popup is displayed
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
