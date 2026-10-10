import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import "../styles/AIRecruiter.css";


function AIRecruiter() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [company, setCompany] = useState("");


    useEffect(()=>{

        const selectedCompany = localStorage.getItem("company");

        setCompany(selectedCompany);


        fetch(
            `http://localhost:5000/api/ai-recruiter/questions/${selectedCompany}`
        )

        .then(res=>res.json())

        .then(data=>{

            setQuestions(data);

        })

        .catch(err=>{
            console.log(err);
        });


    },[]);



    const submitAnswer = ()=>{


        const currentAnswer = {

            question: questions[current].question,

            answer: answer

        };


        const updatedAnswers = [

            ...answers,

            currentAnswer

        ];


        setAnswers(updatedAnswers);

        setAnswer("");



        if(current < questions.length-1){

            setCurrent(current+1);

        }

        else{


            // AI evaluation

            fetch(
                "http://localhost:5000/api/ai-recruiter/evaluate",
                {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    answers: updatedAnswers

                })

            })

            .then(res=>res.json())

            .then(data=>{


                // Save AI result

                localStorage.setItem(
                    "aiResult",
                    JSON.stringify(data)
                );

                console.log("History Data:",{

userId: localStorage.getItem("userId"),

companyId: localStorage.getItem("companyId"),

companyName: company,

score:data.overall

});

                // Save placement history

                axios.post(

                "http://localhost:5000/api/placement/history",

                {

                    userId: localStorage.getItem("userId"),

                    companyId: localStorage.getItem("companyId"),

                    companyName: company,

                    roundName:"AI Recruiter",

                    score:data.overall || 0,

                    status:"Completed"

                }

                )

                .then(()=>{

                    console.log("AI history saved");

                })

                .catch(err=>{

                    console.log(
                        "History error",
                        err
                    );

                });



                navigate("/ai-result");


            })


            .catch(err=>{

                console.log(err);

            });


        }


    };



    if(questions.length===0){

        return(

            <Layout>

                <h2>
                    Loading AI Interview...
                </h2>

            </Layout>

        );

    }



    const question = questions[current];



    return(

        <Layout>


        <div className="ai-recruiter-page">


            <div className="ai-header">


                <h1>
                    🤖 AI Recruiter
                </h1>


                <p>
                    Company: {company}
                </p>


                <p>
                    Round: Technical + HR Interview
                </p>


                <h3>
                    Question {current+1}/{questions.length}
                </h3>


            </div>



            <div className="interview-box">


                <div className="ai-message">


                    <h3>
                        AI Recruiter
                    </h3>


                    <p>
                        {question.question}
                    </p>


                    <small>
                        Category: {question.category}
                    </small>


                </div>




                <div className="answer-section">


                    <textarea

                    value={answer}

                    onChange={(e)=>
                        setAnswer(e.target.value)
                    }

                    placeholder="Type your answer..."

                    />



                    <button
                    onClick={submitAnswer}
                    >

                    Submit Answer

                    </button>



                </div>


            </div>


        </div>


        </Layout>

    );

}


export default AIRecruiter;