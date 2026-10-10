import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/codingMockTest.css";

export default function CodingMockTest() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60 * 60);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/mocktest/questions/Coding"
            );

            setQuestions(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (timeLeft <= 0) {

            submitTest();
            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const formatTime = () => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;

    };

    const handleAnswer = (option) => {

        setAnswers({

            ...answers,

            [questions[currentQuestion].question_id]: option

        });

    };

    const submitTest = async () => {

        let marks = 0;

        questions.forEach((q) => {

            if (answers[q.question_id] === q.answer) {

                marks++;

            }

        });

        const wrong = questions.length - marks;

        const percentage = Math.round(
            (marks / questions.length) * 100
        );

        try {

            await axios.post(
                "http://localhost:5000/api/mocktest/submit",
                {

                    user_id: 2,
                    category: "Coding",
                    total_questions: questions.length,
                    correct_answers: marks,
                    wrong_answers: wrong,
                    score: percentage

                }
            );

            navigate("/mocktest/coding-result", {

                state: {

                    score: percentage,
                    total_questions: questions.length,
                    correct: marks,
                    wrong: wrong

                }

            });

        } catch (err) {

            console.log(err);

        }

    };

    if (loading) {

        return <div className="loading-page">Loading Coding Questions...</div>;

    }

    if (questions.length === 0) {

        return <div className="loading-page">No Coding Questions Available</div>;

    }

    const q = questions[currentQuestion];

    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100
    );

    return (
        <div className="mock-page">

    {/* HEADER */}

    <div className="mock-header">

        <div>

            <h1>💻 Coding Challenge</h1>

            <p>Practice Coding MCQs for Placement Preparation.</p>

        </div>

        <div className="timer-box">

            ⏱ {formatTime()}

        </div>

    </div>

    {/* PROGRESS BAR */}

    <div className="progress-container">

        <div
            className="progress-fill"
            style={{
                width: `${progress}%`
            }}
        ></div>

    </div>

    {/* QUESTION NUMBER */}

    <div className="question-info">

        Question {currentQuestion + 1} of {questions.length}

    </div>

    {/* QUESTION CARD */}

    <div className="question-card">

        <h2>{q.question}</h2>

        <div className="options">

            {[

                q.option1,
                q.option2,
                q.option3,
                q.option4

            ].map((option, index) => (

                <label
                    key={index}
                    className={
                        answers[q.question_id] === option
                            ? "option active"
                            : "option"
                    }
                >

                    <input
                        type="radio"
                        name={`question-${q.question_id}`}
                        checked={answers[q.question_id] === option}
                        onChange={() => handleAnswer(option)}
                    />

                    <span>{option}</span>

                </label>

            ))}

        </div>

    </div>

    {/* QUESTION PALETTE */}

    <div className="question-palette">

        {questions.map((item, index) => (

            <button

                key={item.question_id}

                className={
                    answers[item.question_id]
                        ? "palette-btn answered"
                        : index === currentQuestion
                        ? "palette-btn current"
                        : "palette-btn"
                }

                onClick={() => setCurrentQuestion(index)}

            >

                {index + 1}

            </button>

        ))}

    </div>
        {/* NAVIGATION BUTTONS */}

    <div className="navigation-buttons">

        <button
            className="prev-btn"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
            ⬅ Previous
        </button>

        {currentQuestion < questions.length - 1 ? (

            <button
                className="next-btn"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
                Next ➜
            </button>

        ) : (

            <button
                className="submit-btn"
                onClick={submitTest}
            >
                ✅ Submit Test
            </button>

        )}

    </div>

</div>

    );

}