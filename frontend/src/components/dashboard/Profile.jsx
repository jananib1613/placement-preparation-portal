import profile from "../../assets/dashboard/profile.jpeg";
import {
  GraduationCap,
  Award,
  Code2,
} from "lucide-react";

import "../../styles/dashboard.css";


export default function Profile(){

  return(

    <div className="dashboard-card profile-card">


      <div className="profile-image-box">

        <img
          src={profile}
          alt="Profile"
        />

      </div>


      <h2>
        Janani B
      </h2>


      <p className="profile-role">
        Final Year BCA Student
      </p>



      <div className="profile-info">


        <div className="profile-item">

          <GraduationCap size={20}/>

          <span>
            Bachelor of Computer Applications
          </span>

        </div>



        <div className="profile-item">

          <Code2 size={20}/>

          <span>
            Software Developer Aspirant
          </span>

        </div>



        <div className="profile-item">

          <Award size={20}/>

          <span>
            Placement Preparation
          </span>

        </div>


      </div>



      <button className="profile-btn">

        View Profile

      </button>


    </div>

  );

}