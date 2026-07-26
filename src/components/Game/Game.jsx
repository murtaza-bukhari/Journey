import { useEffect, useRef, useState } from "react";

import Maze from "./Maze";
import Popup from "./Popup";
import Header from "./Header";
import Ending from "./Ending";

import maze from "../../data/maze";
import checkpoints from "../../data/checkpoints";

import "./Game.css";

import music from "../../assets/music/background.mp3";

function Game() {
  const [playerPosition, setPlayerPosition] = useState({
    row: 5,
    col: 33,
  });

  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [visitedCheckpoints, setVisitedCheckpoints] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  const [musicPlaying, setMusicPlaying] = useState(false);

  function toggleMusic() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {

      const movementKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (movementKeys.includes(event.key)) {
        event.preventDefault();
      }

      if (activeCheckpoint) {
        return;
      }

      setPlayerPosition((prev) => {
        let nextRow = prev.row;
        let nextCol = prev.col;

        switch (event.key) {
          case "ArrowUp":
            nextRow--;
            break;

          case "ArrowDown":
            nextRow++;
            break;

          case "ArrowLeft":
            nextCol--;
            break;

          case "ArrowRight":
            nextCol++;
            break;

          default:
            return prev;
        }

        const tile = maze[nextRow][nextCol];

        if (tile === "#") return prev;

        if (tile === "E") {
          setGameCompleted(true);
        }

        const checkpoint = checkpoints.find(
          (checkpoint) =>
            checkpoint.row === nextRow &&
            checkpoint.col === nextCol &&
            !visitedCheckpoints.includes(checkpoint.id)
        );

        if (checkpoint) {
          setVisitedCheckpoints((prev) => [
            ...prev,
            checkpoint.id,
          ]);

          setActiveCheckpoint(checkpoint);
        }

        return {
          row: nextRow,
          col: nextCol,
        };
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visitedCheckpoints, activeCheckpoint]);

  function resetGame() {
    setPlayerPosition({
      row: 5,
      col: 33,
    });

    setVisitedCheckpoints([]);
    setActiveCheckpoint(null);
    setGameCompleted(false);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={music}
        loop
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >

        <Header />
        <Maze playerPosition={playerPosition} visitedCheckpoints={visitedCheckpoints} />

        <button
          className="restart-button"
          onClick={resetGame}
        >
          Restart Journey ↺
        </button>

        {activeCheckpoint && (
          <Popup
            checkpoint={activeCheckpoint}
            onClose={() => setActiveCheckpoint(null)}
          />
        )}

        {gameCompleted && <Ending onRestart={resetGame} />}

        <button
          className="music-button"
          onClick={toggleMusic}
        >
          {musicPlaying ? "🔇 Pause Music" : "🎵 Play Music"}
        </button>
      </div>

    </>
  );

}

export default Game;