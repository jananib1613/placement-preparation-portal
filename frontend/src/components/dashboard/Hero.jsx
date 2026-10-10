import { Bell, Flame, Search } from "lucide-react";
import profile from "../assets/dashboard/profile.jpeg";

import "../styles/dashboard.css";


export default function Hero(){


return (

<div className="dashboard-header">



<div className="welcome-area">


<h1>
Good Morning, Janani 👑
</h1>


<p>
Every day brings you closer to your dream placement.
</p>


</div>





<div className="hero-actions">



<div className="hero-search">


<Search size={18}/>


<input

type="text"

placeholder="Search anything..."

/>


</div>





<div className="notification">


<Bell size={22}/>


</div>





<div className="hero-streak">


<Flame size={20}/>


<span>
18
</span>


</div>





<img

src={profile}

alt="profile"

className="hero-profile"

/>





</div>



</div>

);

}