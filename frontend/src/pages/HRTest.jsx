import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/hrtest.css";

export default function HRTest() {

    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/hr/questions"
            );

            setQuestions(res.data.questions);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(timer);
                    handleSubmit();

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [answers]);

    const formatTime = () => {

        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;

        return `${min}:${sec < 10 ? "0" : ""}${sec}`;

    };

    const handleAnswer = (value) => {

        setAnswers({

            ...answers,

            [questions[currentQuestion].question_id]: value

        });

    };

    const nextQuestion = () => {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

        }

    };

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(currentQuestion - 1);

        }

    };
        const handleSubmit = async () => {

        try {

            const formattedAnswers = Object.keys(answers).map((questionId) => ({
                questionId: Number(questionId),
                answer: answers[questionId]
            }));

            await axios.post(
                "http://localhost:5000/api/hr/submit",
                {
                    userId,
                    answers: formattedAnswers
                }
            );

            alert("🎉 HR Test Submitted Successfully!");
            
            navigate("/hr-history");
        } catch (error) {

            console.error(error);
            alert("Submission Failed!");

        }

    };

    if (loading) {

        return (
            <div className="hr-loading">
                Loading HR Questions...
            </div>
        );

    }

    if (questions.length === 0) {

        return (
            <div className="hr-loading">
                No HR Questions Available.
            </div>
        );

    }

    const question = questions[currentQuestion];

    return (

        <div className="hr-page">

            {/* Header */}

            <div className="hr-header">

                <h1>💼 HR Interview Mock Test</h1>

                <div className="hr-timer">

                    ⏰ {formatTime()}

                </div>

            </div>

            {/* Progress */}

            <div className="hr-progress">

                Question {currentQuestion + 1} of {questions.length}

            </div>

            {/* Question Card */}

            <div className="hr-card">

                <span className="difficulty">

                    {question.difficulty}

                </span>

                <h2>

                    {question.question}

                </h2>

                <textarea

                    rows="8"

                    placeholder="Type your answer here..."

                    value={
                        answers[question.question_id] || ""
                    }

                    onChange={(e) =>
                        handleAnswer(e.target.value)
                    }

                />

            </div>

            {/* Buttons */}

            <div className="hr-buttons">

    <button
        className="prev-btn"
        disabled={currentQuestion === 0}
        onClick={previousQuestion}
    >
        ⬅ Previous
    </button>

    {
        currentQuestion === questions.length - 1 ?

        (

            <button
                className="submit-btn"
                onClick={handleSubmit}
            >
                ✅ Submit Test
            </button>

        )

        :

        (

            <button
                className="next-btn"
                onClick={nextQuestion}
            >
                Next ➜
            </button>

        )

    }

    
  <button
    className="history-btn"
    onClick={() => navigate("/hr-history")}
>
    💼 HR History
</button>


</div>

        </div>

    );

}