import robo from "../../assets/dashboard/robo.jpeg";
import "../../styles/dashboard.css";

export default function AICard() {
  return (
    <div className="card ai-card">

      <div className="ai-header">

        <img
          src={robo}
          alt="AI Assistant"
          className="ai-image"
        />

        <div>
          <h2>AI Career Assistant</h2>
          <p className="ai-subtitle">
            Your smart placement companion
          </p>
        </div>

      </div>

      <div className="ai-content">

        <p>
          Ask questions about coding, aptitude, resumes,
          interviews, companies, or placement preparation.
        </p>

        <button className="ai-btn">
          Start AI Chat
        </button>

      </div>

    </div>
  );
}