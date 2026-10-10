import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";


const data = [

{
week:"Week 1",
score:45
},

{
week:"Week 2",
score:60
},

{
week:"Week 3",
score:72
},

{
week:"Week 4",
score:86
},

{
week:"Week 5",
score:92
}

];



export default function SkillGrowth(){


return(

<div className="dash-card skill-growth-card">



<div className="card-heading">

<h2>
Skill Growth
</h2>


<p>
Your weekly placement preparation progress
</p>


</div>






<div className="growth-stats">


<div>

<h3>
92%
</h3>

<span>
Current Level
</span>


</div>



<div>

<h3>
+18%
</h3>

<span>
This Month
</span>


</div>



<div>

<h3>
5 Skills
</h3>

<span>
Improving
</span>


</div>


</div>







<div className="growth-chart">


<ResponsiveContainer width="100%" height={260}>


<AreaChart data={data}>


<CartesianGrid 
strokeDasharray="3 3"
/>



<XAxis

dataKey="week"

stroke="#9fb3d9"

/>



<YAxis

domain={[0,100]}

stroke="#9fb3d9"

/>



<Tooltip />




<Area

type="monotone"

dataKey="score"

stroke="#4f8cff"

fill="#4f8cff"

fillOpacity={0.25}

/>



<Line

type="monotone"

dataKey="score"

stroke="#7c3aed"

strokeWidth={3}

dot={{r:5}}

/>



</AreaChart>


</ResponsiveContainer>



</div>




</div>


);


}