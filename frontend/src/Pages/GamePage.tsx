import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer, maps } from "../Components";

interface Character {
  id: number;
  name: string;
  image: string;
  found: boolean;
}

const GamePage: React.FC = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const currentMapKey = `map${mapId}` as keyof typeof maps;
  const currentMapData = maps[currentMapKey];
  const [characters, setCharacters] = useState<Character[]>(
    currentMapData.names.map((name, index) => ({
      id: index + 1,
      name,
      image: currentMapData.characters[index],
      found: false,
    }))
  );
  const [scrollY, setScrollY] = useState(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setContextMenu({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
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
    setContextMenu({ ...contextMenu, visible: false });

    if (updatedCharacters.every((c) => c.found)) {
      setGameCompleted(true);
      // TODO: Send completion time to backend
      console.log(`Game completed in ${timer} seconds`);
    }
  };

  const opacity = Math.max(1 - scrollY / 500, 0.5); // Minimum opacity of 0.5 after scrolling 500px

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
        style={{ opacity }}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-600 hover:text-gray-800"
          >
            Photo-Tag
          </Link>
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-semibold">{formatTime(timer)}</div>
            <div className="flex space-x-4 ">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className={`flex flex-row gap-1 items-center ${
                    character.found ? "opacity-50" : ""
                  }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <span className="mt-1">{character.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
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
              left: cursorPosition.x - 32,
              top: cursorPosition.y - 32,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          {contextMenu.visible && (
            <div
              className="absolute bg-gray-800 text-white p-2 rounded shadow-lg"
              style={{ left: contextMenu.x, top: contextMenu.y }}
            >
              {characters.map((character) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamePage;
