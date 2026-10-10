import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/companyCoding.css";

import {
    FaSearch,
    FaCode,
    FaFire,
    FaStar,
    FaLaptopCode,
    FaClock,
    FaChartLine,
    FaArrowRight
} from "react-icons/fa";

function CompanyCoding() {

    const { company } = useParams();

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/company/coding/${company}`)
            .then((res) => {

                setQuestions(res.data.questions);
                setFilteredQuestions(res.data.questions);

            })
            .catch((err) => {

                console.log(err);

            });

    }, [company]);

    useEffect(() => {

        let data = [...questions];

        if (difficulty !== "All") {

            data = data.filter(
                q => q.difficulty.toLowerCase() === difficulty.toLowerCase()
            );

        }

        if (search !== "") {

            data = data.filter(q =>
                q.title.toLowerCase().includes(search.toLowerCase())
            );

        }

        setFilteredQuestions(data);

    }, [search, difficulty, questions]);

    return (

        <div className="coding-page">

            {/* Animated Background */}

            <div className="bg-circle one"></div>
            <div className="bg-circle two"></div>
            <div className="bg-circle three"></div>

            {/* Hero */}

            <div className="coding-hero">

                <div>

                    <h1>

                        <FaCode />

                        {" "}
                        {company} Coding Interview Preparation

                    </h1>

                    <p>

                        Practice the most frequently asked coding interview
                        questions and improve your placement readiness.

                    </p>

                </div>

                <div className="hero-streak">

                    <FaFire />

                    12 Day Streak

                </div>

            </div>

            {/* Dashboard */}

            <div className="dashboard-grid">

                <div className="dashboard-card">

                    <h2>{questions.length}</h2>

                    <p>Total Problems</p>

                </div>

                <div className="dashboard-card">

                    <h2>92%</h2>

                    <p>Success Rate</p>

                </div>

                <div className="dashboard-card">

                    <h2>640 XP</h2>

                    <p>Experience</p>

                </div>

                <div className="dashboard-card">

                    <h2>8</h2>

                    <p>Solved</p>

                </div>

            </div>

            {/* Search */}

            <div className="search-section">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search coding problem..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>

                <div className="difficulty-filter">

                    {

                        ["All", "Easy", "Medium", "Hard"].map(level => (

                            <button

                                key={level}

                                className={
                                    difficulty === level
                                        ? "filter-btn active"
                                        : "filter-btn"
                                }

                                onClick={() =>
                                    setDifficulty(level)
                                }

                            >

                                {level}

                            </button>

                        ))

                    }

                </div>

            </div>

            {/* Cards */}

            <div className="coding-grid">

                {

                    filteredQuestions.map((item, index) => (

                        <div
                            className="coding-card"
                            key={item.coding_id}
                        >

                            <div className="top-row">

                                <span className="question-number">

                                    #{index + 1}

                                </span>

                                <span className="company-badge">

                                    {company}

                                </span>

                            </div>

                            <h2>

                                <FaLaptopCode />

                                {" "}

                                {item.title}

                            </h2>

                            <p className="problem-text">

                                {item.problem}

                            </p>

                            <div className="card-tags">

                                <span
                                    className={`difficulty ${item.difficulty.toLowerCase()}`}
                                >

                                    {item.difficulty}

                                </span>

                                <span>

                                    <FaClock />

                                    {" "}
                                    15 mins

                                </span>

                                <span>

                                    <FaStar />

                                    {" "}
                                    25 XP

                                </span>

                            </div>

                            <div className="success-rate">

                                <FaChartLine />

                                {" "}

                                92% Candidates Solved

                            </div>

                            <button

                                className="solve-btn"

                                onClick={() =>
                                    navigate(
                                        "/coding-editor",
                                        {
                                            state: {
                                                problem: item
                                            }
                                        }
                                    )
                                }

                            >

                                Solve Problem

                                <FaArrowRight />

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default CompanyCoding;
