import db from "../config/db.js";

export const getCompanyCodingQuestions = (req, res) => {

    const { company } = req.params;

    const sql = `
        SELECT *
        FROM company_coding_questions
        WHERE company_name = ?
        ORDER BY coding_id ASC
    `;

    db.query(sql, [company], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            company,
            questions: result
        });

    });

};