import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/placementcompanies.css";

// Import Logos
import tcs from "../assets/logos/tcs.png";
import infosys from "../assets/logos/infosys.png";
import accenture from "../assets/logos/accenture.png";
import wipro from "../assets/logos/wipro.png";
import capgemini from "../assets/logos/capgemini.png";
import cognizant from "../assets/logos/cognizant.png";
import hcl from "../assets/logos/HCL.png";
import ibm from "../assets/logos/IBM.png";
import techmahindra from "../assets/logos/tech mahindra.png";
import zoho from "../assets/logos/zoho.png";

// Logo Map
const logoMap = {
  "tcs.png": tcs,
  "infosys.png": infosys,
  "accenture.png": accenture,
  "wipro.png": wipro,
  "capgemini.png": capgemini,
  "cognizant.png": cognizant,
  "HCL.png": hcl,
  "IBM.png": ibm,
  "tech mahindra.png": techmahindra,
  "zoho.png": zoho,
};

export default function PlacementCompanies() {
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/placement/companies"
      );

      if (res.data.success) {
        setCompanies(res.data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startRecruitment = (company) => {
    navigate(`/placement/company/${company.company_id}`);
  };

  return (
    <div className="placement-page">
      <div className="placement-header">
        <h1>🚀 Placement Recruitment Portal</h1>

        <p>
          Choose your dream company and begin your recruitment journey.
        </p>
      </div>

      <div className="company-grid">
        {companies.map((company) => (
          <div
            className="company-card"
            key={company.company_id}
          >
            <div className="company-logo">
              <img
                src={logoMap[company.logo]}
                alt={company.company_name}
                className="company-logo-img"
              />
            </div>

            <h2>{company.company_name}</h2>

            <div className="company-role">
              💼 {company.role}
            </div>

            <div className="company-package">
              💰 {company.package}
            </div>

            <div className="difficulty">
              ⭐ {company.difficulty}
            </div>

            <div className="recruitment-process">
              <h4>Recruitment Process</h4>

              <p>
                Aptitude → Technical → Coding → HR
              </p>
            </div>

            <button
              className="start-btn"
              onClick={() => startRecruitment(company)}
            >
              🚀 Start Recruitment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}