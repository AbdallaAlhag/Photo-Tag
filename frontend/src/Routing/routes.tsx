import { HomePage, LeaderboardPage, ErrorPage, GamePage } from "../Pages";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "/game/:mapId",
    element: <GamePage />,
  },
  {
    // Catch-all route for 404 errors
    path: "*",
    element: <ErrorPage />,
  },
];
