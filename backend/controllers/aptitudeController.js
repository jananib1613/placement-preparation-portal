import db from "../config/db.js";


// ===============================
// GET TOPICS WITH QUESTION COUNT
// ===============================

export const getTopics = (req, res) => {

    const sql = `
        SELECT
            t.topic_id,
            t.topic_name,
            t.description,
            t.image,
            COUNT(q.question_id) AS total_questions

        FROM aptitude_topics t

        LEFT JOIN aptitude_questions q
        ON t.topic_name = q.category

        GROUP BY
            t.topic_id,
            t.topic_name,
            t.description,
            t.image

        ORDER BY t.topic_id
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err.sqlMessage || err.message
            });

        }

        res.json(result);

    });

};


// ===============================
// GET QUESTIONS
// ===============================

export const getQuestions = (req, res) => {

    const topic_id = req.params.topic_id;

    const sql = `
        SELECT
            question_id,
            question,
            option1,
            option2,
            option3,
            option4,
            answer

        FROM aptitude_questions

        WHERE category = (

            SELECT topic_name
            FROM aptitude_topics
            WHERE topic_id = ?

        )

        ORDER BY question_id
    `;

    db.query(sql, [topic_id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err.sqlMessage || err.message
            });

        }

        res.json(result);

    });

};


// ===============================
// GET TESTS
// ===============================

export const getTests = (req, res) => {

    const topic_id = req.params.topic_id;

    const sql = `
        SELECT *
        FROM aptitude_tests
        WHERE topic_id = ?
    `;

    db.query(sql, [topic_id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err.sqlMessage || err.message
            });

        }

        res.json(result);

    });

};


// ===============================
// GET ATTEMPTS
// ===============================

export const getAttempts = (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            a.*,
            t.test_name,
            tp.topic_name

        FROM aptitude_attempts a

        JOIN aptitude_tests t
        ON a.test_id = t.test_id

        JOIN aptitude_topics tp
        ON t.topic_id = tp.topic_id

        WHERE a.user_id = ?

        ORDER BY a.attempted_date DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err.sqlMessage || err.message
            });

        }

        res.json(result);

    });

};


// ===============================
// SAVE ATTEMPT
// ===============================

export const submitAttempt = (req, res) => {

    const {
        user_id,
        test_id,
        score,
        total_questions,
        correct_answers,
        wrong_answers,
        accuracy,
        time_taken
    } = req.body;

    console.log("Request Body:", req.body);
    
    const sql = `
        INSERT INTO aptitude_attempts
        (
            user_id,
            test_id,
            score,
            total_questions,
            correct_answers,
            wrong_answers,
            accuracy,
            time_taken
        )
        VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            user_id,
            test_id,
            score,
            total_questions,
            correct_answers,
            wrong_answers,
            accuracy,
            time_taken
        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error: err.sqlMessage || err.message
                });

            }

            // ===========================
            // UPDATE ANALYTICS
            // ===========================

            const analyticsSql = `
                UPDATE analytics
                SET
                    tests_attempted = tests_attempted + 1,
                    questions_solved = questions_solved + ?,
                    accuracy = ?,
                    average_time = ?,
                    current_streak = current_streak + 1,
                    xp_points = xp_points + (? * 5),
                    level_no = FLOOR((xp_points + (? * 5)) / 200) + 1,
                    placement_readiness = ?
                WHERE user_id = ?
            `;
console.log({
    user_id,
    correct_answers,
    accuracy,
    time_taken
});
            db.query(
                analyticsSql,
                [
                    correct_answers,
                    accuracy,
                    time_taken,
                    correct_answers,
                    correct_answers,
                    accuracy,
                    user_id
                ],

                (analyticsErr) => {

                    if (analyticsErr) {

                        console.log(analyticsErr);

                        return res.status(500).json({
                            error: analyticsErr.sqlMessage || analyticsErr.message
                        });

                    }

                    res.json({
                        success: true,
                        message: "Attempt saved successfully"
                    });

                }
            );

        }
    );

};



// ===============================
// GET APTITUDE PROGRESS
// ===============================

export const getAptitudeProgress = (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            COUNT(*) AS total_attempts,
            SUM(total_questions) AS questions_solved

        FROM aptitude_attempts

        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err.sqlMessage || err.message
            });

        }

        res.json({

            success: true,

            progress: {

                questions_solved: Number(result[0].questions_solved) || 0,
                total_attempts: Number(result[0].total_attempts) || 0

            }

        });

    });

};

// ===============================
// GET APTITUDE DASHBOARD STATS
// ===============================

export const getDashboardStats = (req, res) => {

    const userId = req.params.userId;

    const sql = `
    SELECT

        (SELECT COUNT(*) FROM aptitude_topics) AS totalTopics,

        (SELECT COUNT(*) FROM aptitude_questions) AS totalQuestions,

        (SELECT COUNT(*) 
         FROM aptitude_attempts
         WHERE user_id = ?) AS testsAttempted,

        (SELECT IFNULL(SUM(correct_answers),0)
         FROM aptitude_attempts
         WHERE user_id = ?) AS questionsSolved,

        (SELECT ROUND(IFNULL(AVG(accuracy),0),2)
         FROM aptitude_attempts
         WHERE user_id = ?) AS accuracy,

        (SELECT ROUND(IFNULL(AVG(time_taken),0),0)
         FROM aptitude_attempts
         WHERE user_id = ?) AS averageTime;
    `;

    db.query(
        sql,
        [userId, userId, userId, userId],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error: err.sqlMessage || err.message
                });

            }

            res.json(result[0]);

        }
    );

};