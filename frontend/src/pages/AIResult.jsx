import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/AIResult.css";


function AIResult(){

    const [result,setResult] = useState(null);


    useEffect(()=>{

        const data = localStorage.getItem("aiResult");

        if(data){

            setResult(JSON.parse(data));

        }

    },[]);



    if(!result){

        return(
            <Layout>
                <h2>Loading Result...</h2>
            </Layout>
        )

    }



    return(

        <Layout>

        <div className="ai-result-page">


            <h1>
            🤖 AI Recruiter Report
            </h1>


            <div className="result-card">


                <h2>
                Interview Completed Successfully
                </h2>


                <h3>
                Technical Knowledge:
                {result.technicalScore}%
                </h3>


                <h3>
                Communication:
                {result.communicationScore}%
                </h3>


                <h1>
                Overall Score:
                {result.overall}%
                </h1>



                <h2>
                AI Feedback
                </h2>


                {
                    result.feedback.map((item,index)=>(

                        <p key={index}>
                        ✅ {item}
                        </p>

                    ))
                }


            </div>


        </div>


        </Layout>

    )

}


export default AIResult;