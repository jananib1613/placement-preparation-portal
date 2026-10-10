import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from "recharts";

import "../../styles/dashboard.css";

const data = [
  { week: "W1", score: 35, color: "#3B82F6" },
  { week: "W2", score: 48, color: "#8B5CF6" },
  { week: "W3", score: 60, color: "#10B981" },
  { week: "W4", score: 72, color: "#F59E0B" },
  { week: "W5", score: 85, color: "#EF4444" },
  { week: "W6", score: 95, color: "#06B6D4" },
];

export default function SkillChart() {
  return (
    <div className="card chart-card">

      <h3>Weekly Skill Growth</h3>

      <ResponsiveContainer width="100%" height={280}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,.08)"
          />

          <XAxis
            dataKey="week"
            stroke="#dbe7ff"
          />

          <YAxis
            stroke="#dbe7ff"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#4F8CFF"
            strokeWidth={4}
            dot={false}
          />

          {data.map((item, index) => (
            <ReferenceDot
              key={index}
              x={item.week}
              y={item.score}
              r={7}
              fill={item.color}
              stroke="white"
              strokeWidth={2}
            />
          ))}

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}