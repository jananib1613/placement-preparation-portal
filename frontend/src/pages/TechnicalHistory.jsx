import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/technicalhistory.css";

export default function TechnicalHistory() {

    const [history, setHistory] = useState([]);

    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/technical/history/${userId}`
            );

            setHistory(res.data.history);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="technical-history-page">

            <h1>📜 Technical Test History</h1>

            {
                history.length === 0 ?

                (

                    <div className="no-history">

                        No Technical Tests Attempted Yet

                    </div>

                )

                :

                (

                    <div className="history-grid">

                        {

                            history.map((item) => (

                                <div
                                    className="history-card"
                                    key={item.attempt_id}
                                >

                                    <h2>{item.topic_name}</h2>

                                    <p>
                                        <strong>Score:</strong>{" "}
                                        {item.score}/{item.total_questions}
                                    </p>

                                    <p>
                                        <strong>Percentage:</strong>{" "}
                                        {item.percentage}%
                                    </p>

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(item.attempt_date).toLocaleString()}
                                    </p>

                                    <div
                                        className={
                                            item.percentage >= 60
                                                ? "pass"
                                                : "fail"
                                        }
                                    >
                                        {item.percentage >= 60
                                            ? "PASS ✅"
                                            : "FAIL ❌"}
                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}