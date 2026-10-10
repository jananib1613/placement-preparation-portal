import king from "../../assets/dashboard/king.jpeg";
import aptitude from "../../assets/dashboard/aptitude ace.jpeg";
import code from "../../assets/dashboard/code.jpeg";

import "../../styles/dashboard.css";


export default function Achievements({ achievements = [] }) {


  const getBadgeImage = (badgeName) => {

    switch(badgeName){

      case "Consistency King":
        return king;

      case "Aptitude Ace":
        return aptitude;

      case "Code Warrior":
        return code;

      default:
        return king;

    }

  };



  return (

    <div className="dash-card achievement-box">


      <h2>
        Recent Achievements
      </h2>



      <p className="achievement-count">
        Total Badges : {achievements.length}
      </p>




      <div className="achievement-list">


        {
          achievements.length > 0 ?

          achievements.slice(0,3).map((item)=>(


            <div

              className="achievement-item"

              key={item.achievement_id}

            >



              <div className="badge-circle">


                <img

                  src={getBadgeImage(item.badge_name)}

                  alt={item.badge_name}

                />


              </div>





              <div className="achievement-info">


                <h3>
                  {item.badge_name}
                </h3>


                <p>
                  Unlocked Achievement
                </p>


              </div>



            </div>


          ))


          :

          <p>
            No achievements unlocked yet
          </p>


        }



      </div>



    </div>


  );


}