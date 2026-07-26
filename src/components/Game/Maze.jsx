import maze from "../../data/maze";
import Cell from "./Cell";

import "./Maze.css";

function Maze({ playerPosition, visitedCheckpoints, ghosts = [] }) {
  const cols = maze[0].length;

  return (
    <div
      className="maze"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, var(--cell-size, 40px))`,
      }}
    >
      {maze.map((row, rowIndex) =>
        row.split("").map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            type={cell}
            row={rowIndex}
            col={colIndex}
            playerPosition={playerPosition}
            visitedCheckpoints={visitedCheckpoints}
            ghosts={ghosts}
          />
        ))
      )}
    </div>
  );
}

export default Maze;