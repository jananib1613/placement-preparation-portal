import {
  Target,
  Flame,
  Trophy,
  TrendingUp,
} from "lucide-react";

import "../../styles/dashboard.css";

export default function Stats() {

  const stats = [

    {
      title: "Placement Readiness",
      value: "84%",
      subtitle: "Ready for Interviews",
      icon: <Target size={34}/>,
      color: "#4F8CFF",
    },

    {
      title: "Current Streak",
      value: "18 Days",
      subtitle: "Best : 23 Days",
      icon: <Flame size={34}/>,
      color: "#ff9800",
    },

    {
      title: "Rank",
      value: "#24",
      subtitle: "Top 5%",
      icon: <Trophy size={34}/>,
      color: "#FFD700",
    },

  ];

  return (

    <div className="stats">

      {stats.map((item,index)=>(

        <div
          className="dashboard-card stat-card"
          key={index}
        >

          <div
            className="stat-icon"
            style={{
              background:item.color
            }}
          >
            {item.icon}
          </div>

          <h4>{item.title}</h4>

          <h2>{item.value}</h2>

          <p>{item.subtitle}</p>

          <div className="trend">

            <TrendingUp
              size={16}
            />

            Improving

          </div>

        </div>

      ))}

    </div>

  );

}