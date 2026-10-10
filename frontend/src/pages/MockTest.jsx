import "../styles/mocktest.css";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBrain,
  FaCode,
  FaBuilding,
  FaUserTie,
  FaLaptopCode,
  FaGraduationCap,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";


export default function MockTest() {
  const navigate = useNavigate();

  const tests = [
    {
      id: 1,
      title: "Aptitude Test",
      icon: <FaBrain />,
      description:
        "Practice Quantitative Aptitude, Logical Reasoning and Verbal Ability.",
      questions: "50 Questions",
      duration: "60 mins",
      difficulty: "Easy",
      route: "/mocktest/aptitude",
      color: "#10b981",
    },

    {
      id: 2,
      title: "Coding Challenge",
      icon: <FaCode />,
      description:
        "Solve coding problems on Arrays, Strings, Trees and Graphs.",
      questions: "2 Problems",
      duration: "90 mins",
      difficulty: "Medium",
      route: "/mocktest/coding",
      color: "#3b82f6",
    },

    {
      id: 3,
      title: "Company Test",
      icon: <FaBuilding />,
      description:
        "Practice placement tests for TCS, Infosys, Wipro and Accenture.",
      questions: "30 Questions",
      duration: "45 mins",
      difficulty: "Medium",
       route: "/company-preparation",
      color: "#f59e0b",
    },

    {
      id: 4,
      title: "HR Test",
      icon: <FaUserTie />,
      description:
        "Practice HR interview, communication and behavioural questions.",
      questions: "40 Questions",
      duration: "40 mins",
      difficulty: "Easy",
      route: "/mocktest/hr",
      color: "#ec4899",
    },

    {
      id: 5,
      title: "Technical Test",
      icon: <FaLaptopCode />,
      description:
        "DBMS, OS, Java, Python, SQL, OOP and Computer Networks.",
      questions: "50 Questions",
      duration: "60 mins",
      difficulty: "Hard",
      route: "/technical-topics",
      color: "#8b5cf6",
    },

    {
  id: 6,
  title: "Placement Test",
  icon: <FaGraduationCap />,
  description:
    "Complete placement exam with Aptitude, Coding, Technical and HR.",
  questions: "100 Questions",
  duration: "120 mins",
  difficulty: "Hard",
  route: "/placement-companies",
  color: "#06b6d4",
},
  ];

  
    return (
    <div>
    <div className="mocktest-page">
      
    

      {/* Header */}

      <div className="mocktest-header">
        <h1>🚀 Mock Test Arena</h1>

        <p>
          Practice company-level mock tests and become placement ready.
        </p>
      </div>

      {/* Stats */}

      <div className="mocktest-stats">

        <div className="mock-stat-card">
          <h2>6</h2>
          <p>Mock Tests</p>
        </div>

        <div className="mock-stat-card">
          <h2>347+</h2>
          <p>Total Questions</p>
        </div>

        <div className="mock-stat-card">
          <h2>10+</h2>
          <p>Top Companies</p>
        </div>

        <div className="mock-stat-card">
          <h2>100%</h2>
          <p>Placement Ready</p>
        </div>

      </div>

      <h2 className="mock-section-title">
        Available Mock Tests
      </h2>

      <div className="mocktest-grid">

        {tests.map((test) => (

          <div
            key={test.id}
            className="mocktest-card"
          >

            <div
              className="mocktest-icon"
              style={{ color: test.color }}
            >
              {test.icon}
            </div>

            <h3>{test.title}</h3>

            <p>{test.description}</p>

            <div className="mock-info">

              <span>
                <FaClipboardList />
                {test.questions}
              </span>

              <span>
                <FaClock />
                {test.duration}
              </span>

            </div>

            <div className="mock-footer">

              <span
                className={`difficulty-badge ${test.difficulty.toLowerCase()}`}
              >
                {test.difficulty}
              </span>

              <button
onClick={() => navigate(test.route)}
>
Start Test 🚀
</button>

              {
  test.title === "HR Test" && (
    <button
      className="history-btn"
      onClick={() => navigate("/hr-history")}
    >
      💼 HR History
    </button>
  )
}

{
  test.title === "Aptitude Test" && (
    <button
      className="history-btn"
      onClick={() => navigate("/aptitude-history")}
    >
      📊 Aptitude History
    </button>
  )
}

{
  test.title === "Coding Challenge" && (
    <button
      className="history-btn"
      onClick={() => navigate("/coding-history")}
    >
      💻 Coding History
    </button>
  )
}

{
  test.title === "Company Test" && (
    <button
      className="history-btn"
      onClick={() => navigate("/company-history")}
    >
      🏢 Company History
    </button>
  )
}

{
  test.title === "Technical Test" && (
    <button
      className="history-btn"
      onClick={() => navigate("/technical-history")}
    >
      🏢 Technical History
    </button>
  )
}

{
  test.title === "Placement Test" && (
    <button
      className="history-btn"
      onClick={() => navigate("/placement-history")}
    >
      🏢 Placement History
    </button>
  )
}




            </div>

          </div>

        ))}

</div>
      </div>

    </div>
  );
}