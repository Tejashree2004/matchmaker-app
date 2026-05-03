import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Onboarding1() {
  const nav = useNavigate();

  return (
    <div className="onboard">

      {/* 💖 Floating Hearts Background */}
      <div className="hearts-container">
        <span className="heart">💖</span>
        <span className="heart">💕</span>
        <span className="heart">❤️</span>
        <span className="heart">💘</span>
        <span className="heart">💗</span>
        <span className="heart">💞</span>
      </div>

      {/* 🧡 Main Card */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
      >

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Find Love, Not Just Matches 💘
        </motion.h2>

        {/* Subtitle */}
        <p>
          Discover people who truly match your vibe, not just photos.
        </p>

        {/* Floating love icon */}
     <motion.img
  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
  alt="love"
  className="love-img"
/>

        {/* Button */}
        <motion.button
          className="btn"
          whileTap={{ scale: 0.95 }}
          onClick={() => nav("/onboarding2")}
        >
          Next →
        </motion.button>

      </motion.div>
    </div>
  );
}

export default Onboarding1;