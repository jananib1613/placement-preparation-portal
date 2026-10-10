import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/history/:userId",(req,res)=>{

    const userId = req.params.userId;


    const sql = `
    SELECT *
    FROM ai_interview_results
    WHERE user_id=?
    ORDER BY created_at DESC
    `;


    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }


        res.json(result);

    });


});


export default router;