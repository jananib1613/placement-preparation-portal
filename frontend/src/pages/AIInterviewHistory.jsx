import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/AIInterviewHistory.css";


function AIInterviewHistory(){

    const [history,setHistory] = useState([]);


    useEffect(()=>{

        fetch("http://localhost:5000/api/ai-recruiter/history/2")

        .then(res=>res.json())

        .then(data=>{
            setHistory(data);
        })

        .catch(err=>{
            console.log(err);
        });


    },[]);



    return(

        <Layout>

        <div className="ai-history-page">


            <h1>
            🤖 My AI Interview History
            </h1>


            {
                history.length === 0 ?

                <h2>
                No Interviews Found
                </h2>


                :

                history.map((item,index)=>(

                <div className="history-card" key={index}>


                    <h2>
                    {item.company_name}
                    </h2>


                    <p>
                    Technical Score:
                    {item.technical_score}%
                    </p>


                    <p>
                    Communication Score:
                    {item.communication_score}%
                    </p>


                    <h3>
                    Overall Score:
                    {item.overall_score}%
                    </h3>


                    <p>
                    Date:
                    {item.created_at}
                    </p>


                </div>

                ))

            }


        </div>


        </Layout>

    )

}


export default AIInterviewHistory;