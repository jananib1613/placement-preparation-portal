import {
  Search,
  Bell
} from "lucide-react";

import "./../styles/layout.css";


export default function Navbar(){

return(

<nav className="navbar">


<div className="search-box">

<Search size={20}/>

<input

type="text"

placeholder="Search..."

/>

</div>



<div className="nav-actions">


<Bell className="nav-icon"/>


<div className="nav-user">

<img

src="/src/assets/dashboard/profile.jpeg"

alt="profile"

/>


<div>

<h4>Janani</h4>

<span>Student</span>

</div>


</div>


</div>


</nav>

);

}