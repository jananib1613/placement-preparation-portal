import db from "../config/db.js";


export const saveCompanyAttempt = (req,res)=>{


    const {
        user_id,
        company_name,
        score,
        total_questions,
        percentage
    } = req.body;



    const sql = `

    INSERT INTO company_attempts
    (user_id,company_name,score,total_questions,percentage)

    VALUES (?,?,?,?,?)

    `;


    db.query(
        sql,
        [
            user_id,
            company_name,
            score,
            total_questions,
            percentage
        ],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({
                    success:false
                });

            }


            res.json({

                success:true,
                message:"Company test saved"

            });


        }
    );


};
export const getCompanyAttempts = (req,res)=>{


    const user_id = req.params.user_id;


    const sql = `

    SELECT *
    FROM company_attempts
    WHERE user_id = ?
    ORDER BY attempted_date DESC

    `;


    db.query(
        sql,
        [user_id],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({
                    success:false
                });

            }


            res.json({

                success:true,
                attempts:result

            });


        }
    );


};