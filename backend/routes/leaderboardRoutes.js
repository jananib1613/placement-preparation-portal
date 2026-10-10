import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/", (req,res)=>{


   const query = `

SELECT

RANK() OVER(
ORDER BY a.xp_points DESC
) AS user_rank,

u.user_id,

u.full_name,

a.xp_points,

a.questions_solved,

a.tests_attempted,

a.accuracy,

a.current_streak,

a.level_no,

a.placement_readiness


FROM users u


JOIN analytics a

ON u.user_id = a.user_id


ORDER BY a.xp_points DESC

`;


    db.query(query,(err,result)=>{


        if(err){

            console.log(err);

            return res.status(500).json({

                success:false,

                message:"Database error"

            });

        }



       const leaderboard = result.map((student)=>{

    return {

        rank: student.user_rank,

        user_id: student.user_id,

        full_name: student.full_name,

        xp_points: student.xp_points,

        questions_solved: student.questions_solved,

        tests_attempted: student.tests_attempted,

        accuracy: student.accuracy,

        current_streak: student.current_streak,

        level_no: student.level_no,

        placement_readiness: student.placement_readiness

    };

});


        res.json({

            success:true,

            leaderboard

        });


    });



});


export default router;