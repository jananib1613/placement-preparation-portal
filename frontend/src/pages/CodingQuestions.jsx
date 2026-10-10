import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/codingQuestions.css";


export default function CodingQuestions(){


    const location = useLocation();

console.log("Selected Problem:", location.state?.question);
const {topic}=useParams();

const navigate=useNavigate();


const [questions,setQuestions]=useState([]);



useEffect(()=>{


axios
.get(
`http://localhost:5000/api/coding/topic/${topic}`
)

.then(res=>{

console.log("Coding Questions:",res.data);

setQuestions(res.data);

})

.catch(err=>{

console.log(err);

});


},[topic]);





return(


<div className="coding-question-page">


<h1>
{topic} Questions
</h1>



<div className="question-list">


{

questions.map((q)=>(


<div

className="question-card"

key={q.question_id}

>


<h2>
{q.title}
</h2>


<p>
{q.description}
</p>



<span>
Difficulty: {q.difficulty}
</span>



<div>


<h4>
Sample Input
</h4>

<pre>
{q.sample_input}
</pre>



<h4>
Sample Output
</h4>

<pre>
{q.sample_output}
</pre>


</div>

<p>Question ID: {q.question_id}</p>

<button
onClick={() => {
    navigate(`/coding/problem/${q.question_id}`, {
        state: {
            question: q
        }
    });
}}
>
    Solve Problem
</button>



</div>


))


}


</div>


</div>


);


}