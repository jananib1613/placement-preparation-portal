import { Bell, Flame } from "lucide-react";
import "../../styles/dashboard.css";

export default function HeroSection() {
  return (
    <div className="hero-section">

      <div className="hero-left">
        <h1>Good Morning, Janani 👋</h1>
        <p>
          Stay consistent today. Every problem you solve brings you one step
          closer to your dream placement.
        </p>
      </div>

      <div className="hero-right">

        <Bell className="hero-icon" size={24} />

        <div className="fire-box">
          <Flame size={20} />
          <span>14 Day Streak</span>
        </div>

      </div>

    </div>
  );
}