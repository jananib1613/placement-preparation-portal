import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/codingHistory.css";


export default function CodingHistory(){

const [history,setHistory]=useState([]);



useEffect(()=>{


axios
.get("http://localhost:5000/api/coding/history/2")

.then(res=>{

console.log("Coding History:",res.data);

setHistory(res.data);

})

.catch(err=>{

console.log(err);

});


},[]);





return(

<div className="coding-history-page">


<h1>
My Coding History
</h1>



<div className="coding-history-container">


{

history.length === 0 ?


<h3>
No coding attempts yet
</h3>


:


history.map((item)=>(


<div className="coding-history-card" key={item.attempt_id}>


<h2>
{item.title}
</h2>


<p>
Topic: {item.topic}
</p>


<p>
Difficulty: {item.difficulty}
</p>


<p>
Language: {item.language}
</p>


<p>
Status: 
<span>
{item.status}
</span>
</p>


<p>
Score: {item.score}
</p>


<p>
Submitted:
{new Date(item.submitted_at).toLocaleDateString()}
</p>


</div>


))


}



</div>


</div>


);

}