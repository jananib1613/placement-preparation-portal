import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leaderboard.css";


function Leaderboard(){


    const [students,setStudents] = useState([]);

    const [badges,setBadges] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        axios
        .get("http://localhost:5000/api/leaderboard")

        .then((res)=>{


            const data = res.data.leaderboard || [];

            setStudents(data);


            if(data.length > 0){


                const userId = data[0].user_id;


                axios
                .get(
                    `http://localhost:5000/api/achievements/${userId}`
                )

                .then((badgeRes)=>{


                    setBadges(
                        badgeRes.data.achievements || []
                    );


                })

                .catch((err)=>{

                    console.log(err);

                });


            }


            setLoading(false);


        })


        .catch((err)=>{


            console.log(err);

            setLoading(false);


        });



    },[]);





    if(loading){


        return(

            <div className="leaderboard-loading">

                Loading Leaderboard...

            </div>

        );

    }





    const currentUser = students[0] || {};



    const topThree = students.slice(0,3);





    return(


        <div className="leaderboard-page">





            <div className="leaderboard-header">


                <h1 className="leaderboard-title">

                    Leaderboard 🏆

                </h1>


                <p className="leaderboard-subtitle">

                    Compete, improve and achieve your placement goals

                </p>


            </div>









            {/* ======================
                 TOP PODIUM
            ====================== */}



            <div className="podium-section">



            {


            topThree.map((student,index)=>(


                <div

                key={student.user_id}

                className={`podium-card rank-${index+1}`}


                >



                    <div className="podium-rank">


                    {

                    index===0
                    ?
                    "🥇"
                    :
                    index===1
                    ?
                    "🥈"
                    :
                    "🥉"


                    }


                    </div>




                    <h2>

                        {student.full_name}

                    </h2>



                    <h3>

                        {student.xp_points} XP

                    </h3>



                    <p>

                        {student.questions_solved} Problems

                    </p>


                    <span>

                        Accuracy {student.accuracy}%

                    </span>



                </div>


            ))


            }


            </div>









            {/* ======================
                YOUR PERFORMANCE
            ====================== */}





            <div className="your-performance-card">



                <h2>

                    🚀 Your Performance

                </h2>



                <div className="performance-grid">



                    <div>

                        <p>Your Rank</p>

                        <strong>

                            #{currentUser.rank}

                        </strong>


                    </div>




                    <div>

                        <p>Total XP</p>

                        <strong>

                            {currentUser.xp_points}

                        </strong>


                    </div>





                    <div>

                        <p>Accuracy</p>

                        <strong>

                            {currentUser.accuracy}%

                        </strong>


                    </div>





                    <div>

                        <p>Level</p>

                        <strong>

                            {currentUser.level_no}

                        </strong>


                    </div>



                </div>






                <div className="xp-progress">



                    <div className="xp-text">

                        XP Progress

                        <span>

                        {currentUser.xp_points}/100

                        </span>


                    </div>




                    <div className="progress-bar">


                        <div

                        className="progress-fill"

                        style={{

                            width:
                            `${Math.min(
                                currentUser.xp_points,
                                100
                            )}%`

                        }}


                        ></div>


                    </div>



                </div>




            </div>









            {/* ======================
                ALL STUDENTS
            ====================== */}



            <div className="leaderboard-table-card">


                <h2>

                    All Performers

                </h2>




                <table>


                    <thead>

                        <tr>

                            <th>
                                Rank
                            </th>


                            <th>
                                Student
                            </th>


                            <th>
                                XP
                            </th>


                            <th>
                                Problems
                            </th>


                            <th>
                                Tests
                            </th>


                            <th>
                                Accuracy
                            </th>


                            <th>
                                Streak
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                    {


                    students.map((student)=>(


                    <tr

                    key={student.user_id}

                    className={
                        student.user_id === currentUser.user_id
                        ?
                        "current-user"
                        :
                        ""
                    }

                    >



                        <td>

                            #{student.rank}

                        </td>



                        <td>

                            {student.full_name}


                            {

                            student.user_id === currentUser.user_id
                            &&
                            <span>

                                (You)

                            </span>

                            }


                        </td>



                        <td>

                            {student.xp_points}

                        </td>



                        <td>

                            {student.questions_solved}

                        </td>



                        <td>

                            {student.tests_attempted}

                        </td>



                        <td>

                            {student.accuracy}%

                        </td>



                        <td>

                            🔥 {student.current_streak}

                        </td>



                    </tr>


                    ))


                    }


                    </tbody>


                </table>


            </div>









            {/* ======================
                 ACHIEVEMENTS
            ====================== */}





            <div className="badges-section">


                <h2>

                    Achievement Badges 🎖️

                </h2>



                <div className="badge-container">



                {


                badges.map((badge,index)=>(


                    <div

                    className="badge-card"

                    key={index}

                    >


                        <div className="badge-icon">

                            {badge.badge_icon}

                        </div>



                        <h3>

                            {badge.badge_name}

                        </h3>



                        <p>

                            Achievement unlocked

                        </p>



                    </div>



                ))


                }



                </div>


            </div>






        </div>


    );


}


export default Leaderboard;