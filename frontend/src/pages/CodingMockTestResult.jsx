import { useLocation, useNavigate } from "react-router-dom";
import "../styles/mockResult.css";

export default function CodingMockTestResult(){

    const location = useLocation();
    const navigate = useNavigate();

    const {
    score,
    total_questions,
    correct,
    wrong
} = location.state || {};

    


    return(
        <div className="result-container">

            <div className="result-card">

                <h1>💻 Coding Test Result</h1>

                <h2>
    {correct} / {total_questions}
</h2>


<p>
    Score : {score}%
</p>


<p>
    Correct Answers : {correct}</p>


<p>
    Wrong Answers : {wrong}
</p>

               
                <button onClick={()=>navigate("/mock-test")}>
                    Back To Mock Tests
                </button>

            </div>

        </div>
    )
}