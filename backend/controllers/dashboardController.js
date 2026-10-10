import db from "../config/db.js";


export const getDashboardData = async (req, res) => {

    try {

        // =====================================================
        // GET USER ID
        // =====================================================

        const userId = Number(req.query.user_id);

        if (!userId) {

            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });

        }

        console.log("Dashboard User ID:", userId);


        // =====================================================
        // USER DETAILS
        // =====================================================

        const [userRows] = await db.promise().query(
            `
            SELECT
                user_id,
                full_name,
                email,
                college,
                course
            FROM users
            WHERE user_id = ?
            LIMIT 1
            `,
            [userId]
        );


        if (userRows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        const user = userRows[0];


        // =====================================================
        // EXISTING DASHBOARD PROGRESS
        // Used for values such as fallback/profile information
        // =====================================================

        const [progressRows] = await db.promise().query(
            `
            SELECT *
            FROM dashboard_progress
            WHERE user_id = ?
            LIMIT 1
            `,
            [userId]
        );


        const progress =
            progressRows.length > 0
                ? progressRows[0]
                : {};


        // =====================================================
        // ANALYTICS / SKILL GROWTH
        // =====================================================

        const [analytics] = await db.promise().query(
            `
            SELECT *
            FROM analytics
            WHERE user_id = ?
            ORDER BY analytics_id ASC
            `,
            [userId]
        );


        // =====================================================
        // LEADERBOARD
        // =====================================================

        const [leaderboardRows] = await db.promise().query(
            `
            SELECT *
            FROM leaderboard
            WHERE user_id = ?
            LIMIT 1
            `,
            [userId]
        );


        const leaderboard =
            leaderboardRows.length > 0
                ? leaderboardRows[0]
                : {};


        // =====================================================
        // CAREER ROADMAP
        // =====================================================

        const [roadmap] = await db.promise().query(
            `
            SELECT *
            FROM career_roadmap
            WHERE user_id = ?
            ORDER BY roadmap_id ASC
            `,
            [userId]
        );


        // =====================================================
        // ACHIEVEMENTS
        // =====================================================

        const [achievements] = await db.promise().query(
            `
            SELECT *
            FROM achievements
            WHERE user_id = ?
            ORDER BY achievement_id DESC
            `,
            [userId]
        );


        // =====================================================
        // CODING PROGRESS
        // =====================================================

        const [codingRows] = await db.promise().query(
            `
            SELECT

                COUNT(topic_id) AS topics_completed,

                IFNULL(
                    SUM(questions_solved),
                    0
                ) AS questions_solved,

                IFNULL(
                    SUM(total_questions),
                    0
                ) AS total_questions,

                IFNULL(
                    ROUND(
                        AVG(completion_percentage),
                        2
                    ),
                    0
                ) AS completion_percentage

            FROM user_coding_progress

            WHERE user_id = ?
            `,
            [userId]
        );


        const codingProgress =
            codingRows.length > 0
                ? codingRows[0]
                : {
                    topics_completed: 0,
                    questions_solved: 0,
                    total_questions: 0,
                    completion_percentage: 0
                };


        // =====================================================
        // COMPILER / SOLVED CODING QUESTIONS
        // =====================================================

        const [compilerRows] = await db.promise().query(
            `
            SELECT

                COUNT(*) AS solved_questions

            FROM coding_progress

            WHERE user_id = ?

            AND status = 'Solved'
            `,
            [userId]
        );


        const compilerProgress =
            compilerRows.length > 0
                ? compilerRows[0]
                : {
                    solved_questions: 0
                };


        // =====================================================
        // APTITUDE PROGRESS
        // =====================================================

        const [aptitudeRows] = await db.promise().query(
            `
            SELECT

                COUNT(*) AS tests_attempted,

                IFNULL(
                    SUM(total_questions),
                    0
                ) AS questions_solved,

                ROUND(
                    IFNULL(
                        AVG(score),
                        0
                    ),
                    0
                ) AS average_score,

                ROUND(
                    IFNULL(
                        AVG(accuracy),
                        0
                    ),
                    0
                ) AS average_accuracy

            FROM aptitude_attempts

            WHERE user_id = ?
            `,
            [userId]
        );


        const aptitude =
            aptitudeRows.length > 0
                ? aptitudeRows[0]
                : {
                    tests_attempted: 0,
                    questions_solved: 0,
                    average_score: 0,
                    average_accuracy: 0
                };


        // =====================================================
        // THEORY PROGRESS
        // =====================================================

        const [theoryRows] = await db.promise().query(
            `
            SELECT

                COUNT(*) AS tests_attempted,

                IFNULL(
                    SUM(score),
                    0
                ) AS total_score,

                IFNULL(
                    SUM(total_questions),
                    0
                ) AS total_questions,

                ROUND(
                    IFNULL(
                        AVG(
                            CASE
                                WHEN total_questions > 0
                                THEN (score / total_questions) * 100
                                ELSE 0
                            END
                        ),
                        0
                    ),
                    2
                ) AS average_score

            FROM theory_attempts

            WHERE user_id = ?
            `,
            [userId]
        );


        const theoryProgress =
            theoryRows.length > 0
                ? theoryRows[0]
                : {
                    tests_attempted: 0,
                    total_score: 0,
                    total_questions: 0,
                    average_score: 0
                };


        // =====================================================
        // TECHNICAL TEST PROGRESS
        // =====================================================

        const [technicalRows] = await db.promise().query(
            `
            SELECT

                COUNT(*) AS tests_attempted,

                IFNULL(
                    AVG(
                        CASE
                            WHEN total_questions > 0
                            THEN (score / total_questions) * 100
                            ELSE 0
                        END
                    ),
                    0
                ) AS average_score

            FROM technical_attempts

            WHERE user_id = ?
            `,
            [userId]
        );


        const technicalProgress =
            technicalRows.length > 0
                ? technicalRows[0]
                : {
                    tests_attempted: 0,
                    average_score: 0
                };


        // =====================================================
        // MOCK TEST PROGRESS
        // =====================================================

        const [mockRows] = await db.promise().query(
            `
            SELECT

                COUNT(*) AS tests_attempted,

                IFNULL(
                    AVG(
                        CASE
                            WHEN total_questions > 0
                            THEN (score / total_questions) * 100
                            ELSE 0
                        END
                    ),
                    0
                ) AS average_score

            FROM mock_test_attempts

            WHERE user_id = ?
            `,
            [userId]
        );


        const mockProgress =
            mockRows.length > 0
                ? mockRows[0]
                : {
                    tests_attempted: 0,
                    average_score: 0
                };


        // =====================================================
        // WEEKLY GOAL
        // =====================================================

        const [weeklyGoalRows] = await db.promise().query(
            `
            SELECT
                id,
                user_id,
                goal_title,
                target,
                completed,
                week_start
            FROM weekly_goals
            WHERE user_id = ?
            ORDER BY week_start DESC, id DESC
            LIMIT 1
            `,
            [userId]
        );


        const weeklyGoalData =
            weeklyGoalRows.length > 0
                ? weeklyGoalRows[0]
                : {
                    goal_title: "Weekly Preparation Goal",
                    target: 0,
                    completed: 0,
                    week_start: null
                };


        // =====================================================
        // USER ACTIVITY
        // =====================================================

        const [activityRows] = await db.promise().query(
            `
            SELECT
                activity_id,
                user_id,
                activity_title,
                created_at
            FROM user_activity
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT 20
            `,
            [userId]
        );


        const activities = activityRows || [];


        // =====================================================
        // CURRENT STREAK
        // =====================================================

        const [activityDates] = await db.promise().query(
            `
            SELECT DISTINCT
                DATE(created_at) AS activity_date
            FROM user_activity
            WHERE user_id = ?
            ORDER BY activity_date DESC
            `,
            [userId]
        );


        let currentStreak = 0;


        if (activityDates.length > 0) {

            const dates = activityDates.map(
                row =>
                    new Date(row.activity_date)
            );


            const today = new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );


            const latestDate = dates[0];

            latestDate.setHours(
                0,
                0,
                0,
                0
            );


            const differenceFromToday =
                Math.floor(
                    (
                        today - latestDate
                    ) /
                    (1000 * 60 * 60 * 24)
                );


            // Streak can continue if activity was
            // today or yesterday

            if (
                differenceFromToday === 0 ||
                differenceFromToday === 1
            ) {

                currentStreak = 1;


                for (
                    let i = 1;
                    i < dates.length;
                    i++
                ) {

                    const previous =
                        dates[i - 1];

                    const current =
                        dates[i];


                    const difference =
                        Math.floor(
                            (
                                previous -
                                current
                            ) /
                            (1000 * 60 * 60 * 24)
                        );


                    if (difference === 1) {

                        currentStreak++;

                    }
                    else {

                        break;

                    }

                }

            }

        }


        // =====================================================
        // BEST STREAK
        // =====================================================

        let bestStreak = 0;


        if (activityDates.length > 0) {

            const dates =
                activityDates
                    .map(
                        row =>
                            new Date(
                                row.activity_date
                            )
                    )
                    .sort(
                        (a, b) =>
                            a - b
                    );


            let tempStreak = 1;


            for (
                let i = 1;
                i < dates.length;
                i++
            ) {

                const difference =
                    Math.floor(
                        (
                            dates[i] -
                            dates[i - 1]
                        ) /
                        (1000 * 60 * 60 * 24)
                    );


                if (difference === 1) {

                    tempStreak++;

                }
                else {

                    tempStreak = 1;

                }


                bestStreak =
                    Math.max(
                        bestStreak,
                        tempStreak
                    );

            }


            if (dates.length === 1) {

                bestStreak = 1;

            }

        }


        // =====================================================
        // XP CALCULATION
        // =====================================================

        const aptitudeXP =
            Number(
                aptitude.tests_attempted || 0
            ) * 20;


        const codingXP =
            Number(
                codingProgress.questions_solved || 0
            ) * 30;


        const theoryXP =
            Number(
                theoryProgress.tests_attempted || 0
            ) * 20;


        const technicalXP =
            Number(
                technicalProgress.tests_attempted || 0
            ) * 20;


        const mockXP =
            Number(
                mockProgress.tests_attempted || 0
            ) * 50;


        const achievementXP =
            Number(
                achievements.length || 0
            ) * 100;


        const streakXP =
            currentStreak * 10;


        const xpPoints =
            aptitudeXP +
            codingXP +
            theoryXP +
            technicalXP +
            mockXP +
            achievementXP +
            streakXP;


        // =====================================================
        // LEVEL CALCULATION
        // Every 100 XP = 1 Level
        // =====================================================

        const levelNo =
            Math.max(
                1,
                Math.floor(
                    xpPoints / 100
                ) + 1
            );


        // =====================================================
        // PLACEMENT READINESS
        // =====================================================

        const aptitudeScore =
            Number(
                aptitude.average_accuracy
            ) || 0;


        const codingScore =
            Number(
                codingProgress.completion_percentage
            ) || 0;


        const theoryScore =
            Number(
                theoryProgress.average_score
            ) || 0;


        const technicalScore =
            Number(
                technicalProgress.average_score
            ) || 0;


        const mockScore =
            Number(
                mockProgress.average_score
            ) || 0;


        const placementReadiness =
            Math.min(
                100,
                Math.max(
                    0,
                    Math.round(

                        (aptitudeScore * 0.25) +

                        (codingScore * 0.30) +

                        (theoryScore * 0.20) +

                        (technicalScore * 0.15) +

                        (mockScore * 0.10)

                    )
                )
            );


        // =====================================================
        // DYNAMIC PROGRESS OBJECT
        // =====================================================

        const dynamicProgress = {

            placement_readiness:
                placementReadiness,

            current_streak:
                currentStreak,

            best_streak:
                bestStreak,

            weekly_goal:
                Number(
                    weeklyGoalData.target
                ) || 0,

            weekly_completed:
                Number(
                    weeklyGoalData.completed
                ) || 0,

            weekly_goal_title:
                weeklyGoalData.goal_title ||
                "Weekly Preparation Goal",

            week_start:
                weeklyGoalData.week_start,

            xp_points:
                xpPoints,

            level_no:
                levelNo

        };


        // =====================================================
        // AI CAREER ASSISTANT
        // =====================================================

        let aiMessage =
            "Keep practicing consistently and continue your placement preparation.";


        let nextStep =
            "Complete your daily preparation goal.";


        const readiness =
            placementReadiness;


        const aptitudeAccuracy =
            Number(
                aptitude.average_accuracy || 0
            );


        const codingCompletion =
            Number(
                codingProgress.completion_percentage || 0
            );


        const technicalAverage =
            Number(
                technicalProgress.average_score || 0
            );


        const mockAverage =
            Number(
                mockProgress.average_score || 0
            );


        if (aptitudeAccuracy < 60) {

            aiMessage =
                "Your aptitude accuracy can be improved.";

            nextStep =
                "Practice one aptitude topic and take a test.";

        }

        else if (codingCompletion < 50) {

            aiMessage =
                "Your coding preparation needs more practice.";

            nextStep =
                "Solve at least 3 coding problems today.";

        }

        else if (technicalAverage < 60) {

            aiMessage =
                "Your technical preparation needs improvement.";

            nextStep =
                "Practice technical interview questions and take a technical test.";

        }

        else if (mockAverage < 60) {

            aiMessage =
                "Your mock-test performance can be improved.";

            nextStep =
                "Take a mock test and analyze your mistakes.";

        }

        else if (readiness >= 80) {

            aiMessage =
                "Excellent progress! You are getting closer to placement readiness.";

            nextStep =
                "Focus on mock tests, interviews and company-specific preparation.";

        }

        else {

            aiMessage =
                "You are making good progress. Keep building consistency.";

            nextStep =
                "Complete your weekly goal and continue coding practice.";

        }


        const ai_assistant = {

            message:
                aiMessage,

            next_step:
                nextStep

        };


        
        // =====================================================
