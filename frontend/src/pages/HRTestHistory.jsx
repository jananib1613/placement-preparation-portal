import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/hrhistory.css";

export default function HRTestHistory() {

    const [history, setHistory] = useState([]);

   const userId = Number(localStorage.getItem("userId"));


    console.log("User ID:", userId);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/hr/history/${userId}`
            );

            console.log("API Response:", res.data);

            console.log(res.data);

            setHistory(res.data.history);

        } catch (err) {
            console.error(err);
        }

    };

    return (

        <div className="history-page">

            <h1>📜 HR Test History</h1>

            <h2>Total Records: {history.length}</h2>

            {
                history.length === 0 ? (

                    <h2>No History Found</h2>

                ) : (

                    history.map((item, index) => (

                        <div
                            key={item.answer_id}
                            className="history-card"
                        >

                            <h3>
                                Q{index + 1}. {item.question}
                            </h3>

                            <p>{item.answer}</p>

                            <span>
                                {new Date(item.submitted_at).toLocaleString()}
                            </span>

                        </div>

                    ))

                )
            }

        </div>

    );

}