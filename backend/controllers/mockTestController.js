import db from "../config/db.js";

// GET QUESTIONS BY CATEGORY

export const getMockQuestions = (req, res) => {

    const { category } = req.params;

    const sql = `
        SELECT *
        FROM mock_test_questions
        WHERE category = ?
        ORDER BY question_id
    `;

    db.query(sql, [category], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: "Database Error"
            });

        }

        res.json(result);

    });

};
// SAVE MOCK TEST RESULT

export const saveMockAttempt = (req,res)=>{

    const {
        user_id,
        category,
        total_questions,
        correct_answers,
        wrong_answers,
        score
    } = req.body;


    const sql = `

        INSERT INTO mock_test_attempts
        (
            user_id,
            category,
            total_questions,
            correct_answers,
            wrong_answers,
            score
        )

        VALUES (?,?,?,?,?,?)

    `;


    db.query(
        sql,
        [
            user_id,
            category,
            total_questions,
            correct_answers,
            wrong_answers,
            score
        ],
        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json({
                    error:"Database Error"
                });

            }


            res.json({

                success:true,

                message:"Mock test saved successfully",

                attempt_id:result.insertId

            });


        }
    );


};