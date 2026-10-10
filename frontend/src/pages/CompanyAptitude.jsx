import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/companyAptitude.css";


function CompanyAptitude(){

    const {company}=useParams();


    const [questions,setQuestions]=useState([]);

    const [current,setCurrent]=useState(0);

    const [selected,setSelected]=useState({});

    const [result,setResult]=useState(null);



    useEffect(()=>{


        axios
        .get(
        `http://localhost:5000/api/company/aptitude/${company}`
        )

        .then((res)=>{

            setQuestions(res.data.questions);

        })

        .catch((err)=>{

            console.log(err);

        });


    },[company]);




    const selectOption=(option)=>{


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





    const submitTest=()=>{


        let score=0;


        questions.forEach((q,index)=>{


            if(selected[index]===q.answer){

                score++;

            }


        });



        setResult({

            score:score,

            total:questions.length

        });


    };





    if(questions.length===0){

        return <h2>Loading Questions...</h2>

    }





    if(result){

        return(

            <div className="apt-result">


                <h1>
                    Test Completed 🎉
                </h1>


                <h2>
                    Score : {result.score}/{result.total}
                </h2>


                <h2>
                    Percentage :
                    {" "}
                    {
                    Math.round(
                    (result.score/result.total)*100
                    )
                    }%
                </h2>


            </div>

        );

    }





    const q=questions[current];



    return(

        <div className="aptitude-page">


            <h1>
                {company} Aptitude Practice
            </h1>



            <p>
                Question {current+1}/{questions.length}
            </p>




            <div className="apt-card">


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

                        onChange={()=>
                            selectOption(option)
                        }

                        />


                        {option}


                    </label>


                ))

                }



            </div>





            {

            current===questions.length-1

            ?

            <button
            className="submit-btn"
            onClick={submitTest}
            >
                Submit Test
            </button>


            :

            <button
            className="submit-btn"
            onClick={nextQuestion}
            >
                Next
            </button>

            }



        </div>

    );

}


export default CompanyAptitude;