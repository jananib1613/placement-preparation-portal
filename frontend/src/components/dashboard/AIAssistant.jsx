import robo from "../../assets/dashboard/robo.jpeg";
import { Sparkles, ArrowRight } from "lucide-react";
import "../../styles/dashboard.css";

export default function AIAssistant() {
  return (
    <div className="dashboard-card ai-card">

      <div className="ai-top">

        <div>

          <h2>AI Career Assistant</h2>

          <p>
            Ask questions about aptitude, coding, resumes,
            interviews and placement preparation.
          </p>

        </div>

        <Sparkles
          size={32}
          className="ai-star"
        />

      </div>

      <div className="ai-image">

        <img
          src={robo}
          alt="AI Robot"
        />

      </div>

      <button className="ai-button">

        Ask AI

        <ArrowRight size={18}/>

      </button>

    </div>
  );
}