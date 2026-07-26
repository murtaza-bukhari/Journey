import { motion } from "framer-motion";
import "./Ending.css";

function Ending({ onRestart }) {
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
        <h2>☠️ You Escaped. ☠️</h2>

        <p>
          The silence finally fades.<br />
          The maze can no longer reach you.<br />
          Some doors should never be opened...<br />
          But you found your way through.<br />
          <br />
          Until next time.
        </p>

        <button onClick={onRestart}>
          Enter Again ↺
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Ending;