import { useEffect, useState } from "react";
import "../styles/coding.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import arrays from "../assets/coding/arrays.jpeg";
import strings from "../assets/coding/strings.jpeg";
import searching from "../assets/coding/searching.jpeg";
import sorting from "../assets/coding/sorting.jpeg";
import linkedlist from "../assets/coding/linked list.jpeg";
import stackqueue from "../assets/coding/stack and queue.jpeg";
import trees from "../assets/coding/trees.jpeg";
import graphs from "../assets/coding/graphs.jpeg";
import dynamicprogramming from "../assets/coding/dynamic programming.jpeg";
import backtracking from "../assets/coding/backtracking.jpeg";

export default function Coding() {

    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);

    const images = {

        "Arrays": arrays,
        "Strings": strings,
        "Searching": searching,
        "Sorting": sorting,
        "Linked List": linkedlist,
        "Stack & Queue": stackqueue,
        "Trees": trees,
        "Graphs": graphs,
        "Dynamic Programming": dynamicprogramming,
        "Backtracking": backtracking

    };

    useEffect(() => {

        axios
            .get("http://localhost:5000/api/coding/topics")

            .then(res => {

                console.log("Coding Topics:", res.data);
                setTopics(res.data);

            })

            .catch(err => {

                console.log(err);

            });

    }, []);

    return (

        <div className="coding-page">

            <div className="coding-header">

                <h1>Coding Practice</h1>

                <p>
                    Sharpen your coding skills and prepare for placements.
                </p>

            </div>

            <div className="coding-grid">

                {

                    topics.map((topic) => (

                        <div
                            className="coding-card"
                            key={topic.topic_id}
                        >

                            <img
                                src={images[topic.topic_name]}
                                alt={topic.topic_name}
                                className="coding-icon"
                            />

                            <h3>{topic.topic_name}</h3>

                            <p>{topic.description}</p>

                            <div className="button-container">

                                <button
                                    className="practice-btn"
                                    onClick={() =>
                                        navigate(`/coding/${topic.topic_name}`)
                                    }
                                >
                                    Practice Problems
                                </button>

                                <button
                                    className="theory-btn"
                                    onClick={() =>
                                        navigate(`/coding/theory/${topic.topic_name}`)
                                    }
                                >
                                    Theory MCQ
                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}