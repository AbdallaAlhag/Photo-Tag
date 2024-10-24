import React, { useState } from "react";
import { Footer, Header } from "../Components";
import axios from "axios";

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

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Player1", time: "1:30", date: "2023-05-01" },
  { rank: 2, name: "Player2", time: "1:45", date: "2023-05-02" },
  { rank: 3, name: "Player3", time: "2:00", date: "2023-05-03" },
  { rank: 4, name: "Player4", time: "2:15", date: "2023-05-04" },
  { rank: 5, name: "Player5", time: "2:30", date: "2023-05-05" },
];

const LeaderboardPage: React.FC = () => {
  const [activeMap, setActiveMap] = useState<number | null>(null);

  const handleMapClick = (mapIndex: number) => {
    setActiveMap(mapIndex);
    try {
      axios
        .get(`http://localhost:3000/leaderboard/${mapIndex}`)
        .then((response) => {
          console.log('hi?', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header/>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Leaderboards
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {maps.map((map, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${
                activeMap === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleMapClick(index)}
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
              {maps[activeMap].name} Leaderboard
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  {mockLeaderboard.map((entry) => (
                    <tr key={entry.rank} className="border-t">
                      <td className="px-4 py-2">{entry.rank}</td>
                      <td className="px-4 py-2">{entry.name}</td>
                      <td className="px-4 py-2">{entry.time}</td>
                      <td className="px-4 py-2">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer/>
    </div>
  );
};

export default LeaderboardPage;