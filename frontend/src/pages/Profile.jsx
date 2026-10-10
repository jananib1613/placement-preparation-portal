import profile from "../../assets/dashboard/profile.jpeg";
import { Mail, Phone, GraduationCap } from "lucide-react";
import "../../styles/dashboard.css";

export default function Profile() {
  return (
    <div className="card profile-card">

      <img
        src={profile}
        alt="Profile"
        className="profile-img"
      />

      <h2>Janani B</h2>

      <p className="profile-role">
        Final Year BCA Student
      </p>

      <div className="profile-details">

        <div className="profile-item">
          <GraduationCap size={18}/>
          <span>BCA</span>
        </div>

        <div className="profile-item">
          <Mail size={18}/>
          <span>janani@example.com</span>
        </div>

        <div className="profile-item">
          <Phone size={18}/>
          <span>+91 XXXXX XXXXX</span>
        </div>

      </div>

      <button className="edit-btn">
        Edit Profile
      </button>

    </div>
  );
}