import { vi, describe, it, afterEach, expect } from "vitest";
import axios from "axios";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import LeaderboardPage from "../Pages/LeaderboardPage";

// Mock axios
vi.mock("axios");

describe("LeaderboardPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("loads leaderboard data when a map is selected", async () => {
    const mockLeaderboardData = [
      { name: "Player1", time: "120", createdAt: "2024-10-01T12:00:00Z" },
      { name: "Player2", time: "150", createdAt: "2024-10-01T12:30:00Z" },
    ];

    // Correct typing for Vitest mock
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockLeaderboardData,
    });

    render(<LeaderboardPage />);

    const mapSelection = screen.getByAltText("Syndicate Tower");
    fireEvent.click(mapSelection);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/leaderboard/1"
      );
      expect(screen.getByText("Player1")).toBeInTheDocument();
      expect(screen.getByText("Player2")).toBeInTheDocument();
    });
  });

  it("displays an error message when leaderboard data fails to load", async () => {
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Failed to load")
    );

    render(<LeaderboardPage />);

    const mapSelection = screen.getByAltText("Syndicate Tower");
    fireEvent.click(mapSelection);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load leaderboard data")
      ).toBeInTheDocument();
    });
  });

  it("shows loading indicator when fetching data", async () => {
    render(<LeaderboardPage />);

    const mapSelection = screen.getByAltText("Syndicate Tower");
    fireEvent.click(mapSelection);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: [],
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
