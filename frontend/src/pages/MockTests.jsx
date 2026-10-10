import "../styles/mocktest.css";
import { useNavigate } from "react-router-dom";

import aptitude from "../assets/mocktest/aptitude test.jpeg";
import coding from "../assets/mocktest/coding challenge.jpeg";
import company from "../assets/mocktest/company test.jpeg";
import hr from "../assets/mocktest/HR test.jpeg";
import technical from "../assets/mocktest/technical test.jpeg";
import placement from "../assets/mocktest/placement test.jpeg";


export default function MockTest(){

    const navigate = useNavigate();


    const tests = [

        {
            id:1,
            title:"Aptitude Test",
            image:aptitude,
            desc:"Quantitative aptitude, reasoning and verbal ability.",
            questions:"50 Questions",
            time:"60 mins",
            level:"Easy",
            route:"/mocktest/aptitude"
        },

        {
            id:2,
            title:"Coding Challenge",
            image:coding,
            desc:"Practice coding problems and improve programming skills.",
            questions:"2 Problems",
            time:"90 mins",
            level:"Medium",
            route:"/mocktest/coding"
        },

        {
            id:3,
            title:"Company Test",
            image:company,
            desc:"Prepare for TCS, Infosys, Accenture company exams.",
            questions:"30 Questions",
            time:"45 mins",
            level:"Medium",
            route:"/mocktest/company"
        },

        {
            id:4,
            title:"HR Test",
            image:hr,
            desc:"Practice HR interview and communication skills.",
            questions:"25 Questions",
            time:"30 mins",
            level:"Easy",
            route:"/mocktest/hr"
        },

        {
            id:5,
            title:"Technical Test",
            image:technical,
            desc:"DBMS, OS, Java, Python, SQL and Networks.",
            questions:"40 Questions",
            time:"60 mins",
            level:"Hard",
            route:"/mocktest/technical"
        },

        {
            id:6,
            title:"Placement Test",
            image:placement,
            desc:"Complete placement preparation examination.",
            questions:"100 Questions",
            time:"120 mins",
            level:"Hard",
            route:"/mocktest/placement"
        }

    ];



return(

<div className="mocktest-page">


    <div className="mocktest-header">

        <h1>🚀 Mock Test page </h1>

        <p>
            Practice company level tests and prepare for placements.
        </p>

    </div>




    <div className="mocktest-stats">


        <div>
            <h2>6</h2>
            <p>Tests</p>
        </div>


        <div>
            <h2>347+</h2>
            <p>Questions</p>
        </div>


        <div>
            <h2>10+</h2>
            <p>Companies</p>
        </div>


        <div>
            <h2>100%</h2>
            <p>Preparation</p>
        </div>


    </div>





    <h2 className="mock-title">
        Available Mock Tests
    </h2>





    <div className="mocktest-grid">


    {
        tests.map(test=>(

            <div 
            className="mocktest-card"
            key={test.id}
            >


                <img
                className="mocktest-img"
                src={test.image}
                alt={test.title}
                />



                <h3>
                    {test.title}
                </h3>



                <p>
                    {test.desc}
                </p>




                <div className="mock-info">

                    <span>
                    📝 {test.questions}
                    </span>

                    <span>
                    ⏱ {test.time}
                    </span>

                </div>





                <div className="mock-footer">


                    <span className={
                        `level ${test.level.toLowerCase()}`
                    }>

                    {test.level}

                    </span>



                    <button
                    onClick={()=>navigate(test.route)}
                    >

                    Start Test

                    </button>



                </div>



            </div>


        ))
    }


    </div>


</div>


)

}