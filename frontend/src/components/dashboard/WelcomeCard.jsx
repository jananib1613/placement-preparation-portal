import { motion } from "framer-motion";
import "../../styles/dashboard.css";

export default function WelcomeCard() {
  return (
    <motion.div
      className="welcome-card"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1>Good Morning, Janani 👋</h1>

        <p>
          Every day brings you closer to your dream placement.
        </p>

        <button className="start-btn">
          Continue Learning
        </button>
      </div>

      <img
        className="welcome-image"
        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
        alt="AI Assistant"
      />
    </motion.div>
  );
}