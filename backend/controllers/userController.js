import db from "../config/db.js";
import bcrypt from "bcrypt";

// =========================
// Get User Profile
// =========================

export const getProfile = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            college,
            course,
            skills,
            profile_image
        FROM users
        WHERE user_id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Server Error"
            });
        }

        if (results.length === 0) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: results[0]
        });

    });

};




// =========================
// Update User Profile
// =========================

export const updateProfile = (req, res) => {

    const { id } = req.params;

    const {

        full_name,
        phone,
        college,
        course,
        skills

    } = req.body;

    const sql = `
        UPDATE users
        SET
            full_name=?,
            phone=?,
            college=?,
            course=?,
            skills=?
        WHERE user_id=?
    `;

    db.query(

        sql,

        [

            full_name,
            phone,
            college,
            course,
            skills,
            id

        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,
                    message: "Server Error"

                });

            }

            res.json({

                success: true,
                message: "Profile Updated Successfully"

            });

        }

    );

};
// =========================
// Update User Profile
// =========================

export const changePassword = (req, res) => {

    const {

        userId,
        currentPassword,
        newPassword

    } = req.body;

    db.query(

        "SELECT password FROM users WHERE user_id=?",

        [userId],

        async (err, result) => {

            if (err) {

                return res.status(500).json({

                    success:false

                });

            }

            if(result.length===0){

                return res.json({

                    success:false,

                    message:"User not found"

                });

            }

            const match = await bcrypt.compare(

                currentPassword,

                result[0].password

            );

            if(!match){

                return res.json({

                    success:false,

                    message:"Current password is incorrect"

                });

            }

            const hashedPassword = await bcrypt.hash(

                newPassword,

                10

            );

            db.query(

                "UPDATE users SET password=? WHERE user_id=?",

                [

                    hashedPassword,

                    userId

                ],

                (err)=>{

                    if(err){

                        return res.status(500).json({

                            success:false

                        });

                    }

                    res.json({

                        success:true,

                        message:"Password Updated Successfully"

                    });

                }

            );

        }

    );

};