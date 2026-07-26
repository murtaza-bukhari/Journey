import Tile from "./Tile";
import Player from "./Player";
import Checkpoint from "./Checkpoint";
import End from "./End";
import Ghost from "./Ghost";

import checkpoints from "../../data/checkpoints";

function Cell({
  type,
  row,
  col,
  playerPosition,
  visitedCheckpoints,
  ghosts = []
}) {
  const hasPlayer =
    playerPosition.row === row &&
    playerPosition.col === col;

  const checkpoint = checkpoints.find(
    (cp) => cp.row === row && cp.col === col
  );

  const isVisited =
    checkpoint && visitedCheckpoints.includes(checkpoint.id);

  // Check if a ghost is standing on this cell
  const hasGhost = ghosts.some(
    (ghost) => ghost.row === row && ghost.col === col
  );

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

      {hasGhost && <Ghost />}

      {hasPlayer && <Player />}
    </div>
  );
}

export default Cell;