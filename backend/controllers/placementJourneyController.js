import db from "../config/db.js";

export const getPlacementCompany = (req, res) => {

    const { companyId } = req.params;

    const sql = `
        SELECT *
        FROM placement_companies
        WHERE company_id = ?
    `;

    db.query(sql, [companyId], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false
            });
        }

        if (result.length === 0) {

            return res.json({
                success: false,
                message: "Company not found"
            });

        }

        res.json({
            success: true,
            company: result[0]
        });

    });

};