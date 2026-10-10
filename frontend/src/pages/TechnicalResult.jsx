import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/technicalresult.css";


export default function TechnicalResult(){


    const location = useLocation();

    const navigate = useNavigate();


    const {
        score,
        totalQuestions,
        percentage
    } = location.state || {};



    let status="";


    if(percentage>=80){

        status="Excellent 🎯";

    }
    else if(percentage>=60){

        status="Good 👍";

    }
    else{

        status="Need More Practice 📚";

    }




    return(

        <div className="technical-result-page">


            <div className="result-card">


                <h1>
                    🎉 Technical Test Completed
                </h1>


                <div className="score-circle">

                    {Math.round(percentage)}%

                </div>


                <h2>
                    {status}
                </h2>



                <div className="result-details">


                    <div>
                        <h3>
                            Score
                        </h3>

                        <p>
                            {score} / {totalQuestions}
                        </p>

                    </div>



                    <div>

                        <h3>
                            Percentage
                        </h3>

                        <p>
                            {Math.round(percentage)}%
                        </p>

                    </div>


                </div>



                <div className="result-buttons">


                    <button
                    onClick={()=>
                    navigate("/technical-topics")
                    }
                    >
                        Try Again 🔄
                    </button>



                    <button
                    onClick={()=>
                    navigate("/technical-history")
                    }
                    >
                        View History 📊
                    </button>


                </div>



            </div>


        </div>

    );

}