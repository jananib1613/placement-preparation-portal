import db from "../config/db.js";


// =============================
// Get Companies
// =============================

export const getPlacementCompanies = (req, res) => {

    const sql = `
        SELECT *
        FROM placement_companies
        ORDER BY company_name
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
            companies: result

        });

    });

};


// =============================
// Get Recruitment Rounds
// =============================

export const getPlacementRounds = (req, res) => {

    const { companyId } = req.params;

    const sql = `
        SELECT *
        FROM placement_rounds
        WHERE company_id=?
        ORDER BY round_order
    `;

    db.query(sql, [companyId], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });

        }

        res.json({

            success: true,
            rounds: result

        });

    });

};


// =============================
// Start Recruitment
// =============================

export const startPlacement = (req, res) => {

    const { userId, companyId } = req.body;

    const sql = `
        INSERT INTO placement_progress
        (user_id, company_id, current_round, status)
        VALUES (?, ?, 1, 'In Progress')
    `;

    db.query(sql, [userId, companyId], (err) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false
            });
        }

        res.json({
            success: true,
            message: "Recruitment Started"
        });

    });

};

// =============================
// Get Upcoming Placement Drives
// =============================

export const getUpcomingPlacementDrives = (req, res) => {

    const sql = `
        SELECT
            company_id AS drive_id,
            company_name,
            role,
            package,
            difficulty,
            logo,
            description,
            created_at
        FROM placement_companies
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("Placement Drives Error:", err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({

            success: true,

            drives: result

        });

    });

};

