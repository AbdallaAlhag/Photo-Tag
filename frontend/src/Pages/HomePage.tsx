import React from "react";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import map1 from "../assets/map/map1.webp";
import map2 from "../assets/map/map2.jpg";
import map3 from "../assets/map/map3.webp";

const maps = [map1, map2, map3]; // Array of imported maps

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-600 transition duration-300 ease-in-out hover:text-gray-800"
            style={{
              letterSpacing: "0.1rem",
              transform: "scale(1)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            Photo-Tag
          </Link>
          <Link to="/" className="text-2xl font-bold text-gray-600 hover:text-gray-800">
            Leaderboard
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Maps
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Syndicate Tower", "Universe 113", "Dragon Island"].map((map, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={maps[index]}
                alt={map}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center text-gray-800  mb-2">
                  {map}
                </h2>
                <Link
                  to={"/"}
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Start Game
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <a
            href="https://github.com/AbdallaAlhag/Photo-Tag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
