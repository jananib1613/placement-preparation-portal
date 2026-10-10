import {
  FileText,
  Brain,
  Code,
  Bot,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="card">
      <h3>Quick Actions</h3>

      <div className="quick-grid">

        <div className="quick-card">
          <FileText size={28} />
          <p>Resume</p>
        </div>

        <div className="quick-card">
          <Brain size={28} />
          <p>Aptitude</p>
        </div>

        <div className="quick-card">
          <Code size={28} />
          <p>Coding</p>
        </div>

        <div className="quick-card">
          <Bot size={28} />
          <p>AI Chat</p>
        </div>

      </div>
    </div>
  );
}