import "./Tile.css";

function Tile({ type }) {
  let className = "tile";

  if (type === "#") className += " wall";
  else className += " floor";

  return <div className={className}></div>;
}

export default Tile;