import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/aptitudeMockTest.css";


export default function AptitudeMockTest() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [timeLeft, setTimeLeft] = useState(900);


    useEffect(() => {

        fetchQuestions();

    }, []);



    const fetchQuestions = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/mocktest/questions/Aptitude"
            );

            setQuestions(res.data);

        } 
        catch (err) {

            console.log(err);
            alert("Unable to load questions.");

        } 
        finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        if (loading) return;


        if (timeLeft <= 0) {

            handleSubmit();
            return;

        }


        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        },1000);


        return () => clearInterval(timer);


    }, [timeLeft, loading]);




    const formatTime = () => {

        const min = Math.floor(timeLeft / 60);

        const sec = timeLeft % 60;


        return `${min}:${sec.toString().padStart(2,"0")}`;

    };




    const handleOptionClick = (option) => {

        setSelectedAnswers({

            ...selectedAnswers,

            [currentQuestion]: option

        });

    };




    const handleNext = () => {

        if(currentQuestion < questions.length - 1){

            setCurrentQuestion(currentQuestion + 1);

        }

    };




    const handlePrevious = () => {

        if(currentQuestion > 0){

            setCurrentQuestion(currentQuestion - 1);

        }

    };




    const handleSubmit = async () => {

    let correct = 0;


    questions.forEach((question, index) => {

        const selected = selectedAnswers[index];


        if(selected === question.answer){

            correct++;

        }

    });



    const total = questions.length;

    const wrong = total - correct;


    const score = Math.round(
        (correct / total) * 100
    );



    console.log("TOTAL:", total);
    console.log("CORRECT:", correct);
    console.log("WRONG:", wrong);
    console.log("SCORE:", score);



    try {

        await axios.post(

            "http://localhost:5000/api/mocktest/submit",

            {

                user_id: localStorage.getItem("userId"),

                category:"Aptitude",

                total_questions: total,

                correct_answers: correct,

                wrong_answers: wrong,

                score: score

            }

        );



        navigate("/mocktest-result",{

            state:{

                score:score,

                correct:correct,

                wrong:wrong,

                total_questions:total

            }

        });



    }
    catch(err){

        console.log(err);

        alert("Result saving failed");

    }

};


    if(loading){

        return (

            <div className="loading">

                Loading Questions...

            </div>

        );

    }




    if(questions.length === 0){

        return (

            <div className="loading">

                No Questions Available

            </div>

        );

    }




    const question = questions[currentQuestion];




    return (

        <div className="mock-test-page">


            <div className="mock-header">


                <h1>
                    Aptitude Mock Test
                </h1>


                <div className="timer">

                    ⏳ {formatTime()}

                </div>


            </div>




            <div className="question-count">


                Question {currentQuestion + 1} of {questions.length}


            </div>





            <div className="question-card">


                <h2>

                    {question.question}

                </h2>




                <div className="options">


                    {[

                        question.option1,
                        question.option2,
                        question.option3,
                        question.option4


                    ].map((option,index)=>(



                        <button

                            key={index}

                            className={

                                selectedAnswers[currentQuestion] === option

                                ? "option selected"

                                : "option"

                            }


                            onClick={()=>handleOptionClick(option)}

                        >


                            {option}


                        </button>



                    ))}



                </div>


            </div>






            <div className="navigation-buttons">



                <button

                    className="previous-btn"

                    onClick={handlePrevious}

                    disabled={currentQuestion===0}

                >

                    ⬅ Previous

                </button>





                {

                    currentQuestion === questions.length-1 ?


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

                            onClick={handleNext}

                        >

                            Next ➜

                        </button>

                    )


                }



            </div>



        </div>

    );

}