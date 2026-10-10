import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function CompanyAssessment(){

    const { companyName } = useParams();

    const [questions,setQuestions] = useState([]);
    const [current,setCurrent] = useState(0);
    const [selected,setSelected] = useState({});

    useEffect(()=>{

        axios.get(
          `http://localhost:5000/api/company/questions/${companyName}`
        )
        .then(res=>{
            setQuestions(res.data);
        })
        .catch(err=>{
            console.log(err);
        });

    },[companyName]);


    if(questions.length===0){
        return (
            <Layout>
                <h2>Loading Assessment...</h2>
            </Layout>
        )
    }


    const question = questions[current];


    return(

        <Layout>

        <div className="assessment-container">

            <h1>
                {companyName} Recruitment Assessment
            </h1>

            <h3>
                Question {current+1} / {questions.length}
            </h3>


            <div className="question-card">

                <h2>
                    {question.question}
                </h2>


                {
                [
                    question.option_a,
                    question.option_b,
                    question.option_c,
                    question.option_d

                ].map((option,index)=>(

                    <button
                    key={index}
                    onClick={()=>setSelected({
                        ...selected,
                        [current]:option
                    })}
                    >

                    {option}

                    </button>

                ))
                }


            </div>


            <div>

            <button
            disabled={current===0}
            onClick={()=>setCurrent(current-1)}
            >
                Previous
            </button>


            {
            current < questions.length-1 ?

            <button
            onClick={()=>setCurrent(current+1)}
            >
                Next
            </button>

            :

            <button>
                Submit Assessment
            </button>

            }


            </div>


        </div>


        </Layout>

    )

}


export default CompanyAssessment;