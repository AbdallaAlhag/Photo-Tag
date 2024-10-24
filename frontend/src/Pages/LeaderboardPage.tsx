import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components";
import axios from "axios";
import { format } from "date-fns";

import map1 from "../assets/map/map1.webp";
import map2 from "../assets/map/map2.jpg";
import map3 from "../assets/map/map3.webp";

const maps = [
  { image: map1, name: "Syndicate Tower" },
  { image: map2, name: "Universe 113" },
  { image: map3, name: "Dragon Island" },
];

interface LeaderboardEntry {
  rank: number;
  name: string;
  time: string;
  date: string;
}

const LeaderboardPage: React.FC = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  console.log('baseURL: ',baseURL);
  const [activeMap, setActiveMap] = useState<number | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeMap !== null) {
      setIsLoading(true);
      setError(null);

      axios
        .get(`${baseURL}/leaderboard/${activeMap}`)
        .then((response) => {
          const formattedData = response.data.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (entry: any, index: number) => ({
              rank: index + 1,
              name: entry.name,
              time: `${Math.floor(Number(entry.time) / 60)}:${(
                Number(entry.time) % 60
              )
                .toString()
                .padStart(2, "0")}`,
              date: format(new Date(entry.createdAt), "yyyy-MM-dd"),
            })
          );
          setLeaderboardData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching leaderboard:", error);
          setError("Failed to load leaderboard data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activeMap, baseURL]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Leaderboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {maps.map((map, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${
                activeMap === index + 1 ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setActiveMap(index + 1)}
            >
              <img
                src={map.image}
                alt={map.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                  {map.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {activeMap !== null && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {maps[activeMap - 1].name} Leaderboard
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Rank</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry) => (
                      <tr key={entry.rank} className="border-t">
                        <td className="px-4 py-2">{entry.rank}</td>
                        <td className="px-4 py-2">{entry.name}</td>
                        <td className="px-4 py-2">{entry.time}</td>
                        <td className="px-4 py-2">{entry.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
