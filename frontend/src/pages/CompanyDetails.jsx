import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/companyDetails.css";

import tcsLogo from "../assets/logos/tcs.png";
import infosysLogo from "../assets/logos/infosys.png";
import wiproLogo from "../assets/logos/wipro.png";
import accentureLogo from "../assets/logos/accenture.png";
import cognizantLogo from "../assets/logos/cognizant.png";


function CompanyDetails(){

    const { company } = useParams();

    const navigate = useNavigate();


    const logos = {
        TCS:tcsLogo,
        Infosys:infosysLogo,
        Wipro:wiproLogo,
        Accenture:accentureLogo,
        Cognizant:cognizantLogo
    };


    return(

        <div className="company-details">


            <div className="company-header">

                <img 
                src={logos[company]}
                alt={company}
                />

                <h1>
                    {company} Preparation
                </h1>


                <p>
                    Prepare aptitude, coding and interviews for {company} placements.
                </p>


            </div>




            <div className="preparation-grid">



                {/* Aptitude */}

                <div className="prep-card">

                    <h2>
                        📚 Aptitude Practice
                    </h2>

                    <p>
                        Practice company aptitude questions
                    </p>


                    <button
                    onClick={()=>
                    navigate(`/company/${company}/aptitude`)
                    }
                    >
                        Start Practice
                    </button>

                </div>





                {/* Coding */}

                <div className="prep-card">

                    <h2>
                        💻 Coding Questions
                    </h2>


                    <p>
                        Solve company coding problems
                    </p>


                    <button
                    onClick={()=>
                    navigate(`/company/${company}/coding`)
                    }
                    >

                        Start Coding

                    </button>


                </div>






                {/* Company Test */}

                <div className="prep-card">


                    <h2>
                        📝 Company Test
                    </h2>


                    <p>
                        Take {company} mock test
                    </p>


                    <button

                    onClick={()=>
                    navigate(`/company-test/${company}`)
                    }

                    >

                        Take Test

                    </button>


                </div>






                {/* Technical Interview */}

                <div className="prep-card">


                    <h2>
                        👨‍💻 Technical Interview
                    </h2>


                    <p>
                        Prepare technical interview questions
                    </p>


                    <button

                    onClick={()=>
                    navigate(`/company/${company}/technical-interview`)
                    }

                    >

                        View Questions

                    </button>


                </div>







                {/* HR Interview */}

                <div className="prep-card">


                    <h2>
                        🤝 HR Interview
                    </h2>


                    <p>
                        Practice HR interview questions
                    </p>


                    <button

                    onClick={()=>
                    navigate(`/company/${company}/hr-interview`)
                    }

                    >

                        View Questions

                    </button>


                </div>




            </div>


        </div>


    );

}


export default CompanyDetails;