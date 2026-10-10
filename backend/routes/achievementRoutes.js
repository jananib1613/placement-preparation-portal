import express from "express";
import db from "../config/db.js";

const router = express.Router();



router.get("/:userId",(req,res)=>{


    const userId = req.params.userId;


    const query = `

    SELECT

    achievement_id,

    badge_name,

    badge_image


    FROM achievements


    WHERE user_id = ?

    `;



    db.query(
        query,
        [userId],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({

                    success:false,

                    message:"Database error"

                });

            }



            const achievements = result.map(item=>({

                badge_name:item.badge_name,

                badge_icon:item.badge_image

            }));


            res.json({

                success:true,

                achievements

            });



        }
    );



});



export default router;