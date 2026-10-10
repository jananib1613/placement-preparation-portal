import {

Home,

Target,

Code2,

FileText,

BarChart3,

Trophy,

MessageCircle,

Settings,
BriefcaseBusiness

} from "lucide-react";


import { NavLink } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa";

import "../styles/layout.css";



export default function Sidebar(){


const menu=[

{
name:"Dashboard",
icon:<Home/>,
path:"/dashboard"
},

{
name:"Aptitude",
icon:<Target/>,
path:"/aptitude"
},

{
name:"Coding",
icon:<Code2/>,
path:"/coding"
},

{
    name:"Jobs",
    icon:<BriefcaseBusiness/>,
    path:"/jobs"
},
{
    name:"Mock Tests",
    icon:<FaClipboardCheck/>,
    path:"/mock-test"
},

{
name:"Analytics",
icon:<BarChart3/>,
path:"/analytics"
},

{
name:"Leaderboard",
icon:<Trophy/>,
path:"/leaderboard"
},

{
name:"Settings",
icon:<Settings/>,
path:"/settings"
}

];


return(

<aside className="sidebar">


<div className="logo">

<span>🚀</span>

<h2>
Placement Pro
</h2>

</div>



<div className="menu">


{
menu.map((item,index)=>(


<NavLink

key={index}

to={item.path}

className="menu-item"

>


{item.icon}


<span>
{item.name}
</span>


</NavLink>


))

}


</div>



</aside>


);

}