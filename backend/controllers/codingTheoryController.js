import db from "../config/db.js";


// GET THEORY QUESTIONS BY TOPIC

export const getTheoryQuestions = (req,res)=>{

    const { topic } = req.params;


    const sql = `
    SELECT *
    FROM coding_theory_questions
    WHERE topic = ?
    `;


    db.query(
        sql,
        [topic],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({
                    error:"Database error"
                });

            }


            res.json(result);


        }
    );


};