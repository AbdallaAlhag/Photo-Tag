import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Footer, maps } from "../Components";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  image: string;
  found: boolean;
  xPercentage: number;
  yPercentage: number;
  widthPercentage: number;
  heightPercentage: number;
}

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const { mapId } = useParams<{ mapId: string }>();
  const currentMapKey = `map${mapId}` as keyof typeof maps;
  const currentMapData = maps[currentMapKey];
  const [characters, setCharacters] = useState<Character[]>(
    currentMapData.names.map((name, index) => ({
      id: index + 1,
      name,
      image: currentMapData.characters[index],
      found: false,
      xPercentage: currentMapData.xPercentage[index],
      yPercentage: currentMapData.yPercentage[index],
      widthPercentage: currentMapData.widthPercentage[index],
      heightPercentage: currentMapData.heightPercentage[index],
    }))
  );
  const [scrollY, setScrollY] = useState(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    characters: Character[];
  }>({
    x: 0,
    y: 0,
    visible: false,
    characters: [],
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [tooltip] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const [username, setUsername] = useState("");

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameCompleted) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameCompleted]);

  const handleClick = (e: React.MouseEvent) => {
    // Check if the click is inside the context menu
    if ((e.target as HTMLElement).closest(".context-menu")) {
      return; // Do nothing if clicking inside the context menu
    }

    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const clickableCharacters = characters.filter(
        (character) =>
          !character.found &&
          x >= character.xPercentage &&
          x <= character.xPercentage + character.widthPercentage &&
          y >= character.yPercentage &&
          y <= character.yPercentage + character.heightPercentage
      );

      if (clickableCharacters.length > 0) {
        setContextMenu({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          visible: true,
          characters: clickableCharacters,
        });
      } else {
        setContextMenu({ ...contextMenu, visible: false, characters: [] });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCharacterClick = (character: Character) => {
    const updatedCharacters = characters.map((c) =>
      c.id === character.id ? { ...c, found: true } : c
    );
    setCharacters(updatedCharacters);
    setContextMenu({ ...contextMenu, visible: false, characters: [] });

    if (updatedCharacters.every((c) => c.found)) {
      setGameCompleted(true);
      setShowUsernamePopup(true);
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      console.log(`Game completed by ${username} in ${timer} seconds`);
      axios.post(`${baseURL}}/leaderboard`, {
        username,
        time: timer,
        mapId,
      });
      setShowUsernamePopup(false);
      navigate("/leaderboard");
    }
    setShowUsernamePopup(false);
  };

  const headerOpacity = Math.max(1 - scrollY / 500, 0.5);
  const characterImageOpacity = Math.max(1 - (scrollY / 500) * 0.15, 0.85);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header
        className="bg-white shadow-md sticky top-0 z-10 transition-opacity duration-300"
        style={{ opacity: headerOpacity }}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-600 hover:text-gray-800"
            style={{ opacity: headerOpacity }}
          >
            Photo-Tag
          </Link>
          <div className="flex items-center space-x-6">
            <div
              className="text-2xl font-semibold"
              style={{ opacity: headerOpacity }}
            >
              {formatTime(timer)}
            </div>
            <div className="flex space-x-4">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className={`flex flex-row gap-1 items-center`}
                  style={{ opacity: character.found ? 0.5 : 1 }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-20 h-20 object-contain rounded-lg"
                    style={{ opacity: characterImageOpacity }}
                  />
                  <span
                    className="mt-1"
                    style={{
                      color: character.found ? "red" : "black",
                    }}
                  >
                    {character.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-x-hidden">
        <div
          ref={mapRef}
          className="relative w-full bg-cover bg-center cursor-crosshair"
          style={{ backgroundImage: `url(${currentMapData.map})` }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
        >
          <img
            src={currentMapData.map}
            alt="Game Map"
            className="w-full h-auto"
          />
          <div
            className="pointer-events-none absolute border-2 border-red-500 rounded-full w-16 h-16"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          {contextMenu.visible && (
            <div
              className="absolute bg-gray-800 text-white p-2 rounded shadow-lg context-menu"
              style={{ left: contextMenu.x, top: contextMenu.y }}
            >
              {contextMenu.characters.map((character) => (
                <div
                  key={character.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded"
                  onClick={() => handleCharacterClick(character)}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <span>{character.name}</span>
                </div>
              ))}
            </div>
          )}
          {tooltip.visible && (
            <div
              className="absolute bg-black bg-opacity-75 text-white px-2 py-1 rounded"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y + 20,
                transform: "translateX(-50%)",
              }}
            >
              {tooltip.message}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showUsernamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-4">
              You completed the game in {formatTime(timer)}.
            </p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleUsernameSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Score
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
