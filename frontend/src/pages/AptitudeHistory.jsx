import {useEffect,useState} from "react";
import axios from "axios";
import "../styles/aptitudeHistory.css";


export default function AptitudeHistory(){

const [attempts,setAttempts]=useState([]);


useEffect(()=>{

axios
.get("http://localhost:5000/api/aptitude/attempts/2")
.then(res=>{
    console.log("History:", res.data);
    setAttempts(res.data);
})
.catch(err=>{
    console.log(err);
});


},[]);

console.log(attempts);

return(

<div className="history-page">

<h1>
My Aptitude Attempts
</h1>


<div className="history-container">


{
attempts.map((item,index)=>(

<div className="attempt-card" key={index}>

<h2>
{item.topic_name}
</h2>

<p>Test: {item.test_name}</p>

<p>
Score: {item.score}%
</p>

<p>
Correct: {item.correct_answers}
</p>

<p>
Wrong: {item.wrong_answers}
</p>

<p>
Accuracy: {item.accuracy}%
</p>

<p>
Time:
{item.time_taken} seconds
</p>

</div>

))
}


</div>

</div>

);

}