import { useParams, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import "../styles/codingProblem.css";
import { runCode } from "../services/compiler";


export default function CodingProblem(){

    const {id}=useParams();

    const location = useLocation();

    const problem = location.state?.question;

    console.log("Selected Question:", problem);

    


    if(!problem){
        return <h1>Problem Not Found</h1>;
    }


    const [code,setCode] = useState("// Write your solution here");

    const [output,setOutput] = useState("");

    const [loading,setLoading] = useState(false);



    const handleRun = async()=>{

        try{

            setLoading(true);

            const result = await runCode(
                "javascript",
                code,
                ""
            );


            setOutput(result.output || result.error);

        }
        catch(error){

            setOutput("Execution Error");

        }
        finally{

            setLoading(false);

        }

    };



    const handleSubmit = ()=>{

        alert("Solution Submitted Successfully!");

    };



return(

<div className="problem-page">


{/* ================= LEFT PANEL ================= */}

<div className="left-panel">


<div className="problem-header">


<div>

<h1>{problem.title}</h1>

<p className="problem-subtitle">
Solve the coding problem and submit your solution.
</p>

</div>


<span className={`difficulty ${problem.difficulty?.toLowerCase()}`}>

{problem.difficulty}

</span>


</div>





<div className="problem-card">


<h2>📝 Problem Statement</h2>

<p>
{problem.description}
</p>


</div>





<div className="problem-card">


<h2>📌 Constraints</h2>


<p>
{problem.constraints_text || "No constraints available"}
</p>


</div>





<div className="sample-grid">


<div className="sample-card">


<h3>Sample Input</h3>


<pre>
{problem.sample_input}
</pre>


</div>





<div className="sample-card">


<h3>Sample Output</h3>


<pre>
{problem.sample_output}
</pre>


</div>


</div>





<div className="problem-card">


<h2>💡 Explanation</h2>


<p>
{problem.explanation || "Explanation not available"}
</p>


</div>



</div>





{/* ================= RIGHT PANEL ================= */}


<div className="right-panel">


<div className="editor-top">


<h2>
💻 JavaScript Editor
</h2>


<div className="editor-status">

Ready

</div>


</div>





<div className="editor-wrapper">


<Editor


height="500px"

width="100%"

language="javascript"

theme="vs-dark"

value={code}

onChange={(value)=>setCode(value || "")}


options={{

fontSize:16,

minimap:{
enabled:false
},

automaticLayout:true,

scrollBeyondLastLine:false,

wordWrap:"on",

roundedSelection:true,

padding:{
top:15
}

}}


/>


</div>





<div className="editor-buttons">


<button

className="run-btn"

onClick={handleRun}

disabled={loading}

>


{

loading

?

"Running..."

:

"▶ Run Code"

}


</button>





<button

className="submit-btn"

onClick={handleSubmit}

>


✓ Submit Solution


</button>


</div>





<div className="output-card">


<h2>
📤 Output
</h2>



<div className="output-box">


{

output

?

output

:

"Click 'Run Code' to execute your solution."

}


</div>


</div>




</div>


</div>


);


}