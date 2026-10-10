import db from "../config/db.js";

// ==============================
// Get All HR Questions
// ==============================

export const getHRQuestions = (req, res) => {

    const sql = `
        SELECT *
        FROM hr_questions
        ORDER BY question_id ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch HR questions",
            });
        }

        res.status(200).json({
            success: true,
            questions: results,
        });

    });

};

// ==============================
// Submit HR Answers
// ==============================

export const submitHRAnswers = (req, res) => {

    const { userId, answers } = req.body;

    if (!answers || answers.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No answers submitted",
        });
    }

    let completed = 0;

    for (const item of answers) {

        const sql = `
            INSERT INTO hr_answers
            (user_id, question_id, answer)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [userId, item.questionId, item.answer],
            (err) => {

                if (err) {
                    console.error(err);

                    if (!res.headersSent) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to save answers",
                        });
                    }

                    return;
                }

                completed++;

                if (completed === answers.length && !res.headersSent) {
                    return res.status(200).json({
                        success: true,
                        message: "HR Test Submitted Successfully",
                    });
                }

            }
        );

    }

};

export const getHRHistory = (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            h.answer_id,
            h.answer,
            h.submitted_at,
            q.question
        FROM hr_answers h
        JOIN hr_questions q
        ON h.question_id = q.question_id
        WHERE h.user_id = ?
        ORDER BY h.answer_id ASC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch history"
            });

        }

        res.json({
            success: true,
            history: results
        });

    });

};