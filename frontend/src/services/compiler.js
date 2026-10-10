import axios from "axios";


export const runCode = async (language, code, input) => {

    try {

        const response = await axios.post(
            "http://localhost:5000/api/compiler/run",
            {
                language,
                code,
                input
            }
        );


        return response.data;


    } catch(error){

        console.log(
            "Compiler Error:",
            error
        );


        return {
            output:"Error connecting to compiler server"
        };

    }

};