import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/technicaltopics.css";


export default function TechnicalTopics() {

    const [topics, setTopics] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        fetchTopics();

    }, []);



    const fetchTopics = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/technical/topics"
            );

            console.log(res.data.topics);

            setTopics(res.data.topics);

        } 
        catch (error) {

            console.log(error);

        }

    };



    return (

        <div className="technical-topic-page">


            <div className="technical-heading">

                <h1>
                    💻 Technical Interview Preparation
                </h1>


                <p>
                    Master core computer science concepts with
                    placement-level questions
                </p>

            </div>




            <div className="technical-topic-grid">


                {
                    topics.map((topic) => (

                        <div
                            className="technical-topic-card"
                            key={topic.topic_id}
                        >


                            <img

                                src={
                                    new URL(
                                        `../assets/technical/${topic.image}`,
                                        import.meta.url
                                    ).href
                                }

                                alt={topic.topic_name}

                            />



                            <div className="technical-card-content">


                                <h2>
                                    {topic.topic_name}
                                </h2>



                                <div className="question-count">

                                    {topic.total_questions} Questions

                                </div>




                                <button

                                    onClick={() =>
                                        navigate(
                                            `/technical-test/${topic.topic_id}`
                                        )
                                    }

                                >

                                    Start Test 🚀

                                </button>


                            </div>


                        </div>

                    ))
                }


            </div>


        </div>

    );

}