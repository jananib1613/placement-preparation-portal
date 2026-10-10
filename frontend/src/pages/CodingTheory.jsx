import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/codingTheory.css";


export default function CodingTheory() {


    const { topic } = useParams();


    const [questions, setQuestions] = useState([]);

    const [answers, setAnswers] = useState({});

    const [score, setScore] = useState(null);



    useEffect(()=>{

        fetchQuestions();

    },[topic]);





    const fetchQuestions = async()=>{


        try{


            const res = await axios.get(
                `http://localhost:5000/api/coding/theory/${topic}`
            );


            console.log("Theory Questions:",res.data);


            setQuestions(res.data);

            setAnswers({});

            setScore(null);


        }

        catch(error){

            console.log(error);

        }


    };






    const selectAnswer=(id,value)=>{


        setAnswers((prev)=>({

            ...prev,

            [id]:value

        }));


    };







    const submitTest=async()=>{


        let marks=0;



        questions.forEach((q)=>{


            if(answers[q.id]===q.correct_answer){

                marks++;

            }


        });



        setScore(marks);



        try{


            await axios.post(

                "http://localhost:5000/api/theory/submit",

                {

                    user_id:2,

                    topic:topic,

                    score:marks,

                    total_questions:questions.length

                }

            );



            alert("Theory test submitted successfully!");



        }

        catch(error){


            console.log(error);


            alert("Failed to save result");


        }



    };







return(


<div className="theory-page">



    {/* CREATIVE HEADER */}


    <div className="theory-header">


        <h1>

            {topic} Theory Challenge 🚀

        </h1>



        <p>

            Master programming concepts and prepare for placement interviews

        </p>



        <div className="topic-badge">

            💻 Placement Preparation | MCQ Practice

        </div>



    </div>







    {/* PROGRESS */}


    <div className="progress-card">


        <span>

            📚 Total Questions : {questions.length}

        </span>



        <span>

            ✅ Answered : {Object.keys(answers).length}

        </span>


    </div>







    {


    questions.length===0 ?



    (

        <h2 className="no-question">

            No questions available for this topic

        </h2>

    )



    :



    questions.map((q,index)=>(


        <div 
        className="mcq-card"
        key={q.id}
        >



            <h3>


                <span>

                    Q{index+1}

                </span>


                {q.question}


            </h3>






            <div className="options">



            {


            [

                {

                    key:"A",

                    value:q.option_a

                },

                {

                    key:"B",

                    value:q.option_b

                },

                {

                    key:"C",

                    value:q.option_c

                },

                {

                    key:"D",

                    value:q.option_d

                }


            ].map((option)=>(



                <label

                key={option.key}

                className={

                    answers[q.id]===option.key

                    ?

                    "option selected"

                    :

                    "option"

                }


                >



                <input

                type="radio"


                name={`question-${q.id}`}


                checked={

                    answers[q.id]===option.key

                }


                onChange={()=>selectAnswer(

                    q.id,

                    option.key

                )}


                />



                <b>

                    {option.key}.

                </b>


                {option.value}



                </label>



            ))


            }



            </div>





        </div>


    ))


    }








{

questions.length>0 &&



<button

className="submit-test-btn"

onClick={submitTest}


>


    Submit Theory Test 🚀


</button>


}







{

score!==null &&


<div className="score-card">


    <h2>

        🎉 Test Completed

    </h2>



    <h1>

        {score} / {questions.length}

    </h1>



    <p>

        Keep practicing and improve your coding skills 🚀

    </p>



</div>



}



</div>


);



}