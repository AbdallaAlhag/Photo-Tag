import { HomePage, LeaderboardPage, ErrorPage }  from '../Pages';

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
        // Catch-all route for 404 errors
        path: '*',
        element: <ErrorPage />,
      },
]