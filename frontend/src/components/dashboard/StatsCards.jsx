import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "../../styles/dashboard.css";

export default function StatsCards() {
  return (
    <div className="stats-grid">

      <div className="stat-card">

        <h3>Placement Readiness</h3>

        <div className="progress-box">

          <div className="circle">

            <CircularProgressbar
              value={84}
              text="84%"
              styles={buildStyles({
                pathColor: "#6C63FF",
                textColor: "#222",
              })}
            />

          </div>

          <div>

            <h2>Excellent</h2>

            <p>Keep going!</p>

          </div>

        </div>

      </div>

      <div className="stat-card">
        <h3>Current Streak</h3>
        <h1>🔥 18 Days</h1>
        <p>Best : 23 Days</p>
      </div>

      <div className="stat-card">
        <h3>Level</h3>
        <h1>12</h1>
        <p>2450 / 3000 XP</p>
    </div>

      <div className="stat-card">
        <h3>Rank</h3>
        <h1>#24</h1>
        <p>Out of 4562</p>
      </div>

    </div>
  );
}