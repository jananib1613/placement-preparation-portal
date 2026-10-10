import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/aptitude.css";

import percentage from "../assets/aptitude/percentage.jpeg";
import profit from "../assets/aptitude/profit.jpeg";
import timework from "../assets/aptitude/timework.jpeg";
import numbersystem from "../assets/aptitude/numbersystem.jpeg";
import logical from "../assets/aptitude/logical.jpeg";
import data from "../assets/aptitude/data.jpeg";
import blood from "../assets/aptitude/blood.jpeg";
import direction from "../assets/aptitude/direction.jpeg";
import seating from "../assets/aptitude/seating.jpeg";
import coding from "../assets/aptitude/coding.jpeg";
import interest from "../assets/aptitude/interest.jpeg";
import ratio from "../assets/aptitude/ratio.jpeg";

export default function Aptitude() {

    const navigate = useNavigate();

    const imageMap = {

        "percentage.jpeg": percentage,
        "profit.jpeg": profit,
        "timework.jpeg": timework,
        "numbersystem.jpeg": numbersystem,
        "logical.jpeg": logical,
        "data.jpeg": data,
        "blood.jpeg": blood,
        "direction.jpeg": direction,
        "seating.jpeg": seating,
        "coding.jpeg": coding,
        "interest.jpeg": interest,
        "ratio.jpeg": ratio

    };

    const [topics, setTopics] = useState([]);

    const [stats, setStats] = useState({

        totalTopics: 0,
        totalQuestions: 0,
        testsAttempted: 0,
        questionsSolved: 0,
        accuracy: 0,
        averageTime: 0

    });

    const [search, setSearch] = useState("");

    const [difficulty, setDifficulty] = useState("All");

    const [showStudyPlan, setShowStudyPlan] = useState(false);



    useEffect(() => {

        fetchTopics();

        fetchDashboard();

    }, []);



    const fetchTopics = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/aptitude/topics"
            );

            
            const formattedTopics = res.data.map((topic) => ({

    ...topic,

    image: imageMap[topic.image],

    difficulty:

        [
            "Logical Reasoning",
            "Data Interpretation",
            "Seating Arrangement",
            "Coding"
        ].includes(topic.topic_name)

        ? "Hard"


        :

        [
            "Profit and Loss",
            "Time and Work",
            "Number System",
            "Blood Relation",
            "Direction Sense"
        ].includes(topic.topic_name)

        ? "Medium"


        :

        "Easy",


    duration:

        topic.total_questions >= 40

        ? "30 mins"

        :

        topic.total_questions >= 25

        ? "25 mins"

        :

        "20 mins"

}));

            setTopics(formattedTopics);

        }

        catch (err) {

            console.log("Topics Error:", err);

        }

    };



    const fetchDashboard = async () => {
    try {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.log("User ID not found");
            return;
        }

        const res = await axios.get(
            `http://localhost:5000/api/aptitude/dashboard/${userId}`
        );

        console.log("Aptitude Dashboard:", res.data);

        setStats({
            totalTopics: res.data.totalTopics || 0,
            totalQuestions: res.data.totalQuestions || 0,
            testsAttempted: res.data.testsAttempted || 0,
            questionsSolved: res.data.questionsSolved || 0,
            accuracy: res.data.accuracy || 0,
            averageTime: res.data.averageTime || 0
        });

    }
    catch (err) {
        console.log("Dashboard Error:", err);
    }
};



    const filteredTopics = topics.filter((topic) =>

        topic.topic_name
            .toLowerCase()
            .includes(search.toLowerCase())

        &&

        (

            difficulty === "All"

            ||

            topic.difficulty === difficulty

        )

    );



    return (

        <div className="aptitude-page">
                        {/* ================= HERO SECTION ================= */}

            <section className="aptitude-header">

                <div className="hero-content">

                    <h1>🚀 Aptitude AI Arena</h1>

                    <p>
                        Practice smarter, track your progress, and prepare for top company placement tests.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-btn primary-btn"
                            onClick={() => {

                                if (topics.length > 0) {

                                    navigate(`/aptitude-test/${topics[0].topic_id}`);

                                }

                            }}
                        >
                            🚀 Start Practice
                        </button>

                        <button
                            className="hero-btn secondary-btn"
                            onClick={() => navigate("/aptitude-history")}
                        >
                            📊 View History
                        </button>

                    </div>

                </div>

            </section>



            {/* ================= DASHBOARD ================= */}

            <section className="aptitude-stats">

                <div className="stat-card">

                    <h2>{stats.totalTopics}</h2>

                    <p>Total Topics</p>

                </div>

                <div className="stat-card">

                    <h2>{stats.totalQuestions}</h2>

                    <p>Total Questions</p>

                </div>

                <div className="stat-card">

                    <h2>{stats.questionsSolved}</h2>

                    <p>Questions Solved</p>

                </div>

                <div className="stat-card">

                    <h2>{stats.testsAttempted}</h2>

                    <p>Tests Attempted</p>

                </div>

                <div className="stat-card">

                    <h2>{stats.accuracy}%</h2>

                    <p>Accuracy</p>

                </div>

                <div className="stat-card">

                    <h2>{stats.averageTime}s</h2>

                    <p>Average Time</p>

                </div>

            </section>



            {/* ================= SEARCH ================= */}

            <section className="aptitude-search">

                <input

                    type="text"

                    placeholder="🔍 Search Aptitude Topics..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <select

                    value={difficulty}

                    onChange={(e) => setDifficulty(e.target.value)}

                >

                    <option value="All">All</option>

                    <option value="Easy">Easy</option>

                    <option value="Medium">Medium</option>

                    <option value="Hard">Hard</option>

                </select>

            </section>



            {/* ================= DAILY CHALLENGE ================= */}

            <section className="daily-challenge">

                <div>

                    <h2>🔥 Daily Challenge</h2>

                    <p>
                        Solve today's challenge and improve your placement readiness.
                    </p>

                </div>

                <button className="challenge-btn">

                    Start Challenge

                </button>

            </section>



            {/* ================= TOPICS ================= */}

            <section className="topic-section">

                <h2 className="topic-section-title">

                    📘 Practice Topics

                </h2>

                <div className="topic-grid">
                                    {filteredTopics.map((topic) => (

                    <div
                        className="topic-card"
                        key={topic.topic_id}
                    >

                        <div className="topic-image">

                            <img
                                src={topic.image}
                                alt={topic.topic_name}
                            />

                            <span
                                className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}
                            >
                                {topic.difficulty}
                            </span>

                        </div>

                        <div className="topic-content">

                            <h3>
                                {topic.topic_name}
                            </h3>

                            <p>
                                {topic.description}
                            </p>

                            <div className="topic-info">

                                <div className="info-box">

                                    <h4>
                                        {topic.total_questions}
                                    </h4>

                                    <span>
                                        Questions
                                    </span>

                                </div>

                                <div className="info-box">

                                    <h4>
                                        {topic.duration}
                                    </h4>

                                    <span>
                                        Duration
                                    </span>

                                </div>

                            </div>

                            <div className="topic-progress">

                                <div className="progress-header">
    <span>Progress</span>
    <span>{topic.progress || 0}%</span>
</div>

                                <div className="progress-bar">

                                    <div
        className="progress-fill"
        style={{
            width: `${topic.progress || 0}%`
        }}
    />

                                </div>

                            </div>

                            <div className="card-footer">

                                <button
                                    className="start-btn"
                                    onClick={() =>
                                        navigate(`/aptitude-test/${topic.topic_id}`)
                                    }
                                >
                                    🚀 Start Practice
                                </button>

                                <button
                                    className="history-btn"
                                    onClick={() =>
                                        navigate("/aptitude-history")
                                    }
                                >
                                    📊 History
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

                </div>

            </section>
                        {/* ================= PROGRESS SECTION ================= */}

            <section className="progress-section">

                <div className="progress-card">

                    <h2>📈 Your Progress</h2>

                    <p>
                        Tests Attempted : <strong>{stats.testsAttempted}</strong>
                    </p>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    stats.totalQuestions > 0
                                        ? `${Math.min(
                                              (stats.questionsSolved /
                                                  stats.totalQuestions) *
                                                  100,
                                              100
                                          )}%`
                                        : "0%"
                            }}
                        />

                    </div>

                    <p>

                        Questions Solved :
                        <strong>
                            {" "}
                            {stats.questionsSolved} / {stats.totalQuestions}
                        </strong>

                    </p>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    stats.totalQuestions > 0
                                        ? `${Math.min(
                                              (stats.questionsSolved /
                                                  stats.totalQuestions) *
                                                  100,
                                              100
                                          )}%`
                                        : "0%"
                            }}
                        />

                    </div>

                </div>



                <div className="ai-card">

                    <h2>🤖 AI Study Coach</h2>

                    <p>
                        Your current accuracy is
                        <strong> {stats.accuracy}%</strong>.
                    </p>

                    <ul>

                        <li>🎯 Practice weak topics daily</li>

                        <li>📚 Complete one topic every day</li>

                        <li>🔥 Target 80%+ accuracy</li>

                    </ul>

                    <button className="ai-btn"

                        onClick={() => setShowStudyPlan(true)}
