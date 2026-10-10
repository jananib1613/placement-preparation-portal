import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/interview.css";


function HRInterview(){

    const {company}=useParams();

    const [questions,setQuestions]=useState([]);



    useEffect(()=>{


        axios
        .get(
        `http://localhost:5000/api/company/interview/${company}/HR`
        )

        .then((res)=>{

            setQuestions(res.data.questions);

        })

        .catch((err)=>{

            console.log(err);

        });


    },[company]);




    return(

        <div className="interview-page">


            <h1>
                {company} HR Interview
            </h1>


            <p>
                Prepare common HR interview questions
            </p>



            <div className="interview-container">


            {
                questions.map((item,index)=>(


                    <div 
                    className="interview-card"
                    key={item.question_id}
                    >


                        <h2>

                        {index+1}. {item.question}

                        </h2>



                        <div className="answer">


                            <h3>
                                Answer:
                            </h3>


                            <p>
                                {item.answer}
                            </p>


                        </div>



                    </div>


                ))
            }


            </div>


        </div>

    );

}


export default HRInterview;