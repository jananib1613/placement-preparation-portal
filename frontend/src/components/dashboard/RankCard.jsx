import rank from "../../assets/dashboard/rank.jpeg";
import "../../styles/dashboard.css";

export default function RankCard() {
  return (
    <div className="card rank-card">

      <h3>Current Rank</h3>

      <img
        src={rank}
        alt="Rank"
        className="rank-image"
      />

      <h2 className="rank-number">
        #24
      </h2>

      <p className="rank-text">
        Global Placement Leaderboard
      </p>

    </div>
  );
}