>
    🤖 Generate Study Plan

                    </button>

                </div>



                <div className="achievement-card">

                    <h2>🏆 Achievements</h2>

                    <div className="achievement-list">

                        <div className="badge">

                            🥇

                            <span>First Test</span>

                        </div>

                        <div className="badge">

                            🎯

                            <span>Accuracy</span>

                        </div>

                        <div className="badge">

                            🔥

                            <span>Practice</span>

                        </div>

                        <div className="badge">

                            ⭐

                            <span>Explorer</span>

                        </div>

                    </div>

                </div>

            </section>

            {showStudyPlan && (
    <div className="study-modal-overlay">

        <div className="study-modal">

            <button
                className="close-modal"
                onClick={() => setShowStudyPlan(false)}
            >
                ✕
            </button>

            <div className="study-icon">
                🤖
            </div>

            <h2>AI Study Coach</h2>

            <p className="study-intro">
                Based on your current aptitude performance,
                here's your recommended study plan.
            </p>

            {stats.accuracy < 50 ? (

                <div className="study-plan">

                    <h3>🎯 Focus on Fundamentals</h3>

                    <p>
                        Your current accuracy is below 50%.
                        Let's strengthen your basics first.
                    </p>

                    <ul>
                        <li>Practice 10 questions every day</li>
                        <li>Focus on weak aptitude topics</li>
                        <li>Review incorrect answers</li>
                        <li>Take one mock test every 3 days</li>
                    </ul>

                </div>

            ) : stats.accuracy < 80 ? (

                <div className="study-plan">

                    <h3>📈 Improve Your Accuracy</h3>

                    <p>
                        You're making good progress. Now let's
                        push your accuracy above 80%.
                    </p>

                    <ul>
                        <li>Practice 15 questions every day</li>
                        <li>Focus on difficult topics</li>
                        <li>Practice timed questions</li>
                        <li>Take 2 mock tests every week</li>
                    </ul>

                </div>

            ) : (

                <div className="study-plan">

                    <h3>🏆 Placement Ready</h3>

                    <p>
                        Excellent performance! You're ready
                        to challenge yourself further.
                    </p>

                    <ul>
                        <li>Practice advanced questions</li>
                        <li>Attempt company-level tests</li>
                        <li>Practice under time limits</li>
                        <li>Target 90%+ accuracy</li>
                    </ul>

                </div>

            )}

            <button
                className="start-plan-btn"
                onClick={() => setShowStudyPlan(false)}
            >
                🚀 Start My Plan
            </button>

        </div>

    </div>
)}

            <footer className="aptitude-footer">

                <p>

                    🚀 Keep Practicing • Keep Learning • Crack Your Dream Company

                </p>

            </footer>

        </div>

    );

}