import db from "../config/db.js";
import { updateXP } from "../utils/xpSystem.js";


// ===============================
// GET ALL CODING TOPICS
// ===============================

export const getCodingTopics = (req,res)=>{

    const sql = `
        SELECT *
        FROM coding_topics
        ORDER BY topic_id ASC
    `;

    db.query(sql,(err,result)=>{

        if(err){
            console.log(err);

            return res.status(500).json({
                error:"Database error"
            });
        }

        res.json(result);

    });

};



// ===============================
// GET ALL CODING QUESTIONS
// ===============================

export const getCodingQuestions = (req,res)=>{

    const sql = `
        SELECT 
            question_id,
            title,
            difficulty,
            topic,
            description,
            sample_input,
            sample_output,
            constraints_text,
            explanation
        FROM coding_questions
    `;


    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).json({
                error:"Database error"
            });

        }

        res.json(result);

    });

};



// ===============================
// GET SINGLE QUESTION
// ===============================

export const getSingleQuestion = (req,res)=>{

    const { id } = req.params;


    const sql = `
        SELECT *
        FROM coding_questions
        WHERE question_id = ?
    `;


    db.query(
        sql,
        [id],
        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json({
                    error:"Database error"
                });

            }


            if(result.length === 0){

                return res.status(404).json({
                    error:"Question not found"
                });

            }


            res.json(result[0]);

        }
    );

};



// ===============================
// GET QUESTIONS BY TOPIC
// ===============================

export const getQuestionsByTopic = (req,res)=>{

    const { topic } = req.params;


    const sql = `
        SELECT 
            question_id,
            title,
            difficulty,
            topic,
            description,
            sample_input,
            sample_output,
            constraints_text,
            explanation
        FROM coding_questions
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



// ===============================
// SUBMIT CODE
// ===============================

export const submitCode = (req,res)=>{

    const {
        user_id,
        question_id,
        language,
        code
    } = req.body;


    const status = "Solved";


    const sql = `

    INSERT INTO coding_attempts
    (
        user_id,
        question_id,
        language,
        code,
        status
    )

    VALUES (?,?,?,?,?)

    `;


    db.query(

        sql,

        [
            user_id,
            question_id,
            language,
            code,
            status
        ],


        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({
                    error:"Database error"
                });

            }



            // ADD 20 XP AFTER SOLVING
           console.log("ADDING XP FOR USER:", user_id);
            updateXP(user_id,20);



            res.json({

                success:true,

                message:"Code solved and XP added"

            });


        }

    );


};



// ===============================
// GET SOLVED PROBLEMS
// ===============================

export const getSolvedProblems = (req,res)=>{

    const sql = `
        SELECT question_id
        FROM coding_progress
        WHERE user_id = ?
        AND status='Solved'
    `;


    db.query(
        sql,
        [2],
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