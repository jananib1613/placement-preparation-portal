import { Target } from "lucide-react";
import "../../styles/dashboard.css";

export default function GoalCard() {
  return (
    <div className="card goal-card">

      <div className="card-header">

        <Target
          className="card-icon"
          size={24}
        />

        <h3>Weekly Goal</h3>

      </div>

      <h2 className="goal-title">
        Solve 25 Coding Problems
      </h2>

      <div className="goal-progress">

        <div
          className="goal-fill"
          style={{ width: "72%" }}
        ></div>

      </div>

      <h3 className="goal-count">
        18 / 25 Completed
      </h3>

    </div>
  );
}