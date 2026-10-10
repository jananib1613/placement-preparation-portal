import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/companyTest.css";

function CompanyTest(){

    const { company } = useParams();

    const [questions,setQuestions] = useState([]);
    const [current,setCurrent] = useState(0);
    const [selected,setSelected] = useState({});
    const [result,setResult] = useState(null);

    const [timeLeft,setTimeLeft] = useState(600);



    // Get Questions

    useEffect(() => {

    axios
    .get(`http://localhost:5000/api/company/questions/${company}`)
    .then((res) => {

        setQuestions(res.data.questions);

    })
    .catch((err) => {

        console.log(err);

    });

}, [company]);


    // Timer

    useEffect(()=>{


        if(result) return;


        const timer = setInterval(()=>{


            setTimeLeft((prev)=>{


                if(prev <= 1){

                    clearInterval(timer);

                    submitTest();

                    return 0;

                }


                return prev-1;


            });


        },1000);



        return ()=>clearInterval(timer);


    },[result]);




    const handleOption=(option)=>{


        setSelected({

            ...selected,

            [current]:option

        });


    };




    const nextQuestion=()=>{


        if(current < questions.length-1){

            setCurrent(current+1);

        }


    };




    const previousQuestion=()=>{


        if(current > 0){

            setCurrent(current-1);

        }


    };





    const submitTest=()=>{


        let score=0;


        questions.forEach((q,index)=>{


            if(selected[index] === q.answer){

                score++;

            }


        });



        const percentage=Math.round(
            (score/questions.length)*100
        );



        axios.post(
            "http://localhost:5000/api/company/attempt",
            {

                user_id:2,

                company_name:company,

                score:score,

                total_questions:questions.length,

                percentage:percentage

            }

        )
        .then(()=>{

            console.log("Attempt Saved");

        })
        .catch((err)=>{

            console.log(err);

        });




        setResult({

            score:score,

            total:questions.length,

            percentage:percentage

        });


    };





    const minutes=Math.floor(timeLeft/60);

    const seconds=timeLeft%60;




    if(questions.length===0){

        return(

            <h2>
                Loading Questions...
            </h2>

        );

    }




    if(result){


        return(

            <div className="result-box">


                <h1>
                    🎉 Test Completed
                </h1>


                <h2>
                    Company : {company}
                </h2>


                <h2>
                    Score : {result.score}/{result.total}
                </h2>


                <h2>
                    Percentage : {result.percentage}%
                </h2>


                <button
                onClick={()=>{
                    window.location.reload();
                }}
                >
                    Retake Test
                </button>


            </div>

        );


    }




    const q=questions[current];


    return(


        <div className="company-test">


            <h1>
                {company} Placement Test
            </h1>



            <div className="timer">

                ⏳ Time Left :
                {" "}
                {minutes}:
                {seconds < 10 ? "0":""}
                {seconds}

            </div>




            <div className="progress-container">


                <div
                className="progress-bar"
                style={{
                    width:`${((current+1)/questions.length)*100}%`
                }}
                >

                </div>


            </div>




            <p>

                Question {current+1} / {questions.length}

            </p>




            <div className="question-card">


                <h2>
                    {q.question}
                </h2>



                {

                [

                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d

                ]

                .map((option,index)=>(


                    <label key={index}>


                        <input

                        type="radio"

                        name="answer"

                        checked={
                            selected[current]===option
                        }

                        onChange={()=>handleOption(option)}

                        />


                        {option}


                    </label>


                ))

                }



            </div>





            <div className="buttons">


                <button
                onClick={previousQuestion}
                disabled={current===0}
                >

                    Previous

                </button>





                {

                current===questions.length-1

                ?

                <button
                onClick={submitTest}
                >

                    Submit Test

                </button>


                :

                <button
                onClick={nextQuestion}
                >

                    Next

                </button>


                }



            </div>



        </div>


    );


}


export default CompanyTest;