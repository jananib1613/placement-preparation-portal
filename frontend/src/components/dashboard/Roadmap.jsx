import {
  FileText,
  Brain,
  Code2,
  Mic,
  Briefcase,
} from "lucide-react";

import "../../styles/dashboard.css";

const roadmap = [
  {
    title: "Resume",
    icon: <FileText size={28} />,
    status: "completed",
  },
  {
    title: "Aptitude",
    icon: <Brain size={28} />,
    status: "completed",
  },
  {
    title: "Coding",
    icon: <Code2 size={28} />,
    status: "active",
  },
  {
    title: "Interview",
    icon: <Mic size={28} />,
    status: "upcoming",
  },
  {
    title: "Placement",
    icon: <Briefcase size={28} />,
    status: "upcoming",
  },
];

export default function Roadmap() {
  return (
    <div className="dashboard-card roadmap-card">

      <h2 className="roadmap-title">
        Career Roadmap
      </h2>

      <p className="roadmap-subtitle">
        Complete each stage to become placement ready.
      </p>

      <div className="roadmap-flow">

        {roadmap.map((step, index) => (
          <div
            key={index}
            className={`roadmap-step ${step.status}`}
          >
            <div className="roadmap-icon">
              {step.icon}
            </div>

            <h4>{step.title}</h4>

            {index !== roadmap.length - 1 && (
              <div className="roadmap-line"></div>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}