import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/aptitudeTest.css";

export default function AptitudeTest() {

    const navigate = useNavigate();
    const { topicId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(900); // 15 Minutes
    const [loading, setLoading] = useState(true);

    /* ================= FETCH QUESTIONS ================= */

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/aptitude/questions/${topicId}`)
            .then((res) => {

                setQuestions(res.data);
                setLoading(false);

            })
            .catch((err) => {

                console.log(err);
                setLoading(false);

            });

    }, [topicId]);



    /* ================= TIMER ================= */

    useEffect(() => {

        if (loading) return;

        if (timeLeft <= 0) {

            submitTest();
            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, loading]);



    /* ================= FORMAT TIMER ================= */

    const formatTime = () => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    };



    /* ================= SELECT ANSWER ================= */

    const selectAnswer = (option) => {

        setSelectedAnswers((prev) => ({

            ...prev,

            [currentQuestion]: option,

        }));

    };



    /* ================= SUBMIT TEST ================= */

    const submitTest = () => {

        console.log("Selected Answers:", selectedAnswers);
        console.log("Questions:", questions);

        let correct = 0;

        questions.forEach((q, index) => {

            if (selectedAnswers[index] === q.answer) {

                correct++;

            }

        });

        const score = Math.round(

            (correct / questions.length) * 100

        );

        const data = {

            user_id: 2,
            test_id: Number(topicId),
            score: score,
            total_questions: questions.length,
            correct_answers: correct,
            wrong_answers: questions.length - correct,
            accuracy: score,
            time_taken: 900 - timeLeft,

        };

        axios
            .post(
                "http://localhost:5000/api/aptitude/submit",
                data
            )
                        .then(() => {

                navigate("/aptitude-result", {

                    state: {

                        topicId: topicId,
                        score: score,
                        total_questions: questions.length,
                        correct_answers: correct,
                        wrong_answers: questions.length - correct,
                        accuracy: score,
                        time_taken: 900 - timeLeft

                    }

                });

            })

            .catch((err) => {

                console.log(err);

            });

    };



    /* ================= LOADING ================= */

    if (loading) {

        return <h2>Loading Questions...</h2>;

    }



    if (questions.length === 0) {

        return <h2>No Questions Available</h2>;

    }



    const question = questions[currentQuestion];



    return (

<div className="aptitude-test-page">


    {/* ================= HEADER ================= */}


    <div className="test-header">


        <div>


            <h1>
                🚀 Aptitude AI Arena
            </h1>


            <p>
                Practice aptitude questions and improve your placement readiness
            </p>



            <div className="topic-badge">

                Question Based Assessment

            </div>


        </div>



        <h2>

            ⏱ {formatTime()}

        </h2>



    </div>






    {/* ================= PROGRESS ================= */}



    <div className="progress-card">


        <span>

        Question {currentQuestion + 1} / {questions.length}

        </span>



        <span>

        Progress :

        {Math.round(
        ((currentQuestion+1)/questions.length)*100
        )}%

        </span>



    </div>







    {/* ================= QUESTION ================= */}



    <div className="mcq-card">



        <h3>


            <span>

            Q{currentQuestion + 1}

            </span>


            {question.question}


        </h3>







        {/* OPTIONS */}



        <div className="options-container">

    {[
        question.option1,
        question.option2,
        question.option3,
        question.option4
    ].map((option, index) => (

        <div
            key={index}
            className={
                selectedAnswers[currentQuestion] === option
                    ? "option selected"
                    : "option"
            }
            onClick={() => selectAnswer(option)}
        >

            <div className="option-letter">
                {String.fromCharCode(65 + index)}
            </div>

            <div className="option-content">
                {option}
            </div>

            <div className="option-arrow">

             {selectedAnswers[currentQuestion] === option ? "✓" : "›"}

            </div>

        </div>

    ))}

</div>






        {/* BUTTONS */}




        <div className="button-group">


        {currentQuestion > 0 && (

<button
className="prev-btn"
onClick={() => setCurrentQuestion(currentQuestion - 1)}
>

← Previous

</button>

)}

{currentQuestion < questions.length - 1 ? (

<button
className="next-btn"
onClick={() => setCurrentQuestion(currentQuestion + 1)}
>

Next →

</button>

) : (

<button
className="submit-test-btn"
onClick={submitTest}
>

Submit Test ✓

</button>

)}



        </div>





    </div>





</div>

);
}
                