// SEND RESPONSE
// =====================================================

res.status(200).json({

    success: true,

    user_id: userId,

    user: user,

    codingProgress: codingProgress,

    compilerProgress: compilerProgress,

    aptitude: aptitude,

    theoryProgress: theoryProgress,

    technicalProgress: technicalProgress,

    mockProgress: mockProgress,

    progress: {
        ...dynamicProgress,
        ...progress,

        placement_readiness: placementReadiness,

        current_streak: currentStreak,

        best_streak: bestStreak,

        weekly_goal:
            Number(weeklyGoalData.target) || 0,

        weekly_completed:
            Number(weeklyGoalData.completed) || 0,

        weekly_goal_title:
            weeklyGoalData.goal_title ||
            "Weekly Preparation Goal",

        week_start:
            weeklyGoalData.week_start,

        xp_points:
            xpPoints,

        level_no:
            levelNo
    },

    weeklyGoal: weeklyGoalData,

    analytics: analytics,

    leaderboard: leaderboard,

    roadmap: roadmap,

    achievements: achievements,

    activities: activities,

    activityCount: activities.length,

    ai_assistant: ai_assistant

});


    }

    catch (error) {

        console.log(
            "DASHBOARD ERROR:",
            error.sqlMessage ||
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                error.sqlMessage ||
                error.message

        });

    }

};