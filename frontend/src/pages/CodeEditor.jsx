import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
    FaCode,
    FaSearch,
    FaPlay,
    FaCheck,
    FaClock,
    FaStar
} from "react-icons/fa";

import "../styles/CodeEditor.css";


function CodeEditor() {

    const location = useLocation();

    // Question selected from CompanyCoding page
    const questionFromPage = location.state?.problem;


    const [search, setSearch] = useState("");

    const [language, setLanguage] = useState(
        questionFromPage?.language
            ? questionFromPage.language.toLowerCase()
            : "python"
    );

    const [code, setCode] = useState("");

    const [output, setOutput] = useState("");

    const [input, setInput] = useState("");


    // Selected coding problem
    const [selectedProblem, setSelectedProblem] = useState(
        questionFromPage || null
    );


    const [solvedProblems, setSolvedProblems] = useState([]);


    /*
    ============================================================
    UPDATE SELECTED QUESTION
    ============================================================
    */

    useEffect(() => {

        if (questionFromPage) {

            setSelectedProblem(questionFromPage);

            setLanguage(
                questionFromPage.language
                    ? questionFromPage.language.toLowerCase()
                    : "python"
            );

            setCode("");

            setOutput("");

            setInput("");

        }

    }, [questionFromPage]);


    /*
    ============================================================
    LANGUAGE CHANGE
    ============================================================
    */

    const changeLanguage = (e) => {

        setLanguage(e.target.value);

    };


    /*
    ============================================================
    RUN CODE
    ============================================================
    */

    const executeCode = () => {

        setOutput(
            "Program executed successfully ✅"
        );

    };


    /*
    ============================================================
    SUBMIT CODE
    ============================================================
    */

    const submitCode = () => {

        if (!selectedProblem) {
            return;
        }


        if (!solvedProblems.includes(selectedProblem.coding_id)) {

            setSolvedProblems([
                ...solvedProblems,
                selectedProblem.coding_id
            ]);

        }


        setOutput(
            "Accepted ✅"
        );

    };


    /*
    ============================================================
    SAFETY CHECK
    ============================================================
    */

    if (!selectedProblem) {

        return (

            <div className="editor-page">

                <div className="editor-bg bg1"></div>

                <div className="editor-bg bg2"></div>

                <div className="editor-bg bg3"></div>


                <div className="editor-header">

                    <div>

                        <h1>

                            <FaCode />

                            {" "}

                            Coding Arena

                        </h1>


                        <p>

                            No coding problem selected.

                            Please go back and select a problem.

                        </p>

                    </div>

                </div>


            </div>

        );

    }


    /*
    ============================================================
    MAIN UI
    ============================================================
    */

    return (

        <div className="editor-page">


            {/* ==================================================
                ANIMATED BACKGROUND
            ================================================== */}

            <div className="editor-bg bg1"></div>

            <div className="editor-bg bg2"></div>

            <div className="editor-bg bg3"></div>



            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="editor-header">


                <div>

                    <h1>

                        <FaCode />

                        {" "}

                        Coding Arena

                    </h1>


                    <p>

                        Practice company coding questions
                        with a real interview environment.

                    </p>

                </div>



                <div className="header-stats">


                    <div className="stat-box">

                        <span>
                            🔥
                        </span>

                        <h3>
                            8
                        </h3>

                        <p>
                            Streak
                        </p>

                    </div>



                    <div className="stat-box">

                        <span>
                            ⭐
                        </span>

                        <h3>
                            640
                        </h3>

                        <p>
                            XP
                        </p>

                    </div>



                    <div className="stat-box">

                        <span>
                            🎯
                        </span>

                        <h3>
                            92%
                        </h3>

                        <p>
                            Accuracy
                        </p>

                    </div>


                </div>


            </div>



            {/* ==================================================
                MAIN LAYOUT
            ================================================== */}

            <div className="editor-layout">



                {/* ==================================================
                    LEFT PANEL
                ================================================== */}

                <div className="problem-panel">


                    {/* Search */}

                    <div className="search-box">

                        <FaSearch />

                        <input

                            type="text"

                            placeholder="Search Problem..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                        />

                    </div>



                    <h2>

                        Coding Problem

                    </h2>



                    {/* Selected Problem */}

                    <div className="problem-card active">


                        <div>

                            <h4>

                                {
                                    solvedProblems.includes(
                                        selectedProblem.coding_id
                                    )

                                        ? "✅ "

                                        : "💻 "
                                }

                                {selectedProblem.title}

                            </h4>


                            <span>

                                {selectedProblem.difficulty}

                            </span>

                        </div>


                        <small>

                            <FaStar />

                            {" "}

                            25 XP

                        </small>


                    </div>



                </div>



                {/* ==================================================
                    CENTER EDITOR PANEL
                ================================================== */}

                <div className="editor-panel">


                    {/* Toolbar */}

                    <div className="editor-toolbar">


                        <div className="left-tools">


                            <select

                                value={language}

                                onChange={changeLanguage}

                            >

                                <option value="python">
                                    Python
                                </option>

                                <option value="cpp">
                                    C++
                                </option>

                                <option value="java">
                                    Java
                                </option>

                            </select>


                        </div>



                        <div className="right-tools">


                            <button

                                className="run-btn"

                                onClick={executeCode}

                            >

                                <FaPlay />

                                {" "}

                                Run

                            </button>



                            <button

                                className="submit-btn"

                                onClick={submitCode}

                            >

                                <FaCheck />

                                {" "}

                                Submit

                            </button>


                        </div>


                    </div>



                    {/* Monaco Editor */}

                    <Editor

                        height="520px"

                        theme="vs-dark"

                        language={
                            language === "cpp"
                                ? "cpp"
                                : language
                        }

                        value={code}

                        onChange={(value) =>
                            setCode(value || "")
                        }

                        options={{
                            minimap: {
                                enabled: false
                            },

                            fontSize: 15,

                            automaticLayout: true,

                            scrollBeyondLastLine: false

                        }}

                    />


                </div>



                {/* ==================================================
                    RIGHT DETAILS PANEL
                ================================================== */}

                <div className="details-panel">


                    {/* ==================================================
                        TITLE
                    ================================================== */}

                    <div className="glass-card">


                        <h2>

                            💻 {selectedProblem.title}

                        </h2>


                        <span

                            className={
                                `difficulty-badge ${
                                    selectedProblem.difficulty
                                        ?.toLowerCase() || "easy"
                                }`
                            }

                        >

                            {selectedProblem.difficulty}

                        </span>


                    </div>



                    {/* ==================================================
                        COMPANY
                    ================================================== */}

                    {selectedProblem.company_name && (

                        <div className="glass-card">


                            <h3>
                                🏢 Company
                            </h3>


                            <p>

                                {selectedProblem.company_name}

                            </p>


                        </div>

                    )}



                    {/* ==================================================
                        PROBLEM DESCRIPTION
                    ================================================== */}

                    <div className="glass-card">


                        <h3>

                            📄 Problem Description

                        </h3>


                        <p>

                            {selectedProblem.problem ||
                                "No Problem Description Available"}

                        </p>


                    </div>



                    {/* ==================================================
                        CONSTRAINTS
                    ================================================== */}

                    <div className="glass-card">


                        <h3>

                            ⚠ Constraints

                        </h3>


                        <ul>


                            <li>

                                1 ≤ N ≤ 100000

                            </li>


                            <li>

                                Time Limit : 1 sec

                            </li>


                            <li>

                                Memory Limit : 256 MB

                            </li>


                            <li>

                                Expected Complexity : O(n)

                            </li>


                        </ul>


                    </div>



                    {/* ==================================================
                        SAMPLE INPUT
                    ================================================== */}

                    <div className="glass-card">


                        <h3>

                            📥 Sample Input

                        </h3>


                        <pre>

                            {
                                selectedProblem.sample_input ||
                                "No Sample Input"
                            }

                        </pre>


                    </div>



                    {/* ==================================================
                        SAMPLE OUTPUT
                    ================================================== */}

                    <div className="glass-card">


                        <h3>

                            📤 Sample Output

                        </h3>


                        <pre>

                            {
                                selectedProblem.sample_output ||
                                "No Sample Output"
                            }

                        </pre>


                    </div>



                    {/* ==================================================
                        EXPLANATION
                    ================================================== */}

                    <div className="glass-card">


                        <h3>

                            💡 Explanation

                        </h3>


                        <pre>

                            {
                                selectedProblem.explanation ||
                                "No Explanation Available"
                            }

                        </pre>


                    </div>



                    {/* ==================================================
                        COMPILER
                    ================================================== */}

                    <div className="glass-card compiler-card">


                        <h3>

                            ⚙ Compiler

                        </h3>


                        <label>

                            Input

                        </label>


                        <textarea

                            className="compiler-input"

                            placeholder="Enter custom input..."

                            value={input}

                            onChange={(e) =>
                                setInput(e.target.value)
                            }

                        />



                        <label>

                            Output

                        </label>


                        <pre className="compiler-output">

                            {
                                output ||
                                "Run your program to view output..."
                            }

                        </pre>


                    </div>



                    {/* ==================================================
                        SUBMISSION STATUS
                    ================================================== */}

                    <div className="glass-card status-card">


                        <h3>

                            🚀 Submission Status

                        </h3>



                        <div className="status-grid">


                            <div>

                                <span>
                                    Runtime
                                </span>

                                <strong>
                                    0.02 sec
                                </strong>

                            </div>



                            <div>

                                <span>
                                    Memory
                                </span>

                                <strong>
                                    12 MB
                                </strong>

                            </div>



                            <div>

                                <span>
                                    Test Cases
                                </span>

                                <strong>
                                    10 / 10
                                </strong>

                            </div>



                            <div>

                                <span>
                                    Status
                                </span>

                                <strong className="accepted">

                                    {
                                        output === "Accepted ✅"
                                            ? "Accepted ✅"
                                            : "Ready"
                                    }

                                </strong>

                            </div>


                        </div>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default CodeEditor;