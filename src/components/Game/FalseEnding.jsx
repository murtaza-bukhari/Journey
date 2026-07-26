import { motion } from "framer-motion";
import "./Ending.css";

function FalseEnding({ onClose }) {
  return (
    <motion.div
      className="ending-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="letter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2>🔒 The Door is Sealed 🔒</h2>

        <p>
          You reached the exit, but something is wrong...<br />
          The heavy iron doors refuse to budge.<br />
          You left missing keys behind in the shadows.<br />
          <br />
          Go back and collect them all!
        </p>

        {/* Closes the popup and keeps the player at the exit tile */}
        <button onClick={onClose}>
          Go Bac
        </button>
      </motion.div>
    </motion.div>
  );
}

export default FalseEnding;