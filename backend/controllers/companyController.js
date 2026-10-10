import db from "../config/db.js";


export const getCompanyQuestions = (req,res)=>{

    const company = req.params.company;


    const sql = `
        SELECT *
        FROM company_questions
        WHERE company_name = ?
        LIMIT 10
    `;


    db.query(sql,[company],(err,result)=>{

        if(err){
            console.log(err);

            return res.status(500).json({
                success:false,
                message:"Database error"
            });
        }


        res.json({
            success:true,
            company:company,
            questions:result
        });

    });

};