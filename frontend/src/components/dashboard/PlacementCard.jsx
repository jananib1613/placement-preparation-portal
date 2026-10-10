import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { Target } from "lucide-react";
import "../../styles/dashboard.css";

export default function PlacementCard() {
  return (
    <div className="card placement-card">

      <div className="card-header">
        <Target className="card-icon" size={24} />
        <h3>Placement Readiness</h3>
      </div>

      <div className="placement-box">

        <div className="progress-circle">

          <CircularProgressbar
            value={84}
            text="84%"
            styles={buildStyles({
              pathColor: "#4f8cff",
              textColor: "#ffffff",
              trailColor: "#22324f",
            })}
          />

        </div>

        <div className="placement-content">

          <h2>Excellent</h2>

          <p>Keep improving every day.</p>

          <span>
            Ahead of 76% of learners
          </span>

        </div>

      </div>

    </div>
  );
}