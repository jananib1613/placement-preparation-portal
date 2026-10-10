import db from "../config/db.js";

/* =========================================================
   GET ALL JOBS
========================================================= */

export const getJobs = async (req, res) => {

    try {

        const [jobs] = await db.promise().query(
            `
            SELECT *
            FROM jobs
            ORDER BY job_id DESC
            `
        );

        res.status(200).json(jobs);

    }
    catch (error) {

        console.log("GET JOBS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/* =========================================================
   GET USER APPLICATIONS
========================================================= */

export const getUserApplications = async (req, res) => {

    try {

        const userId = Number(req.params.userId);

        if (!userId) {

            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });

        }

        const [applications] = await db.promise().query(
            `
            SELECT
                application_id,
                user_id,
                job_id,
                applied_on,
                status
            FROM job_applications
            WHERE user_id = ?
            ORDER BY application_id DESC
            `,
            [userId]
        );

        res.status(200).json({
            success: true,
            applications
        });

    }
    catch (error) {

        console.log(
            "GET APPLICATIONS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/* =========================================================
   APPLY FOR JOB
========================================================= */

export const applyForJob = async (req, res) => {

    try {

        const {
            user_id,
            job_id
        } = req.body;


        if (!user_id || !job_id) {

            return res.status(400).json({
                success: false,
                message: "User ID and Job ID are required"
            });

        }


        /* Check whether job exists */

        const [jobRows] = await db.promise().query(
            `
            SELECT job_id, company, role
            FROM jobs
            WHERE job_id = ?
            LIMIT 1
            `,
            [job_id]
        );


        if (jobRows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });

        }


        /* Check whether already applied */

        const [existing] = await db.promise().query(
            `
            SELECT application_id
            FROM job_applications
            WHERE user_id = ?
            AND job_id = ?
            LIMIT 1
            `,
            [user_id, job_id]
        );


        if (existing.length > 0) {

            return res.status(409).json({
                success: false,
                message: "You have already applied for this job"
            });

        }


        /* Insert application */

        await db.promise().query(
            `
            INSERT INTO job_applications
            (
                user_id,
                job_id,
                applied_on,
                status
            )
            VALUES
            (
                ?,
                ?,
                CURDATE(),
                'Applied'
            )
            `,
            [
                user_id,
                job_id
            ]
        );


        res.status(201).json({
            success: true,
            message: "Application submitted successfully"
        });

    }
    catch (error) {

        console.log(
            "APPLY JOB ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};