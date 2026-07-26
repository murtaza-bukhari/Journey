import { useEffect, useRef, useState } from "react";

import Maze from "./Maze";
import Header from "./Header";
import Ending from "./Ending";
import FalseEnding from "./FalseEnding";
import GameOver from "./GameOver";

import maze from "../../data/maze";
import checkpoints from "../../data/checkpoints";
import initialGhosts from "../../data/ghosts";

import music from "../../assets/music/background.mp3";
import pop from "../../assets/music/pop.mp3";
import bite from "../../assets/music/bite.mp3";
import ting from "../../assets/music/ting.mp3";

import "./Game.css";

// Starting position
const INITIAL_POSITION = { row: 21, col: 19 };

function Game() {
  // ---------------------- GAME STATE ----------------------
  const [playerPosition, setPlayerPosition] = useState(INITIAL_POSITION);
  const [visitedCheckpoints, setVisitedCheckpoints] = useState([]);
  const [ghosts, setGhosts] = useState(initialGhosts);

  // Endings & Game Over States
  const [gameCompleted, setGameCompleted] = useState(false);
  const [falseEnding, setFalseEnding] = useState(false);
  const [dismissedFalseEnding, setDismissedFalseEnding] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // ---------------------- AUDIO LOGIC ----------------------
  const audioRef = useRef(null);
  const moveAudioRef = useRef(new Audio(pop));
  const biteAudioRef = useRef(new Audio(bite));
  const tingAudioRef = useRef(new Audio(ting));

  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }

    moveAudioRef.current.volume = 0.35;
    biteAudioRef.current.volume = 0.5;
    tingAudioRef.current.volume = 0.7;

    moveAudioRef.current.preload = "auto";
    biteAudioRef.current.preload = "auto";
    tingAudioRef.current.preload = "auto";

  }, []);

  function playMoveSound() {
    const audio = moveAudioRef.current;

    audio.pause();

    // Skip the silence at the beginning.
    // Adjust this value until it feels instant.
    audio.currentTime = 1.3;

    audio.play().catch(() => { });
  }

  function playBiteSound() {
    const audio = biteAudioRef.current;

    audio.pause();

    // Skip silence here too.
    audio.currentTime = 0.5;

    audio.play().catch(() => { });
  }

  function playTingSound() {
    const audio = tingAudioRef.current;

    audio.pause();
    audio.currentTime = 1; // Skip any silence
    audio.play().catch(() => { });
  }

  function toggleMusic() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  }

  // ---------------------- GHOST MOVEMENT ----------------------
  function moveGhost(ghost) {
    let nextRow = ghost.row;
    let nextCol = ghost.col;

    if (ghost.axis === "horizontal") {
      nextCol += ghost.direction;
    } else {
      nextRow += ghost.direction;
    }

    let nextTile = maze[nextRow]?.[nextCol];

    // Hit wall -> reverse direction
    if (!nextTile || nextTile === "#") {
      const newDirection = ghost.direction * -1;

      nextRow = ghost.row;
      nextCol = ghost.col;

      if (ghost.axis === "horizontal") {
        nextCol += newDirection;
      } else {
        nextRow += newDirection;
      }

      const reverseTile = maze[nextRow]?.[nextCol];

      // If somehow both directions are blocked, stay still
      if (!reverseTile || reverseTile === "#") {
        return {
          ...ghost,
          direction: newDirection,
        };
      }

      return {
        ...ghost,
        row: nextRow,
        col: nextCol,
        direction: newDirection,
      };
    }

    return {
      ...ghost,
      row: nextRow,
      col: nextCol,
    };
  }

  useEffect(() => {
    if (gameCompleted || falseEnding || gameOver) return;

    const interval = setInterval(() => {
      setGhosts((prevGhosts) => prevGhosts.map(moveGhost));
    }, 350);

    return () => clearInterval(interval);
  }, [gameCompleted, falseEnding, gameOver]);

  // ---------------------- KEYBOARD CONTROLS ----------------------
  useEffect(() => {
    function handleKeyDown(event) {
      const movementKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (!movementKeys.includes(event.key)) return;
      event.preventDefault();

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

        if (!tile || tile === "#") return prev;

        playMoveSound();

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
  }, [gameCompleted, falseEnding, gameOver]);

  // ---------------------- POSITION EVALUATION ----------------------
  useEffect(() => {
    const { row, col } = playerPosition;
    const tile = maze[row]?.[col];

    if (tile !== "E") {
      setDismissedFalseEnding(false);
    }

    // Ghost collision
    const hitGhost = ghosts.some(
      (ghost) => ghost.row === row && ghost.col === col
    );

    if (hitGhost) {
      playBiteSound();
      setGameOver(true);
      return;
    }

    // Checkpoints
    const checkpoint = checkpoints.find(
      (cp) => cp.row === row && cp.col === col
    );

    if (checkpoint && !visitedCheckpoints.includes(checkpoint.id)) {
      playTingSound();
      setVisitedCheckpoints((prev) => [...prev, checkpoint.id]);
    }

    // Exit
    if (tile === "E") {
      if (visitedCheckpoints.length === checkpoints.length) {
        setGameCompleted(true);
      } else if (!dismissedFalseEnding) {
        setFalseEnding(true);
      }
    }
  }, [
    playerPosition,
    ghosts,
    visitedCheckpoints,
    dismissedFalseEnding,
  ]);

  // ---------------------- HANDLERS ----------------------
  function handleCloseFalseEnding() {
    setFalseEnding(false);
    setDismissedFalseEnding(true);
  }

  function resetGame() {
    setPlayerPosition(INITIAL_POSITION);
    setVisitedCheckpoints([]);
    setGhosts(initialGhosts);
    setGameCompleted(false);
    setFalseEnding(false);
    setDismissedFalseEnding(false);
    setGameOver(false);
  }

  // ---------------------- RENDER ----------------------
  return (
    <>
      <audio ref={audioRef} src={music} loop />

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

        {gameCompleted && <Ending onRestart={resetGame} />}
        {falseEnding && (
          <FalseEnding onClose={handleCloseFalseEnding} />
        )}
        {gameOver && <GameOver onRestart={resetGame} />}
      </div>
    </>
  );
}

export default Game;