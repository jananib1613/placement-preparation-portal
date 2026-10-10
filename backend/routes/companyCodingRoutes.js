import express from "express";
import db from "../config/db.js";


const router = express.Router();



router.get("/:company", (req, res) => {

    const company = req.params.company;

    console.log("Company received:", company);

    const sql = `
        SELECT *
        FROM company_coding_questions
        WHERE company_name = ?
    `;

    db.query(sql, [company], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }

        console.log("Rows found:", result.length);
        console.log(result);

        res.json({
            success: true,
            questions: result
        });

    });

});


export default router;