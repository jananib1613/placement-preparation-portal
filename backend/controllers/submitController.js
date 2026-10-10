import db from "../config/db.js";
import { exec } from "child_process";
import fs from "fs";
import { updateXP } from "../utils/xpSystem.js";
import path from "path";


// SUBMIT CODE AND CHECK TEST CASES

export const submitCode = (req,res)=>{
     
    console.log("NEW SUBMIT CONTROLLER RUNNING");

    const {
        user_id,
        question_id,
        language,
        code
    } = req.body;



    // Get test cases

    const sql = `
        SELECT *
        FROM coding_testcases
        WHERE question_id = ?
    `;



    db.query(
        sql,
        [question_id],
        (err,testcases)=>{


            if(err){

                console.log(err);

                return res.status(500).json({

                    error:"Database error"

                });

            }



            if(testcases.length === 0){

                return res.json({

                    status:"No test cases found"

                });

            }




            let fileName="";
            let command="";



            // =====================
            // PYTHON
            // =====================

            if(language==="python"){


                fileName="Main.py";


                const filePath =
                path.join(
                    process.cwd(),
                    fileName
                );


                fs.writeFileSync(
                    filePath,
                    code
                );


                command =
                `python ${filePath}`;


            }



            // =====================
            // C++
            // =====================

            else if(language==="cpp"){


                const cppFile =
                path.join(
                    process.cwd(),
                    "Main.cpp"
                );


                const exeFile =
                path.join(
                    process.cwd(),
                    "Main.exe"
                );



                fs.writeFileSync(
                    cppFile,
                    code
                );



                command =
                `g++ ${cppFile} -o ${exeFile} && ${exeFile}`;



            }




            // =====================
            // JAVA
            // =====================

            else if(language==="java"){


                const javaFile =
                path.join(
                    process.cwd(),
                    "Main.java"
                );



                fs.writeFileSync(
                    javaFile,
                    code
                );



                command =
                `javac Main.java && java Main`;



            }



            else{


                return res.json({

                    status:"Language not supported"

                });

            }






            let results=[];

            let index=0;



            const runTest = ()=>{


                if(index >= testcases.length){



                    const failed =
                    results.find(
                        item=>item.status==="Failed"
                    );



                    if(failed){


                        return res.json({

                            status:"Wrong Answer",

                            results

                        });


                    }




                    // SAVE PROGRESS

                    const insertQuery = `

                    INSERT INTO coding_progress

                    (
                        user_id,
                        question_id,
                        status,
                        language
                    )

                    VALUES(?,?,?,?)

                    `;



                    db.query(

                        insertQuery,

                        [

                            user_id,

                            question_id,

                            "Solved",

                            language

                        ]

                    );


                     // ADD XP AFTER SOLVED

updateXP(user_id,20);


                    return res.json({

                        status:"Accepted",

                        message:
                        "All test cases passed",

                        results

                    });



                }






                const testcase =
                testcases[index];



                exec(

                    command,

                    {
                        timeout:5000
                    },


                    (error,stdout,stderr)=>{



                        if(error){


                            results.push({

                                testcase:index+1,

                                status:"Runtime Error",

                                error:stderr

                            });


                        }

                        else{


                            const actual = stdout
.trim()
.replace(/\s+/g,"");

const expected = testcase.expected_output
.trim()
.replace(/\s+/g,"");


console.log("------ TEST RESULT ------");

console.log("Input:",
testcase.input_data);

console.log("Expected:",
expected);

console.log("Actual:",
actual);

console.log("-------------------------");




                            if(actual===expected){


                                results.push({

                                    testcase:index+1,

                                    status:"Passed"

                                });


                            }

                            else{


                                results.push({

                                    testcase:index+1,

                                    status:"Failed",

                                    expected,

                                    actual

                                });


                            }



                        }





                        index++;

                        runTest();



                    }

                );



            };



            runTest();



        }

    );


};