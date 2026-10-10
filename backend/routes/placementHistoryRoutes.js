import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/history/:userId",(req,res)=>{

    const userId=req.params.userId;


    const sql=`
    SELECT *
    FROM placement_history
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

router.post("/history", (req,res)=>{

    const {
        userId,
        companyId,
        companyName,
        roundName,
        score,
        status
    } = req.body;


    const sql = `
    INSERT INTO placement_history
    (user_id, company_id, company_name, round_name, score, status)
    VALUES (?,?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            userId,
            companyId,
            companyName,
            roundName,
            score,
            status
        ],
        (err,result)=>{

            if(err){
                console.log(err);
                return res.status(500).json(err);
            }


            res.json({
                message:"History saved"
            });

        }
    );

});


export default router;