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
        <h2>💜 .You Made It. 💜</h2>

        <p>
          You navigated through the maze of terror,<br></br>
          You will find a way through everything...<br></br>
          Always hold your head up high.<br></br>
          Always keep smiling.<br></br>
          You Got This !
        </p>

        <button onClick={onRestart}>
          Restart Journey ↺
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Ending;