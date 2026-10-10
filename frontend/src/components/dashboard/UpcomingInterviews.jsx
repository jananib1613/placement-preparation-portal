import { Calendar, Clock, Building2 } from "lucide-react";

const interviews = [
  {
    company: "Infosys",
    role: "Software Engineer",
    date: "10 Jul 2026",
    time: "10:00 AM",
  },
  {
    company: "TCS",
    role: "System Engineer",
    date: "15 Jul 2026",
    time: "2:00 PM",
  },
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    date: "22 Jul 2026",
    time: "11:30 AM",
  },
];

export default function UpcomingInterviews() {
  return (
    <div className="card">
      <h3>Upcoming Interviews</h3>

      {interviews.map((item, index) => (
        <div key={index} className="interview-item">
          <Building2 size={22} color="#6C63FF" />

          <div className="interview-details">
            <strong>{item.company}</strong>
            <p>{item.role}</p>

            <div className="interview-info">
              <Calendar size={15} />
              <span>{item.date}</span>

              <Clock size={15} />
              <span>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}