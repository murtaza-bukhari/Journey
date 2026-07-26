import { motion } from "framer-motion";
import "./Ending.css";

function GameOver({ onRestart }) {
  return (
    <motion.div
      className="ending-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="letter"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>👻 Caught by a Ghost! 👻</h2>

        <p>
          A shadow consumed you before you could solve the maze...<br />
          Your journey ends here.
        </p>

        <button onClick={onRestart}>
          Restart Game ↺
        </button>
      </motion.div>
    </motion.div>
  );
}

export default GameOver;