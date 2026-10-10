import { Flame } from "lucide-react";
import "../../styles/dashboard.css";

export default function StreakCard() {
  return (
    <div className="card">

      <div className="card-header">

        <Flame
          className="card-icon"
          size={24}
        />

        <h3>Current Streak</h3>

      </div>

      <h1 className="stat-value">
        18 Days
      </h1>

      <p className="stat-text">
        Best Streak : 23 Days
      </p>

    </div>
  );
}