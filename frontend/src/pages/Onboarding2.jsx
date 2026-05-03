import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Onboarding2() {
  const nav = useNavigate();

  return (
    <div className="chat-onboard">

      {/* header animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Start Chatting 💬
      </motion.h2>

      <p className="sub">Real conversations, real connections</p>

      {/* fake chat UI */}
      <div className="chat-box">

        <motion.div
          className="msg left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Hey 👋
        </motion.div>

        <motion.div
          className="msg right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          Hi! 😊
        </motion.div>

        <motion.div
          className="msg left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Wanna grab coffee? ☕
        </motion.div>

      </div>

      {/* animated button */}
      <motion.button
        className="btn"
        whileTap={{ scale: 0.95 }}
        onClick={() => nav("/login")}
      >
        Get Started 💖
      </motion.button>

    </div>
  );
}

export default Onboarding2;