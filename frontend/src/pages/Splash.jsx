import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../index.css";

function Splash() {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav("/onboarding1");
    }, 5000); // smoother timing

    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <motion.div
      className="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* 💞 Animated Floating Hearts */}
      <div className="hearts">
        {["💖", "💕", "❤️", "💘", "💗", "💞"].map((h, i) => (
          <span key={i} className="heart">{h}</span>
        ))}
      </div>

      {/* 💑 Center Glass Card */}
      <motion.div
        className="splash-card"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

        {/* 💘 Animated Heart Logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
            alt="love app"
            className="splash-img"
          />
        </motion.div>

        {/* 💬 Brand Name */}
        <h1>MatchMaker</h1>

        {/* 💡 Tagline (more emotional) */}
        <p>
          Not just matches… <br />
          Real connections start here ❤️
        </p>

        {/* 🔄 Loading animation */}
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default Splash;