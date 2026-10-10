import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.post("/evaluate", (req, res) => {

    const { answers } = req.body;


    let technicalScore = 0;
    let communicationScore = 0;


    answers.forEach((item)=>{

        let answer = item.answer.toLowerCase();


        // simple AI keyword checking

        if(
            answer.includes("class") ||
            answer.includes("object") ||
            answer.includes("database") ||
            answer.includes("sql") ||
            answer.includes("inheritance") ||
            answer.includes("polymorphism")
        ){

            technicalScore += 10;

        }


        if(answer.length > 50){

            communicationScore += 10;

        }


    });


    if(technicalScore > 100)
        technicalScore = 100;


    if(communicationScore > 100)
        communicationScore = 100;



    const overall =
    Math.round(
        (technicalScore + communicationScore) / 2
    );


    const feedback = [
    "Good attempt",
    "Practice more technical concepts",
    "Improve explanation with examples"
];


// save result in database

const sql = `
INSERT INTO ai_interview_results
(user_id, company_name, technical_score, communication_score, overall_score, feedback)
VALUES (?, ?, ?, ?, ?, ?)
`;


const values = [
    2,
    "TCS",
    technicalScore,
    communicationScore,
    overall,
    feedback.join(", ")
];


db.query(sql, values, (err,result)=>{

    if(err){
        console.log("Insert Error:",err);
    }
    else{
        console.log("AI Result Saved:",result);
    }

});



res.json({

    technicalScore,

    communicationScore,

    overall,

    feedback

});


});


export default router;