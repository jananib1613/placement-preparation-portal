import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/questions/:company", (req,res)=>{

    const company = req.params.company;


    const sql = 
    "SELECT * FROM ai_interview_questions WHERE company_name=?";


    db.query(sql,[company],(err,result)=>{

        if(err){
            return res.status(500).json({
                error:err
            });
        }


        res.json(result);

    });


});


export default router;