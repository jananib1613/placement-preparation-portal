import db from "../config/db.js";

// GET ALL MOCK QUESTIONS

export const getMockQuestions = (req, res) => {

    const sql = `
        SELECT *
        FROM aptitude_mock_questions
        ORDER BY RAND()
        LIMIT 50
    `;

    db.query(sql, (err, result) => {

        if (err) {

             console.log("MOCK TEST ERROR:", err.sqlMessage);

            return res.status(500).json({
                error: "Database Error"
            });

        }

        res.json(result);

    });

};