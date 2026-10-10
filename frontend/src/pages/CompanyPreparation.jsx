import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/companyPreparation.css";

import tcsLogo from "../assets/logos/tcs.png";
import infosysLogo from "../assets/logos/infosys.png";
import wiproLogo from "../assets/logos/wipro.png";
import accentureLogo from "../assets/logos/accenture.png";
import cognizantLogo from "../assets/logos/cognizant.png";


function CompanyPreparation(){

    const navigate = useNavigate();


    const companies = [

        {
            name:"TCS",
            logo:tcsLogo
        },

        {
            name:"Infosys",
            logo:infosysLogo
        },

        {
            name:"Wipro",
            logo:wiproLogo
        },

        {
            name:"Accenture",
            logo:accentureLogo
        },

        {
            name:"Cognizant",
            logo:cognizantLogo
        }

    ];



    return(

        <div className="company-page">


            <h1>
                Company Preparation
            </h1>


            <p>
                Prepare for top company placements
            </p>



            <div className="company-grid">


            {
                companies.map((company)=>(


                    <div
                    className="company-card"
                    key={company.name}
                    >


                        <div className="company-logo">


                            <img
                            src={company.logo}
                            alt={company.name}
                            />


                        </div>



                        <h2>
                            {company.name}
                        </h2>



                        <p>
                            Aptitude | Coding | Interview
                        </p>



                        <button
                        onClick={()=>
                            navigate(`/company/${company.name}`)
                        }
                        >

                            Start Preparation

                        </button>


                    </div>


                ))
            }


            </div>


        </div>

    );

}


export default CompanyPreparation;