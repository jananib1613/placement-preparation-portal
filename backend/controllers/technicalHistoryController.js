import db from "../config/db.js";

export const getTechnicalHistory = async (req, res) => {

    try {

        const { userId } = req.params;

        const [history] = await db.query(

            `SELECT
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
            ORDER BY ta.attempt_date DESC`,

            [userId]

        );

        res.json({
            success: true,
            history
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};