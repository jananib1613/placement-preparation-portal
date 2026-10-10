import { useLocation, useNavigate } from "react-router-dom";
import "../styles/mockTestResult.css";

export default function MockTestResult() {

    const location = useLocation();
    const navigate = useNavigate();


    const result = location.state || {};


    if (!result) {

        return (

            <div className="result-page">

                <div className="no-result-card">

                    <h2>⚠️ No Result Found</h2>

                    <p>
                        Please attempt the mock test first.
                    </p>

                    <button onClick={() => navigate("/dashboard")}>
                        Go Dashboard
                    </button>

                </div>

            </div>

        );

    }



    const percentage = result.score || 0;



    let message = "";

    if (percentage >= 80) {

        message = "🔥 Excellent Performance!";

    } 
    else if (percentage >= 50) {

        message = "👏 Good Job! Keep Improving";

    } 
    else {

        message = "💪 Practice More and Improve";

    }



    return (

        <div className="result-page">


            <div className="result-container">


                <h1>
                    🎯 Aptitude Test Result
                </h1>


                <p className="success-text">
                    Test Completed Successfully
                </p>



                <div className="score-box">


                    <div className="circle">

                        <span>
                            {percentage}%
                        </span>

                    </div>



                    <h2>
                        Your Score
                    </h2>


                    <p className="message">
                        {message}
                    </p>


                </div>





                <div className="stats-container">


                    <div className="stat-card correct">

                        <h2>
                            {result.correct}
                        </h2>

                        <p>
                            Correct Answers
                        </p>

                    </div>




                    <div className="stat-card wrong">


                        <h2>
                            {result.wrong}
                        </h2>

                        <p>
                            Wrong Answers
                        </p>


                    </div>





                    <div className="stat-card total">


                        <h2>
                            {result.total_questions}
                        </h2>

                        <p>
                            Total Questions
                        </p>


                    </div>



                </div>





                <div className="result-buttons">


                    <button
                        className="retry-btn"

                        onClick={() => 
                           
                     navigate("/mocktest/aptitude")}
                    >

                        🔄 Retry Test

                    </button>




                    <button
                        className="dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        🏠 Dashboard

                    </button>


                </div>




            </div>


        </div>

    );

}