import { useEffect, useRef, useState } from "react";

import Maze from "./Maze";
import Header from "./Header";
import Ending from "./Ending";
import FalseEnding from "./FalseEnding";
import GameOver from "./GameOver";

import maze from "../../data/maze";
import checkpoints from "../../data/checkpoints";
import ghosts from "../../data/ghosts";

import music from "../../assets/music/background.mp3";
import "./Game.css";

// Starting position matching row: 1, col: 19 in the vertical maze
const INITIAL_POSITION = { row: 11, col: 33 };

function Game() {
  // ---------------------- GAME STATE ----------------------
  const [playerPosition, setPlayerPosition] = useState(INITIAL_POSITION);
  const [visitedCheckpoints, setVisitedCheckpoints] = useState([]);

  // Endings & Game Over States
  const [gameCompleted, setGameCompleted] = useState(false);
  const [falseEnding, setFalseEnding] = useState(false);
  const [dismissedFalseEnding, setDismissedFalseEnding] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // ---------------------- AUDIO LOGIC ----------------------
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  function toggleMusic() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  }

  // ---------------------- KEYBOARD CONTROLS ----------------------
  useEffect(() => {
    function handleKeyDown(event) {
      const movementKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

      if (!movementKeys.includes(event.key)) return;
      event.preventDefault();

      // Freeze movement if any popup/overlay is active
      if (gameCompleted || falseEnding || gameOver) return;

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

        const tile = maze[nextRow]?.[nextCol];

        // Block movement into walls or out of bounds
        if (!tile || tile === "#") return prev;

        return { row: nextRow, col: nextCol };
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameCompleted, falseEnding, gameOver]);

  // ---------------------- POSITION EVALUATION ----------------------
  useEffect(() => {
    const { row, col } = playerPosition;
    const tile = maze[row]?.[col];

    // Stepping off the exit tile allows the false ending warning to re-trigger later
    if (tile !== "E") {
      setDismissedFalseEnding(false);
    }

    // 1. Check for Ghost Collision (Game Over)
    const hitGhost = ghosts.some(
      (ghost) => ghost.row === row && ghost.col === col
    );

    if (hitGhost) {
      setGameOver(true);
      return;
    }

    // 2. Check for Checkpoints / Keys
    const checkpoint = checkpoints.find(
      (cp) => cp.row === row && cp.col === col
    );

    if (checkpoint && !visitedCheckpoints.includes(checkpoint.id)) {
      setVisitedCheckpoints((prev) => [...prev, checkpoint.id]);
    }

    // 3. Check for Exit Tile Trigger
    if (tile === "E") {
      if (visitedCheckpoints.length === checkpoints.length) {
        setGameCompleted(true);
      } else if (!dismissedFalseEnding) {
        setFalseEnding(true);
      }
    }
  }, [playerPosition, visitedCheckpoints, dismissedFalseEnding]);

  // ---------------------- HANDLERS & RESETS ----------------------
  function handleCloseFalseEnding() {
    setFalseEnding(false);
    setDismissedFalseEnding(true);
  }

  function resetGame() {
    setPlayerPosition(INITIAL_POSITION);
    setVisitedCheckpoints([]);
    setGameCompleted(false);
    setFalseEnding(false);
    setDismissedFalseEnding(false);
    setGameOver(false);
  }

  // ---------------------- RENDER ----------------------
  return (
    <>
      <audio ref={audioRef} src={music} loop />

      {/* Top Controls Bar */}
      <div className="top-controls">
        <div className="keys-indicator">
          🗝️ {visitedCheckpoints.length} / {checkpoints.length}
        </div>

        <button className="music-button" onClick={toggleMusic}>
          {musicPlaying ? "🔇 Pause" : "🎵 Play"}
        </button>
      </div>

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

        <Maze
          playerPosition={playerPosition}
          visitedCheckpoints={visitedCheckpoints}
          ghosts={ghosts}
        />

        <button className="restart-button" onClick={resetGame}>
          Restart Journey ↺
        </button>

        {/* Ending & Game Over Popups */}
        {gameCompleted && <Ending onRestart={resetGame} />}
        {falseEnding && <FalseEnding onClose={handleCloseFalseEnding} />}
        {gameOver && <GameOver onRestart={resetGame} />}
      </div>
    </>
  );
}

export default Game;