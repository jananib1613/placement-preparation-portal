import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/:company/:type",(req,res)=>{


    const {company,type}=req.params;


    const sql=`

    SELECT *
    FROM company_interview_questions
    WHERE company_name=?
    AND interview_type=?

    `;


    db.query(
        sql,
        [company,type],
        (err,result)=>{


            if(err){

                return res.status(500).json({
                    error:err
                });

            }


            res.json({

                success:true,
                questions:result

            });


        }
    );


});


export default router;