import { useLocation, useNavigate } from "react-router-dom";

import "../styles/aptitudeResult.css";

export default function AptitudeResult() {

    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state;
    const topicId = result.topicId;

    if(!result){
        return (
            <div>
                <h2>No Result Found</h2>
                <button onClick={()=>navigate("/aptitude")}>
                    Back to Aptitude
                </button>
            </div>
        );
    }




    return (

        <div className="result-page">

            <div className="result-card">

                <h1>🎯 Test Completed</h1>

                <h2>Your Score</h2>

                <div className="score-circle">
                    {result.score}%
                </div>


                <div className="result-details">

                    <div>
                        <h3>Total Questions</h3>
                        <p>{result.total_questions}</p>
                    </div>


                    <div>
                        <h3>Correct</h3>
                        <p>{result.correct_answers}</p>
                    </div>


                    <div>
                        <h3>Wrong</h3>
                        <p>{result.wrong_answers}</p>
                    </div>


                    <div>
                        <h3>Accuracy</h3>
                        <p>{result.accuracy}%</p>
                    </div>


                    <div>
                        <h3>Time Taken</h3>
                        <p>
                            {Math.floor(result.time_taken/60)} min
                            {" "}
                            {result.time_taken%60} sec
                        </p>
                    </div>

                </div>



                <div className="result-buttons">

                    <button
    className="back-btn"
    onClick={() => navigate("/aptitude")}
>
    Back To Aptitude
</button>

<button
    className="retake-btn"
    onClick={() => navigate(`/aptitude-test/${topicId}`)}
>
    Retake Test
</button>


                </div>


            </div>

        </div>

    );
}