import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/jobs.css";

import infosysLogo from "../assets/logos/infosys.png";
import wiproLogo from "../assets/logos/wipro.png";
import accentureLogo from "../assets/logos/accenture.png";
import capgeminiLogo from "../assets/logos/capgemini.png";
import cognizantLogo from "../assets/logos/cognizant.png";
import ibmLogo from "../assets/logos/IBM.png";
import hclLogo from "../assets/logos/HCL.png";
import techMahindraLogo from "../assets/logos/tech mahindra.png";
import zohoLogo from "../assets/logos/zoho.png";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applyingJob, setApplyingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        console.log("Jobs:", res.data);

        setJobs(res.data);

      } catch (error) {

        console.error(error);

      }

    };


    const fetchApplications = async () => {

  try {

    if (!userId) {
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/jobs/applications/${userId}`
    );

    console.log(
      "User Applications:",
      res.data
    );

    if (res.data.success) {

      const jobIds =
        res.data.applications.map(
          application => application.job_id
        );

      setAppliedJobs(jobIds);

    }

  }
  catch (error) {

    console.error(
      "Applications Error:",
      error
    );

  }

};

    fetchJobs();
    fetchApplications();


  }, [userId]);

  const getLogo = (company) => {

    switch (company) {

      case "Infosys":
        return infosysLogo;

      case "Wipro":
        return wiproLogo;

      case "Accenture":
        return accentureLogo;

      case "Capgemini":
        return capgeminiLogo;

      case "Cognizant":
        return cognizantLogo;

      case "IBM":
        return ibmLogo;

      case "HCLTech":
        return hclLogo;

      case "Tech Mahindra":
        return techMahindraLogo;

      case "Zoho":
        return zohoLogo;

      default:
        return infosysLogo;

    }

  };

  const uniqueLocations = [
    "All Locations",
    ...new Set(jobs.map(job => job.location))
  ];

  const uniqueTypes = [
    "All Types",
    ...new Set(jobs.map(job => job.job_type))
  ];

  const filteredJobs = jobs.filter(job => {

    const searchMatch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const locationMatch =
      locationFilter === "All Locations" ||
      job.location === locationFilter;

    const typeMatch =
      typeFilter === "All Types" ||
      job.job_type === typeFilter;

    return searchMatch && locationMatch && typeMatch;

  });



  const handleApply = async (job) => {

  if (!userId) {

    alert("Please login to apply for jobs.");

    return;

  }


  /* Already applied */

  if (appliedJobs.includes(job.job_id)) {

    alert("You have already applied for this job.");

    return;

  }


  try {

    setApplyingJob(job.job_id);


    const res = await axios.post(
      "http://localhost:5000/api/jobs/apply",
      {
        user_id: Number(userId),
        job_id: job.job_id
      }
    );


    if (res.data.success) {

      /* Update UI immediately */

      setAppliedJobs(prev => [
        ...prev,
        job.job_id
      ]);


      /* Open company application page */

      if (job.apply_link) {

        window.open(
          job.apply_link,
          "_blank"
        );

      }

      alert(
        "Application recorded successfully!"
      );

    }

  }
  catch (error) {

    console.error(
      "Apply Error:",
      error
    );


    if (
      error.response?.status === 409
    ) {

      alert(
        "You have already applied for this job."
      );

      setAppliedJobs(prev => {

        if (prev.includes(job.job_id)) {
          return prev;
        }

        return [
          ...prev,
          job.job_id
        ];

      });

    }
    else {

      alert(
        "Unable to apply for this job. Please try again."
      );

    }

  }
  finally {

    setApplyingJob(null);

  }

};

  return (

    <div className="jobs-page">

      <div className="jobs-header">

        <h1>Job Opportunities</h1>

        <p>
          Find the latest placement opportunities from top companies.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <span>Total Jobs</span>
        </div>

        <div className="stat-card">
          <h2>{new Set(jobs.map(job => job.company)).size}</h2>
          <span>Companies</span>
        </div>

        <div className="stat-card">
          <h2>{jobs.filter(job => job.posted === "Today").length}</h2>
          <span>New Jobs</span>
        </div>

      </div>

      <div className="search-section">

        <input
          type="text"
          placeholder="🔍 Search jobs or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >

          {uniqueLocations.map(location => (

            <option
              key={location}
              value={location}
            >
              {location}
            </option>

          ))}

        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >

          {uniqueTypes.map(type => (

            <option
              key={type}
              value={type}
            >
              {type}
            </option>

          ))}

        </select>

        <button className="filter-btn">
          Filters
        </button>

      </div>

      <div className="job-list">

        {filteredJobs.map((job) => (

          <div
            className="job-card"
            key={job.job_id}
          >

            <div className="job-left">

              <img
                src={getLogo(job.company)}
                alt={job.company}
                className="company-logo"
              />

              <div className="job-info">

                <h2>{job.company}</h2>

                <p className="role">
                  {job.role}
                </p>

                <div className="tags">

                  <span>{job.job_type}</span>

                  <span>{job.location}</span>

                  <span>{job.experience}</span>

                  <span>{job.salary}</span>

                </div>

                <p className="description">
                  {job.description}
                </p>

                <div className="job-extra">
                                    <p>
                    <strong>Skills:</strong> {job.skills}
                  </p>

                  <p>
                    <strong>Eligibility:</strong> {job.eligibility}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "Not Available"}
                  </p>

                </div>

              </div>

            </div>

            <div className="job-right">

              <span className="posted">
                {job.posted}
              </span>

              <button
  className={
    appliedJobs.includes(job.job_id)
      ? "apply-btn applied"
      : "apply-btn"
  }
  disabled={
    applyingJob === job.job_id ||
    appliedJobs.includes(job.job_id)
  }
  onClick={() => handleApply(job)}
>
  {applyingJob === job.job_id
    ? "Applying..."
    : appliedJobs.includes(job.job_id)
      ? "✓ Applied"
      : "Apply Now"
  }
</button>

              <button
                className="bookmark"
                title="Save Job"
              >
                ☆
              </button>

            </div>

          </div>

        ))}

        {filteredJobs.length === 0 && (

          <div className="no-jobs">

            <h2>No Jobs Found</h2>

            <p>
              Try searching with another company name or change the filters.
            </p>

          </div>

        )}

      </div>

    </div>

  );

}