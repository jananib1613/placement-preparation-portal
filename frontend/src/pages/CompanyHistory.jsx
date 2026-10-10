import React,{useEffect,useState} from "react";
import axios from "axios";


function CompanyHistory(){


const [attempts,setAttempts]=useState([]);



useEffect(()=>{


axios
.get("http://localhost:5000/api/company/attempts/2")

.then((res)=>{

setAttempts(res.data.attempts);

})

.catch((err)=>{

console.log(err);

});


},[]);



return(

<div>


<h1>
Company Test History
</h1>


{
attempts.map((item)=>(


<div className="history-card"
key={item.attempt_id}>


<h2>
{item.company_name}
</h2>


<p>
Score : {item.score}/{item.total_questions}
</p>


<p>
Percentage : {item.percentage}%
</p>


<p>
Date : {item.attempted_date}
</p>


</div>


))
}



</div>

);


}


export default CompanyHistory;