import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,

    AreaChart,
    Area,

    BarChart,
    Bar,

    PieChart,
    Pie,
    Cell,

    ComposedChart,
    Line,

    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import "../styles/analytics.css";



export default function Analytics() {

    const [dashboard, setDashboard] = useState(null);

    const COLORS = [
        "#3b82f6",
        "#8b5cf6",
        "#22c55e",
        "#f59e0b"
    ];



    useEffect(() => {

    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId);

    if (!userId) {
        console.log("User ID not found in localStorage");
        return;
    }

    axios
        .get(`http://localhost:5000/api/dashboard?user_id=${userId}`)
        .then((res) => {

            console.log("Dashboard Data:", res.data);

            setDashboard(res.data);

        })
        .catch((err) => {

            console.log("Dashboard API Error:", err.response?.data || err);

        });

}, []);




    if (!dashboard) {

        return (

            <div className="analytics-loading">

                Loading Analytics...

            </div>

        );

    }




    const analytics = dashboard.analytics?.[0] || {};

    const aptitude = dashboard.aptitude || {};

    const coding = dashboard.codingProgress || {};

    const compiler = dashboard.compilerProgress || {};

    const theory = dashboard.theoryProgress || {};



    /* ===========================
       AREA CHART DATA
    =========================== */

    const skillGrowthData = dashboard.analytics.map((item, index) => ({

        week: `Week ${index + 1}`,

        Accuracy: Number(item.accuracy),

        Readiness: Number(item.placement_readiness)

    }));



    /* ===========================
       BAR CHART DATA
    =========================== */

    const weeklyActivity = [

        {
            name: "Tests",
            value: analytics.tests_attempted || 0
        },

        {
            name: "Solved",
            value: analytics.questions_solved || 0
        },

        {
            name: "XP",
            value: analytics.xp_points || 0
        }

    ];



    /* ===========================
       PIE CHART DATA
    =========================== */

    const moduleProgress = [

        {
            name: "Aptitude",
            value: aptitude.questions_solved || 0
        },

        {
            name: "Coding",
            value: coding.questions_solved || 0
        },

        {
            name: "Compiler",
            value: compiler.solved_questions || 0
        },

        {
            name: "Theory",
            value: theory.total_score || 0
        }

    ];



    /* ===========================
       COMPOSED CHART DATA
    =========================== */

    const performanceData = [

        {

            name: "Performance",

            Tests: analytics.tests_attempted || 0,

            Accuracy: analytics.accuracy || 0

        }

    ];



    return (

        <div className="analytics-page">

            <div className="analytics-header">

                <h1>
                    Analytics Dashboard
                </h1>

                <p>

                    Monitor your placement preparation progress with real-time insights.

                </p>

            </div>
                        {/* ==========================
                SUMMARY CARDS
            ========================== */}

            <div className="analytics-cards">

                <div className="analytics-card">

    <div className="card-icon">
        🎯
    </div>

    <div>
        <h3>Placement Readiness</h3>
        <h2>{analytics.placement_readiness || 0}%</h2>
        <p>Overall Performance</p>
    </div>

</div>



<div className="analytics-card">

    <div className="card-icon">
        💻
    </div>

    <div>
        <h3>Questions Solved</h3>
        <h2>{analytics.questions_solved || 0}</h2>
        <p>Total Questions</p>
    </div>

</div>



<div className="analytics-card">

    <div className="card-icon">
        📝
    </div>

    <div>
        <h3>Tests Attempted</h3>
        <h2>{analytics.tests_attempted || 0}</h2>
        <p>Total Tests</p>
    </div>

</div>



<div className="analytics-card">

    <div className="card-icon">
        📈
    </div>

    <div>
        <h3>Accuracy</h3>
        <h2>{analytics.accuracy || 0}%</h2>
        <p>Average Accuracy</p>
    </div>

</div>
            </div>

<div className="charts-container">

            {/* ==========================
                AREA CHART
            ========================== */}

            <div className="chart-card">

                <h2>Skill Growth</h2>

                <ResponsiveContainer width="100%" height={350}>

                    <AreaChart data={skillGrowthData}>

                        <defs>

                            <linearGradient id="accuracyColor" x1="0" y1="0" x2="0" y2="1">

                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>

                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>

                            </linearGradient>

                            <linearGradient id="readinessColor" x1="0" y1="0" x2="0" y2="1">

                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>

                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>

                            </linearGradient>

                        </defs>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="week"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Area
    type="monotone"
    dataKey="Accuracy"
    stroke="#3b82f6"
    fill="url(#accuracyColor)"
    strokeWidth={4}
    dot={{
        r:5,
        fill:"#3b82f6"
    }}
    activeDot={{
        r:8
    }}
/>


<Area
    type="monotone"
    dataKey="Readiness"
    stroke="#a855f7"
    fill="url(#readinessColor)"
    strokeWidth={4}

    dot={{
        r:5,
        fill:"#a855f7"
    }}
    activeDot={{
        r:8
    }}
    isAnimationActive={true}
animationDuration={1200}
/>Width={3}
                    

                    </AreaChart>

                </ResponsiveContainer>

            </div>



            {/* ==========================
                BAR CHART
            ========================== */}

            <div className="chart-card">

                <h2>Weekly Activity</h2>

                <ResponsiveContainer width="100%" height={320}>

                    <BarChart data={weeklyActivity}>

                        <defs>

<linearGradient id="barGradient"
x1="0"
y1="0"
x2="0"
y2="1">

<stop offset="0%" stopColor="#60a5fa"/>

<stop offset="100%" stopColor="#2563eb"/>

</linearGradient>

</defs>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="name"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar
dataKey="value"
fill="url(#barGradient)"
radius={[15,15,0,0]}
isAnimationActive={true}
animationDuration={1200}
/>

                    </BarChart>

                </ResponsiveContainer>

            </div>
                        {/* ==========================
                DONUT CHART
            ========================== */}

            <div className="chart-card">

                <h2>Module Wise Progress</h2>

                <ResponsiveContainer width="100%" height={350}>

                    <PieChart>

                        <Pie
                            data={moduleProgress}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            cornerRadius={10}
                            label
                            isAnimationActive={true}
animationDuration={1200}
                        >

                            {moduleProgress.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>



            {/* ==========================
                COMPOSED CHART
            ========================== */}

            <div className="chart-card">

                <h2>Performance Analysis</h2>

                <ResponsiveContainer width="100%" height={350}>

                    <ComposedChart data={performanceData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="Tests"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                        />

                        <Line
                            type="monotone"
                            dataKey="Accuracy"
                            stroke="#22c55e"
                            strokeWidth={4}
                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </div>
            </div>

                        {/* ==========================
                PERFORMANCE INSIGHTS
            ========================== */}

            <div className="analysis-box">

                <div className="analysis-card">

                    <h2>🚀 Strong Areas</h2>

                    <div className="analysis-item">
                        <span>Placement Readiness</span>
                        <strong>{analytics.placement_readiness || 0}%</strong>
                    </div>

                    <div className="analysis-item">
                        <span>Questions Solved</span>
                        <strong>{analytics.questions_solved || 0}</strong>
                    </div>

                    <div className="analysis-item">
                        <span>Accuracy</span>
                        <strong>{analytics.accuracy || 0}%</strong>
                    </div>

                    <div className="analysis-item">
                        <span>XP Points</span>
                        <strong>{analytics.xp_points || 0}</strong>
                    </div>

                </div>



                <div className="analysis-card">

                    <h2>📈 Improvement Areas</h2>

                    <div className="analysis-item">
                        <span>Tests Attempted</span>
                        <strong>{analytics.tests_attempted || 0}</strong>
                    </div>

                    <div className="analysis-item">
                        <span>Average Time</span>
                        <strong>{analytics.average_time || 0} sec</strong>
                    </div>

                    <div className="analysis-item">
                        <span>Current Streak</span>
                        <strong>{analytics.current_streak || 0} Days</strong>
                    </div>

                    <div className="analysis-item">
                        <span>Current Level</span>
                        <strong>Level {analytics.level_no || 1}</strong>
                    </div>

                </div>

            </div>

{/* ==========================
    READINESS SCORE + AI INSIGHT
========================== */}


<div className="premium-insights">


    <div className="readiness-card">


        <h2>
            🎯 Placement Readiness
        </h2>


        <div className="score-circle">

            <span>
                {analytics.placement_readiness || 0}%
            </span>

        </div>


        <p>
            Your current preparation level
        </p>


    </div>




    <div className="ai-card">


        <h2>
            🤖 AI Career Insights
        </h2>


        <p>
            Based on your recent activity, your strongest areas are
            aptitude practice and coding progress.
        </p>


        <div className="ai-points">

            <div>
                ✅ Continue daily coding practice
            </div>


            <div>
                📚 Improve weak modules regularly
            </div>


            <div>
                🚀 Attempt more mock interviews
            </div>


        </div>


    </div>



</div>

            {/* ==========================
                FOOTER
            ========================== */}

            <div className="analytics-footer">

                <h2>
                    🎯 Keep Practicing!
                </h2>

                <p>

                    Every test you complete updates your analytics automatically.
                    Continue solving Aptitude, Coding and Theory tests to improve
                    your Placement Readiness Score.

                </p>

            </div>

        </div>

    );

}