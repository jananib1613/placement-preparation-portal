import db from "../config/db.js";


export const getUserActivity = (req,res)=>{


const {userId}=req.params;


const sql = `

SELECT *

FROM user_activity

WHERE user_id=?

ORDER BY created_at DESC

LIMIT 10

`;



db.query(

sql,

[userId],

(err,result)=>{


if(err){

console.log(err);

return res.status(500).json({

success:false

});

}



res.json({

success:true,

activities:result

});


}


);



};