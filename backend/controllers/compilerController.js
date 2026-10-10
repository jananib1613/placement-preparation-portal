import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const runCode = (req, res) => {

    console.log("Compiler Request:", req.body);

    const { language, code, input } = req.body;


    if(!language || !code){

        return res.status(400).json({
            error:"Language and code are required"
        });

    }



    const fileName = "Main";

    let command = "";
    let filePath = "";



    try{


        if(language === "python"){

            filePath = path.join(__dirname, `${fileName}.py`);

            fs.writeFileSync(
                filePath,
                code
            );


            command = `python "${filePath}"`;

        }



        else if(language === "java"){


            filePath = path.join(__dirname, `${fileName}.java`);


            fs.writeFileSync(
                filePath,
                code
            );


            command = `cd "${__dirname}" && javac Main.java && java Main`;

        }




        else if(language === "cpp"){


            filePath = path.join(__dirname, `${fileName}.cpp`);


            const outputPath = path.join(
                __dirname,
                "Main.exe"
            );


            fs.writeFileSync(
                filePath,
                code
            );


            command = `g++ "${filePath}" -o "${outputPath}" && "${outputPath}"`;

        }




        else if(language === "c"){


            filePath = path.join(__dirname, `${fileName}.c`);


            const outputPath = path.join(
                __dirname,
                "Main.exe"
            );


            fs.writeFileSync(
                filePath,
                code
            );


            command = `gcc "${filePath}" -o "${outputPath}" && "${outputPath}"`;

        }


        else if (language === "javascript") {

    filePath = path.join(__dirname, `${fileName}.js`);

    fs.writeFileSync(filePath, code);

    command = `node "${filePath}"`;

}


        else{

            return res.status(400).json({

                error:"Unsupported language"

            });

        }


        exec(
            command,
            {
                timeout:5000,
                maxBuffer:1024*1024
            },
            (error, stdout, stderr)=>{


                if(error){

                    return res.json({

                        output:stderr || error.message

                    });

                }



                res.json({

                    output:stdout

                });


            }

        );



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            error:"Compiler error"

        });


    }


};