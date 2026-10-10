import db from "../config/db.js";


// SAVE THEORY TEST RESULT

export const submitTheoryTest = (req, res) => {

    const {

        user_id,
        topic,
        score,
        total_questions

    } = req.body;


    const sql = `
    INSERT INTO theory_attempts
    (
        user_id,
        topic,
        score,
        total_questions
    )
    VALUES (?,?,?,?)
    `;


    db.query(
        sql,
        [
            user_id,
            topic,
            score,
            total_questions
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });

            }

            res.json({

                success: true,

                message: "Theory test saved successfully"

            });

        }

    );

};