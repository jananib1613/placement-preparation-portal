import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/placementjourney.css";

export default function PlacementJourney() {

    const { companyId } = useParams();

    const navigate = useNavigate();

    const [rounds, setRounds] = useState([]);
    const [company, setCompany] = useState(null);

    useEffect(() => {
    if (companyId) {
        fetchCompany();
        fetchRounds();
    }
}, [companyId]);

    const fetchCompany = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/placement/companies"
            );

            const selected = res.data.companies.find(
                c => c.company_id == companyId
            );

            setCompany(selected);

        }
        catch (err) {

            console.log(err);

        }

    };

    const fetchRounds = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/placement/rounds/${companyId}`
            );

            setRounds(res.data.rounds);

        }
        catch (err) {

            console.log(err);

        }

    };

  const startAssessment = async () => {

    try {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first.");
            return;
        }

        const res = await axios.post(
            "http://localhost:5000/api/placement/start",
            {
                userId,
                companyId
            }
        );

        console.log(res.data);

        navigate("/mocktest/aptitude/general");

    } catch (err) {

        console.log(err);

        alert("Unable to start recruitment.");

    }

};

    return (

        <div className="journey-page">

            <div className="journey-card">

                <h1>

                    🤖 AI Recruiter

                </h1>

                <h2>

                    Welcome to {company?.company_name} Recruitment

                </h2>

                <p>

                    Congratulations!

                    You have been shortlisted for the recruitment process.

                </p>

                <div className="process-box">

                    <h3>

                        Recruitment Process

                    </h3>

                    {

                        rounds.map((round, index) => (

                            <div
                                className={
                                    index === 0
                                        ? "round unlocked"
                                        : "round locked"
                                }
                                key={round.round_id}
                            >

                                <span>

                                    {index === 0 ? "🟢" : "🔒"}

                                </span>

                                {round.round_name}

                            </div>

                        ))

                    }

                </div>

                <div className="info-box">

                    <p>⏱ Estimated Time : 90 Minutes</p>

                    <p>🏆 Pass all rounds to receive your Offer Letter.</p>

                </div>

                <button

onClick={()=>{

localStorage.setItem(
"company",
company.company_name
);


localStorage.setItem(
"companyId",
companyId
);


navigate("/ai-recruiter");

}}

>
Begin Assessment Now
</button>

            </div>

        </div>

    );

}