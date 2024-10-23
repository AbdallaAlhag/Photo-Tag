import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
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
        <Link to="/leaderboard" className="text-2xl font-bold text-gray-600 hover:text-gray-800">
          Leaderboard
        </Link>
      </div>
    </header>
  );
};

export default Header;
