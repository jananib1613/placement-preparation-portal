const jobs = [
  "Frontend Developer",
  "Java Developer",
  "Python Developer",
  "React Developer",
];

export default function RecommendedJobs() {
  return (
    <div className="card">
      <h3>Recommended Jobs</h3>

      {jobs.map((job, index) => (
        <div key={index} className="job-item">
          <span>{job}</span>

          <button>Apply</button>
        </div>
      ))}
    </div>
  );
}