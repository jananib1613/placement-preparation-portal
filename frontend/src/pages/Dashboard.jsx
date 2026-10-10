import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import axios from "axios";
import Layout from "../components/Layout";

import profile from "../assets/dashboard/profile.jpeg";
import robo from "../assets/dashboard/robo.jpeg";
import king from "../assets/dashboard/king.jpeg";
import aptitude from "../assets/dashboard/aptitude ace.jpeg";
import code from "../assets/dashboard/code.jpeg";

import tcsLogo from "../assets/logos/tcs.png";
import infosysLogo from "../assets/logos/infosys.png";
import wiproLogo from "../assets/logos/wipro.png";
import accentureLogo from "../assets/logos/accenture.png";
import capgeminiLogo from "../assets/logos/capgemini.png";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    Target,
    Flame,
    Trophy,
    Brain,
    Code2,
    FileText,
    Mic,
    BriefcaseBusiness,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    Sparkles,
    ChevronRight,
    Zap,
    BookOpen,
    Activity,
    CalendarDays
} from "lucide-react";

import "../styles/dashboard.css";


export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [placementDrives, setPlacementDrives] = useState([]);
    const [activities, setActivities] = useState([]);
    const [aiMessage, setAiMessage] = useState("");

    const userId = localStorage.getItem("userId");


    /* =========================================================
       FETCH DASHBOARD
    ========================================================= */

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:5000/api/dashboard?user_id=${userId}`
                );

                setDashboardData(res.data);

                console.log("Dashboard API Response:", res.data);

            }
            catch (error) {

                console.log(
                    "Dashboard Error:",
                    error
                );

            }

        };


        const fetchPlacementDrives = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:5000/api/placement/drives"
                );

                console.log(
                    "PLACEMENT DRIVES:",
                    res.data
                );

                if (res.data.success) {

                    setPlacementDrives(
                        res.data.drives || []
                    );

                }

            }
            catch (error) {

                console.log(
                    "Placement Error:",
                    error
                );

            }

        };


        const fetchActivity = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:5000/api/activity/${userId}`
                );

                if (res.data.success) {

                    setActivities(
                        res.data.activities || []
                    );

                }

            }
            catch (error) {

                console.log(
                    "Activity Error:",
                    error
                );

            }

        };


        fetchDashboard();
        fetchPlacementDrives();
        fetchActivity();

    }, [userId]);


    /* =========================================================
       LOADING
    ========================================================= */

    if (!dashboardData) {

        return (

            <Layout>

                <div className="dashboard-loading">

                    <div className="loading-orbit"></div>

                    <h2>
                        Preparing your dashboard...
                    </h2>

                    <p>
                        Loading your placement progress
                    </p>

                </div>

            </Layout>

        );

    }


    /* =========================================================
       DATA
    ========================================================= */

    const progress =
        dashboardData.progress || {};

    const leaderboard =
        dashboardData.leaderboard || {};

    const aptitudeData =
        dashboardData.aptitude || {};

    const codingData =
        dashboardData.codingProgress || {};

    const theoryData =
        dashboardData.theoryProgress || {};

    const aiAssistant =
        dashboardData.ai_assistant || {};

    const roadmap =
        dashboardData.roadmap || [];

    const achievements =
        dashboardData.achievements || [];

    const analytics =
        dashboardData.analytics?.[0] || {
            week1: 0,
            week2: 0,
            week3: 0,
            week4: 0
        };


    /* =========================================================
       GRAPH DATA
    ========================================================= */

    const graphData = [

        {
            week: "W1",
            score: Number(analytics.week1) || 0
        },

        {
            week: "W2",
            score: Number(analytics.week2) || 0
        },

        {
            week: "W3",
            score: Number(analytics.week3) || 0
        },

        {
            week: "W4",
            score: Number(analytics.week4) || 0
        }

    ];


    /* =========================================================
       WEEKLY GOAL
    ========================================================= */

    const weeklyGoal =
        Number(progress.weekly_goal) || 0;

    const weeklyCompleted =
        Number(progress.weekly_completed) || 0;

    const goalPercentage =
        weeklyGoal > 0
            ? Math.min(
                100,
                Math.round(
                    (weeklyCompleted / weeklyGoal) * 100
                )
            )
            : 0;


    /* =========================================================
       COMPANY LOGOS
    ========================================================= */

    const companyLogos = {

        TCS: tcsLogo,

        Infosys: infosysLogo,

        Wipro: wiproLogo,

        Accenture: accentureLogo,

        Capgemini: capgeminiLogo

    };


    const getCompanyLogo = (companyName) => {

        if (!companyName) {
            return null;
        }

        const name =
            companyName.toLowerCase();

        if (name.includes("tcs")) {
            return tcsLogo;
        }

        if (name.includes("infosys")) {
            return infosysLogo;
        }

        if (name.includes("wipro")) {
            return wiproLogo;
        }

        if (name.includes("accenture")) {
            return accentureLogo;
        }

        if (name.includes("capgemini")) {
            return capgeminiLogo;
        }

        return null;

    };


    /* =========================================================
       BADGES
    ========================================================= */

    const getBadgeImage = (badgeName) => {

        if (
            badgeName === "Consistency King"
        ) {
            return king;
        }

        if (
            badgeName === "Aptitude Ace"
        ) {
            return aptitude;
        }

        if (
            badgeName === "Code Warrior"
        ) {
            return code;
        }

        return king;

    };


    /* =========================================================
       ROADMAP ICON
    ========================================================= */

    const getRoadmapIcon = (step) => {

        const name =
            step?.toLowerCase() || "";

        if (name.includes("resume")) {
            return <FileText size={20} />;
        }

        if (name.includes("aptitude")) {
            return <Brain size={20} />;
        }

        if (name.includes("coding")) {
            return <Code2 size={20} />;
        }

        if (name.includes("interview")) {
            return <Mic size={20} />;
        }

        if (name.includes("placement")) {
            return <Trophy size={20} />;
        }

        return <Target size={20} />;

    };


    /* =========================================================
       AI
    ========================================================= */

    const askAI = () => {

        if (!aiAssistant) {

            setAiMessage(
                "No AI recommendation is available right now."
            );

            return;

        }

        setAiMessage(

            `${aiAssistant.message || ""}

Next Step:
${aiAssistant.next_step || ""}`

        );

    };


    return (

        <Layout>

            <div className="premium-dashboard">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="dashboard-hero-new">

                    <div className="hero-glow glow-one"></div>
                    <div className="hero-glow glow-two"></div>


                    <div className="hero-content">

                        <div className="hero-mini-label">

                            <Sparkles size={15} />

                            PLACEMENT COMMAND CENTER

                        </div>


                        <h1>

                            Good Morning,

                            <span>
                                {dashboardData.user?.full_name || "Student"}
                            </span>

                            <span className="hero-crown">
                                👑
                            </span>

                        </h1>


                        <p>

                            Your preparation is building momentum.
                            Keep going — your dream company is getting closer.

                        </p>


                        <div className="hero-actions">

                            <button
                                className="primary-action"
                                onClick={() =>
                                    window.location.href =
                                    "/mock-test"
                                }
                            >

                                <Zap size={18} />

                                Start Mock Test

                                <ArrowUpRight size={17} />

                            </button>


                            <button
                                className="outline-action"
                                onClick={() =>
                                    window.location.href =
                                    "/jobs"
                                }
                            >

                                <BriefcaseBusiness size={18} />

                                Explore Jobs

                            </button>

                        </div>

                    </div>


                    <div className="hero-profile-area">

                        <div className="profile-ring">

                            <img
                                src={profile}
                                alt="Janani"
                            />

                        </div>


                        <div className="profile-status">

                            <span></span>

                            Active Learner

                        </div>

                    </div>

                </section>



                {/* =================================================
                    QUICK STATS
                ================================================= */}

                <section className="quick-stats">


                    <div className="quick-stat-card">

                        <div className="stat-icon">

                            <Target size={22} />

                        </div>

                        <div>

                            <span>
                                Placement Readiness
                            </span>

                            <strong>
                                {progress.placement_readiness || 0}%
                            </strong>

                            <small>
                                Keep improving
                            </small>

                        </div>

                    </div>



                    <div className="quick-stat-card">

                        <div className="stat-icon flame-icon">

                            <Flame size={22} />

                        </div>

                        <div>

                            <span>
                                Current Streak
                            </span>

                            <strong>
                                {progress.current_streak || 0}
                            </strong>

                            <small>
                                Best {progress.best_streak || 0} days
                            </small>

                        </div>

                    </div>



                    <div className="quick-stat-card">

                        <div className="stat-icon trophy-icon">

                            <Trophy size={22} />

                        </div>

                        <div>

                            <span>
                                Leaderboard
                            </span>

                            <strong>
                                #{leaderboard.rank_position || 0}
                            </strong>

                            <small>
                                {leaderboard.total_students || 0} students
                            </small>

                        </div>

                    </div>



                    <div className="quick-stat-card">

                        <div className="stat-icon xp-icon">

                            <Zap size={22} />

                        </div>

                        <div>

                            <span>
                                Experience Points
                            </span>

                            <strong>
                                {progress.xp_points || 0}
                            </strong>

                            <small>
                                Level {progress.level_no || 1}
                            </small>

                        </div>

                    </div>


                </section>



                {/* =================================================
                    PREPARATION + AI
                ================================================= */}

                <section className="main-two-column">


                    {/* PREPARATION OVERVIEW */}

                    <div className="premium-card preparation-card">

                        <div className="section-heading">

                            <div>

                                <div className="heading-label">

                                    <Activity size={15} />

                                    YOUR PROGRESS

                                </div>

                                <h2>
                                    Preparation Overview
                                </h2>

                                <p>
                                    Track your current learning performance
                                </p>

                            </div>


                            <div className="overview-badge">

                                <Zap size={14} />

                                Live Data

                            </div>

                        </div>


                        <div className="progress-list">


                            {/* APTITUDE */}

                            <div className="subject-progress">

                                <div className="subject-top">

                                    <div className="subject-name">

                                        <div className="subject-icon">
                                            <Brain size={18} />
                                        </div>

                                        <span>
                                            Aptitude
                                        </span>

                                    </div>

                                    <strong>
                                        {aptitudeData.average_accuracy || 0}%
                                    </strong>

                                </div>


                                <div className="modern-progress">

                                    <div
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Number(
                                                    aptitudeData.average_accuracy
                                                ) || 0
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>



                            {/* CODING */}

                            <div className="subject-progress">

                                <div className="subject-top">

                                    <div className="subject-name">

                                        <div className="subject-icon">
                                            <Code2 size={18} />
                                        </div>

                                        <span>
                                            Coding
                                        </span>

                                    </div>

                                    <strong>
                                        {codingData.completion_percentage || 0}%
                                    </strong>

                                </div>


                                <div className="modern-progress">

                                    <div
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Number(
                                                    codingData.completion_percentage
                                                ) || 0
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>



                            {/* THEORY */}

                            <div className="subject-progress">

                                <div className="subject-top">

                                    <div className="subject-name">

                                        <div className="subject-icon">
                                            <BookOpen size={18} />
                                        </div>

                                        <span>
                                            Theory
                                        </span>

                                    </div>

                                    <strong>
                                        {theoryData.average_score || 0}
                                    </strong>

                                </div>


                                <div className="modern-progress">

                                    <div
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Number(
                                                    theoryData.average_score
                                                ) || 0
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>


                        </div>


                        <div className="overview-footer">


                            <div>

                                <span>
                                    Tests Attempted
                                </span>

                                <strong>
                                    {aptitudeData.tests_attempted || 0}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Problems Solved
                                </span>

                                <strong>
                                    {codingData.questions_solved || 0}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Theory Tests
                                </span>

                                <strong>
                                    {theoryData.tests_attempted || 0}
                                </strong>

                            </div>


                        </div>

                    </div>


                    {/* TECHNICAL */}

<div className="subject-progress">

    <div className="subject-top">

        <div className="subject-name">

            <div className="subject-icon">
                <Brain size={18} />
            </div>

            <span>
                Technical
            </span>

        </div>

        <strong>
            {Math.round(
                Number(
                    dashboardData.technicalProgress?.average_score
                ) || 0
            )}%
        </strong>

    </div>

    <div className="modern-progress">

        <div
            style={{
                width: `${Math.min(
                    100,
                    Number(
                        dashboardData.technicalProgress?.average_score
                    ) || 0
                )}%`
            }}
        />

    </div>

</div>



                    {/* AI CARD */}

                    <div className="premium-card ai-premium-card">

                        <div className="ai-background-glow"></div>


                        <div className="ai-top">

                            <div className="ai-avatar">

                                <img
                                    src={robo}
                                    alt="AI Assistant"
                                />

                            </div>


                            <div>

                                <div className="heading-label">

                                    <Sparkles size={14} />

                                    AI POWERED

                                </div>

                                <h2>
                                    Career Assistant
                                </h2>

                                <p>
                                    Your personal placement mentor
                                </p>

                            </div>

                        </div>


                        <div className="ai-message-box">

                            <span className="ai-label">
                                TODAY'S INSIGHT
                            </span>

                            <p>

                                {aiAssistant.message ||
                                    "Analyze your preparation and get personalized guidance."}

                            </p>

                        </div>


                        <div className="next-step">

                            <div className="next-step-icon">
                                <Target size={18} />
                            </div>

                            <div>

                                <span>
                                    Recommended Next Step
                                </span>

                                <p>

                                    {aiAssistant.next_step ||
                                        "Complete your daily preparation goals."}

                                </p>

                            </div>

                        </div>


                        <button
                            className="ai-action"
                            onClick={askAI}
                        >

                            <Sparkles size={17} />

                            {aiMessage
                                ? "Refresh Recommendation"
                                : "Get AI Recommendation"
                            }

                            <ChevronRight size={17} />

                        </button>


                        {aiMessage && (

                            <div className="ai-response-box">

                                <strong>
                                    AI Recommendation
                                </strong>

                                <p>
                                    {aiMessage}
                                </p>

                            </div>

                        )}

                    </div>


                </section>



                {/* =================================================
                    CAREER ROADMAP
                ================================================= */}

                <section className="premium-card roadmap-premium">

                    <div className="section-heading">

                        <div>

                            <div className="heading-label">

                                <Target size={15} />

                                PLACEMENT JOURNEY

                            </div>

                            <h2>
                                Career Roadmap
                            </h2>

                            <p>
                                Your journey from preparation to placement
                            </p>

                        </div>

                    </div>


                    <div className="roadmap-timeline">

                        {roadmap.map((item, index) => (

                            <div
                                className={
                                    `timeline-step ${
                                        item.status === "Completed"
                                            ? "completed"
                                            : item.status === "In Progress"
                                                ? "current"
                                                : ""
                                    }`
                                }
                                key={item.roadmap_id}
                            >

                                <div className="timeline-circle">

                                    {item.status === "Completed"
                                        ? <CheckCircle2 size={20} />
                                        : getRoadmapIcon(item.step_name)
                                    }

                                </div>


                                <div className="timeline-info">

                                    <strong>
                                        {item.step_name}
                                    </strong>

                                    <span>
                                        {item.status}
                                    </span>

                                </div>


                                {index < roadmap.length - 1 && (

                                    <div className="timeline-line"></div>

                                )}

                            </div>

                        ))}

                    </div>

                </section>



                {/* =================================================
                    WEEKLY GOAL + GRAPH
                ================================================= */}

                <section className="middle-grid">


                    {/* WEEKLY GOAL */}

                    <div className="premium-card weekly-premium">

                        <div className="section-heading">

                            <div>

                                <div className="heading-label">
                                    <CalendarDays size={15} />
                                    THIS WEEK
                                </div>

                                <h2>
                                    Weekly Goal
                                </h2>

                                <p>
                                    Stay consistent with your preparation
                                </p>

                            </div>

                        </div>


                        <div className="goal-layout">

                            <div
                                className="circular-goal"
                                style={{
                                    "--progress":
                                        `${goalPercentage * 3.6}deg`
                                }}
                            >

                                <div>

                                    <strong>
                                        {goalPercentage}%
                                    </strong>

                                    <span>
                                        Complete
                                    </span>

                                </div>

                            </div>


                            <div className="goal-details">

                                <div>

                                    <strong>
                                        {weeklyCompleted}
                                    </strong>

                                    <span>
                                        Completed
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        {weeklyGoal}
                                    </strong>

                                    <span>
                                        Weekly Target
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        {Math.max(
                                            weeklyGoal - weeklyCompleted,
                                            0
                                        )}
                                    </strong>

                                    <span>
                                        Remaining
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* SKILL GRAPH */}

                    <div className="premium-card graph-premium">

                        <div className="section-heading">

                            <div>

                                <div className="heading-label">
                                    <Activity size={15} />
                                    PERFORMANCE
                                </div>

                                <h2>
                                    Skill Growth
                                </h2>

                                <p>
                                    Your weekly performance trend
                                </p>

                            </div>

                        </div>


                        <div className="dashboard-chart">

                            <ResponsiveContainer
                                width="100%"
                                height={230}
                            >

                                <LineChart
                                    data={graphData}
                                >

                                    <CartesianGrid
                                        stroke="#292929"
                                        strokeDasharray="4 6"
                                    />

                                    <XAxis
                                        dataKey="week"
                                        stroke="#666"
                                        tick={{
                                            fill: "#888",
                                            fontSize: 12
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        stroke="#666"
                                        tick={{
                                            fill: "#888",
                                            fontSize: 12
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            background: "#101010",
                                            border: "1px solid #303030",
                                            borderRadius: "12px",
                                            color: "#fff"
                                        }}
                                        labelStyle={{
                                            color: "#aaa"
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#ffffff"
                                        strokeWidth={3}
                                        dot={{
                                            r: 4,
                                            fill: "#ffffff",
                                            stroke: "#111",
                                            strokeWidth: 2
                                        }}
                                        activeDot={{
                                            r: 7,
                                            fill: "#ffffff"
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </section>



                {/* =================================================
                    PLACEMENT DRIVES
                ================================================= */}

                <section className="premium-card placement-premium">

                    <div className="section-heading placement-heading">

                        <div>

                            <div className="heading-label">

                                <BriefcaseBusiness size={15} />

                                OPPORTUNITIES

                            </div>

                            <h2>
                                Upcoming Placement Drives
                            </h2>

                            <p>
                                Explore companies currently available on your placement radar
                            </p>

                        </div>


                        <button
                            className="view-all-btn"
                            onClick={() =>
                                window.location.href =
                                "/jobs"
                            }
                        >

                            View All Jobs

                            <ArrowUpRight size={16} />

                        </button>

                    </div>


                    <div className="drive-grid">

                        {placementDrives.length > 0 ? (

                            placementDrives.map((drive) => {

                                const logo =
                                    getCompanyLogo(
                                        drive.company_name
                                    );

                                return (

                                    <div
                                        className="modern-drive-card"
                                        key={drive.drive_id}
                                    >

                                        <div className="drive-top">

                                            <div className="company-logo-box">

                                                {logo ? (

                                                    <img
                                                        src={logo}
                                                        alt={drive.company_name}
                                                    />

                                                ) : (

                                                    <span>
                                                        {drive.company_name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </span>

                                                )}

                                            </div>


                                            <span className="drive-live">

                                                <span></span>

                                                Open

                                            </span>

                                        </div>


                                        <h3>
                                            {drive.company_name}
                                        </h3>

                                        <p className="drive-role">
                                            {drive.role}
                                        </p>


                                        <div className="drive-details">

                                            <span>
                                                💰 {drive.package || "Not specified"}
                                            </span>

                                            <span>
                                                📍 {drive.location || "India"}
                                            </span>

                                            <span>

                                                📅{" "}

                                                {drive.drive_date
                                                    ? new Date(
                                                        drive.drive_date
                                                    ).toLocaleDateString()
                                                    : "Coming Soon"
                                                }

                                            </span>

                                        </div>


                                        <button
                                            className="drive-view-btn"
                                        >

                                            View Drive

                                            <ArrowUpRight size={15} />

                                        </button>

                                    </div>

                                );

                            })

                        ) : (

                            <div className="empty-state">

                                <BriefcaseBusiness size={30} />

                                <h3>
                                    No placement drives available
                                </h3>

                                <p>
                                    New opportunities will appear here.
                                </p>

                            </div>

                        )}

                    </div>

                </section>



                {/* =================================================
                    ACTIVITY + ACHIEVEMENTS
                ================================================= */}

                <section className="bottom-grid">


                    {/* RECENT ACTIVITY */}

                    <div className="premium-card activity-premium">

                        <div className="section-heading">

                            <div>

                                <div className="heading-label">
                                    <Clock3 size={15} />
                                    RECENT
                                </div>

                                <h2>
                                    Recent Activity
                                </h2>

                                <p>
                                    Your latest preparation activities
                                </p>

                            </div>

                        </div>


                        <div className="activity-list-new">

                            {activities.length > 0 ? (

                                activities.slice(0, 6).map(
                                    (item) => (

                                        <div
                                            className="activity-row"
                                            key={item.activity_id}
                                        >

                                            <div className="activity-dot">

                                                <Activity
                                                    size={16}
                                                />

                                            </div>


                                            <div className="activity-content">

                                                <strong>
                                                    {item.activity_title}
                                                </strong>

                                                <span>

                                                    {item.created_at
                                                        ? new Date(
                                                            item.created_at
                                                        ).toLocaleDateString()
                                                        : ""
                                                    }

                                                </span>

                                            </div>


                                            <ChevronRight
                                                size={17}
                                                className="activity-arrow"
                                            />

                                        </div>

                                    )
                                )

                            ) : (

                                <div className="empty-activity">

                                    <Activity size={28} />

                                    <p>
                                        No recent activity yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>



                    {/* ACHIEVEMENTS */}

                    <div className="premium-card achievements-premium">

                        <div className="section-heading">

                            <div>

                                <div className="heading-label">
                                    <Trophy size={15} />
                                    MILESTONES
                                </div>

                                <h2>
                                    Achievements
                                </h2>

                                <p>
                                    {achievements.length} badges unlocked
                                </p>

                            </div>

                        </div>


                        <div className="achievement-grid">

                            {achievements.length > 0 ? (

                                achievements.slice(0, 4).map(
                                    (item) => (

                                        <div
                                            className="achievement-item"
                                            key={item.achievement_id}
                                        >

                                            <div className="badge-image-box">

                                                <img
                                                    src={getBadgeImage(
                                                        item.badge_name
                                                    )}
                                                    alt={item.badge_name}
                                                />

                                            </div>


                                            <div>

                                                <h3>
                                                    {item.badge_name}
                                                </h3>

                                                <span>
                                                    Unlocked ✓
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )

                            ) : (

                                <div className="empty-activity">

                                    <Trophy size={28} />

                                    <p>
                                        Start learning to unlock badges.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </section>



                {/* =================================================
                    PROFILE FOOTER CARD
                ================================================= */}

                <section className="profile-summary">

                    <div className="profile-summary-left">

                        <img
                            src={profile}
                            alt="Profile"
                        />


                        <div>

                            <div className="profile-name">

                                <h2>
                                    {dashboardData.user?.full_name || "Student"}
                                </h2>

                                <span>
                                    ACTIVE
                                </span>

                            </div>

                            <p>
                                {dashboardData.user?.course || "Student"} • Placement Preparation
                            </p>

                        </div>

                    </div>


                    <div className="profile-metrics">

                        <div>

                            <span>
                                Level
                            </span>

                            <strong>
                                {progress.level_no || 1}
                            </strong>

                        </div>


                        <div>

                            <span>
                                XP
                            </span>

                            <strong>
                                {progress.xp_points || 0}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Streak
                            </span>

                            <strong>
                                {progress.current_streak || 0}
                            </strong>

                        </div>

                    </div>

                </section>


            </div>

        </Layout>

    );

}