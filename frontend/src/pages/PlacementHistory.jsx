import {useEffect,useState} from "react";
import Layout from "../components/Layout";
import "../styles/PlacementHistory.css";


function PlacementHistory(){

const [history,setHistory]=useState([]);


useEffect(()=>{

fetch(
"http://localhost:5000/api/placement/history/2"
)

.then(res=>res.json())

.then(data=>{
setHistory(data);
})

},[]);



return(

<Layout>

<div className="history-page">

<h1>
📜 Placement Test History
</h1>


{
history.map((item,index)=>(

<div className="history-card" key={index}>


<h2>
{item.company_name}
</h2>


<p>
Round: {item.round_name}
</p>


<p>
Score: {item.score}%
</p>


<p>
Status: {item.status}
</p>


<p>
Date: {item.created_at}
</p>


</div>

))

}


</div>

</Layout>

)

}


export default PlacementHistory;