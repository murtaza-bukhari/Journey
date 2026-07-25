import Tile from "./Tile";
import Player from "./Player";
import Checkpoint from "./Checkpoint";
import End from './End'

import checkpoints from "../../data/checkpoints";

function Cell({
  type,
  row,
  col,
  playerPosition,
  visitedCheckpoints
}) {
  const hasPlayer =
    playerPosition.row === row &&
    playerPosition.col === col;

  const checkpoint = checkpoints.find(
    (checkpoint) =>
      checkpoint.row === row &&
      checkpoint.col === col
  );

  const isVisited =
    checkpoint &&
    visitedCheckpoints.includes(checkpoint.id);

  return (
    <div
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
      }}
    >
      <Tile type={type} />

      {type === "C" && !isVisited && <Checkpoint />}
      
      {type === "E" && <End />}

      {hasPlayer && (
        <Player />
      )}
    </div>
  );
}

export default Cell;