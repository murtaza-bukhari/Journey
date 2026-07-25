import { motion } from "framer-motion";
import "./Popup.css";

import Heartrain from "./HeartRain";

function Popup({ checkpoint, onClose }) {
  return (
    <div className="popup-overlay">

      <Heartrain />

      <motion.div
        className="popup"
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <h1>{checkpoint.title}</h1>

        <p>{checkpoint.message}</p>

        <button onClick={onClose}>
          Continue ❤️
        </button>
      </motion.div>
    </div>
  );
}

export default Popup;