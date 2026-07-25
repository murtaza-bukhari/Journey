import maze from "../../data/maze";
import Cell from "./Cell";

import './Maze.css'

function Maze({ playerPosition, visitedCheckpoints }) {
  return (
    <div
      className="maze"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${maze[0].length}, 40px)`,
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
          />
        ))
      )}
    </div>
  );
}

export default Maze;