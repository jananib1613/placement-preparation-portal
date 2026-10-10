import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/technicaltest.css";


export default function TechnicalTest(){

    console.log("TechnicalTest Loaded");

    const { topicId } = useParams();

    const navigate = useNavigate();


    const [questions,setQuestions] = useState([]);

    const [currentQuestion,setCurrentQuestion] = useState(0);

    const [answers,setAnswers] = useState({});

    const [timeLeft,setTimeLeft] = useState(3600);

    const [loading,setLoading] = useState(true);



    const userId = Number(
        localStorage.getItem("userId")
    );



    useEffect(()=>{

        fetchQuestions();

    },[]);



    const fetchQuestions = async () => {
    try {

        console.log("Topic ID:", topicId);

        const res = await axios.get(
            `http://localhost:5000/api/technical/questions/${topicId}`
        );

        console.log("FULL RESPONSE:", res.data);

        setQuestions(res.data.questions || []);

    } catch (error) {

        console.log("API ERROR:", error);

    } finally {

        setLoading(false);

    }
};


    useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(timer);
                handleSubmit();
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
}, []);



    const formatTime=()=>{

        let min=Math.floor(timeLeft/60);

        let sec=timeLeft%60;


        return `${min}:${sec<10?"0":""}${sec}`;

    };





    const selectAnswer=(questionId,value)=>{


        setAnswers({

            ...answers,

            [questionId]:value

        });


    };




    const nextQuestion=()=>{


        if(currentQuestion < questions.length-1){

            setCurrentQuestion(
                currentQuestion+1
            );

        }


    };



    const previousQuestion=()=>{


        if(currentQuestion>0){

            setCurrentQuestion(
                currentQuestion-1
            );

        }


    };





    const handleSubmit=async()=>{


        const formattedAnswers =
        Object.keys(answers).map(id=>(

            {
                questionId:Number(id),
                answer:answers[id]
            }

        ));

          console.log("SUBMIT DATA", {
    userId,
    topicId,
    answers: formattedAnswers
});

        try{


            const res=await axios.post(

            "http://localhost:5000/api/technical/submit",

            {

                userId,

                topicId:Number(topicId),

                answers:formattedAnswers

            }

            );



            alert(
            `Test Completed! Score ${res.data.score}/${res.data.totalQuestions}`
            );



            navigate("/technical-result", {
    state:{
        score:res.data.score,
        totalQuestions:res.data.totalQuestions,
        percentage:res.data.percentage
    }
});


        }
        catch(error){

            console.log(error);

        }


    };





    if(loading){

        return <h2 className="loading">
        Loading Questions...
        </h2>

    }




    if(questions.length===0){

        return <h2 className="loading">
        No Questions Found
        </h2>

    }




    const question=questions[currentQuestion];

    console.log("Current Question:", question);

    if (!question) {
    return (
        <h2 className="loading">
            Question not found.
        </h2>
    );
}



return(

<div className="technical-test-page">


<div className="technical-test-header">

<h1>
💻 Technical Test
</h1>


<div className="technical-timer">

⏰ {formatTime()}

</div>


</div>




<div className="question-progress">

Question {currentQuestion+1} / {questions.length}

</div>





<div className="technical-question-card">


<h2>

{question.question}

</h2>



<div className="options">


{
[
question.option_a,
question.option_b,
question.option_c,
question.option_d

].map((option,index)=>(


<label key={index}
className="option-box"
>


<input

type="radio"

checked={
answers[question.question_id]===option
}

onChange={()=>
selectAnswer(
question.question_id,
option
)
}

/>


{option}


</label>


))

}



</div>


</div>




<div className="technical-buttons">


<button
onClick={previousQuestion}
disabled={currentQuestion===0}
>
⬅ Previous
</button>



{

currentQuestion===questions.length-1 ?

<button
onClick={handleSubmit}
>
Submit Test ✅
</button>

:

<button
onClick={nextQuestion}
>
Next ➜
</button>


}


</div>


</div>

);


}