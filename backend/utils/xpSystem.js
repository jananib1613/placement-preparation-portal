import db from "../config/db.js";


export const updateXP = (userId, xpAmount) => {


    const query = `

        UPDATE analytics

        SET xp_points = xp_points + ?

        WHERE user_id = ?

    `;



    db.query(

        query,

        [
            xpAmount,
            userId
        ],


        (err, result) => {


            if(err){

                console.log("XP Update Error:", err);

                return;

            }


            console.log(
                "XP Updated Successfully for user:",
                userId
            );


        }

    );


};