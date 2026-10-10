import db from "../config/db.js";

/* =====================================================
   GET TECHNICAL TOPICS
===================================================== */

export const getTechnicalTopics = (req, res) => {

    const sql = `
        SELECT
            topic_id,
            topic_name,
            total_questions,
            image
        FROM technical_topics
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        res.json({
            success: true,
            topics: result
        });

    });

};



/* =====================================================
   GET QUESTIONS BY TOPIC
===================================================== */

export const getTechnicalQuestions = (req, res) => {

    const { topicId } = req.params;

    const sql = `
        SELECT
            question_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            difficulty
        FROM technical_questions
        WHERE topic_id = ?
    `;

    db.query(sql, [topicId], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            questions: result
        });

    });

};



/* =====================================================
   SUBMIT TECHNICAL TEST
===================================================== */

export const submitTechnicalTest = (req, res) => {

    console.log("SUBMIT BODY:", req.body);

    const {
        userId,
        topicId,
        answers
    } = req.body;

    let score = 0;

    const questionIds = answers.map(item => item.questionId);

    const sql = `
        SELECT
            question_id,
            correct_answer
        FROM technical_questions
        WHERE question_id IN (?)
    `;

    db.query(sql, [questionIds], (err, questions) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });

        }

        questions.forEach((q) => {

            const userAnswer = answers.find(
                (a) => a.questionId === q.question_id
            );

            if (
                userAnswer &&
                userAnswer.answer === q.correct_answer
            ) {
                score++;
            }

        });

        const totalQuestions = questions.length;

        const percentage =
            totalQuestions === 0
                ? 0
                : Number(((score / totalQuestions) * 100).toFixed(2));



        const insertSql = `
            INSERT INTO technical_attempts
            (
                user_id,
                topic_id,
                score,
                total_questions,
                percentage
            )
            VALUES (?,?,?,?,?)
        `;

        db.query(
            insertSql,
            [
                userId,
                topicId,
                score,
                totalQuestions,
                percentage
            ],
            (error) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        success: false
                    });

                }

                /* Save Activity */

                const activitySql = `
                    INSERT INTO user_activity
                    (
                        user_id,
                        activity_title,
                        activity_type
                    )
                    VALUES (?,?,?)
                `;

                db.query(
                    activitySql,
                    [
                        userId,
                        "Completed Technical Test",
                        "Technical"
                    ],
                    (activityError) => {

                        if (activityError) {
                            console.log(
                                "Activity Error:",
                                activityError
                            );
                        }

                    }
                );

                res.json({

                    success: true,
                    score,
                    totalQuestions,
                    percentage

                });

            }
        );

    });

};



/* =====================================================
   TECHNICAL HISTORY
===================================================== */

export const getTechnicalHistory = (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT
            ta.attempt_id,
            tt.topic_name,
            ta.score,
            ta.total_questions,
            ta.percentage,
            ta.attempt_date
        FROM technical_attempts ta
        JOIN technical_topics tt
            ON ta.topic_id = tt.topic_id
        WHERE ta.user_id = ?
        ORDER BY ta.attempt_date DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });

        }

        res.json({

            success: true,
            history: result

        });

    });

};