import {
  FileText,
  Brain,
  Code2,
  Mic,
  Briefcase,
} from "lucide-react";

import "../../styles/dashboard.css";

export default function RoadmapCard() {
  return (
    <div className="card">

      <h3>Career Roadmap</h3>

      <div className="roadmap-graph">

        <div className="road-step completed">
          <div className="road-icon">
            <FileText size={24} />
          </div>
          <span>Resume</span>
        </div>

        <div className="road-line"></div>

        <div className="road-step completed">
          <div className="road-icon">
            <Brain size={24} />
          </div>
          <span>Aptitude</span>
        </div>

        <div className="road-line"></div>

        <div className="road-step active">
          <div className="road-icon">
            <Code2 size={24} />
          </div>
          <span>Coding</span>
        </div>

        <div className="road-line"></div>

        <div className="road-step">
          <div className="road-icon">
            <Mic size={24} />
          </div>
          <span>Interview</span>
        </div>

        <div className="road-line"></div>

        <div className="road-step">
          <div className="road-icon">
            <Briefcase size={24} />
          </div>
          <span>Placement</span>
        </div>

      </div>

    </div>
  );
}