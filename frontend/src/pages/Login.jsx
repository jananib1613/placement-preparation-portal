import { useState } from "react";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaBrain,
    FaChartLine,
    FaUserGraduate,
    FaBriefcase
} from "react-icons/fa";

import "../styles/login.css";

import hero from "../assets/login/hero.jpeg";
import google from "../assets/login/google.png";
import github from "../assets/login/github.jpeg";
import linkedin from "../assets/login/linkedin.jpeg";


export default function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);


    const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Login Successful");

            // Save token
            localStorage.setItem("token", data.token);

            // Save user id
            localStorage.setItem("userId", data.user.id);

            // Go to dashboard
            window.location.href = "/dashboard";

        }

        else {

            alert(data.message || "Invalid email or password");

        }

    }

    catch (error) {

        console.log(error);

        alert("Server not connected");

    }

};


return(

<div className="login-page">


<div className="login-wrapper">


{/* LEFT SIDE */}

<div className="login-left">


<h1>
Placement
<span>
Preparation Portal
</span>
</h1>


<p className="hero-text">

Practice. Prepare. Perform.

Crack your dream placement with
coding, aptitude and AI powered learning.

</p>



<div className="hero-container">

<img
src={hero}
className="hero-image"
alt="hero"
/>

</div>




<div className="feature-grid">


<div className="feature-card">

<FaBrain/>

<div>
<h4>AI Learning</h4>
<p>Smart preparation roadmap</p>
</div>

</div>



<div className="feature-card">

<FaChartLine/>

<div>
<h4>Analytics</h4>
<p>Track your progress</p>
</div>

</div>



<div className="feature-card">

<FaUserGraduate/>

<div>
<h4>Placement Ready</h4>
<p>Mock tests & practice</p>
</div>

</div>




<div className="feature-card">

<FaBriefcase/>

<div>
<h4>Companies</h4>
<p>Prepare for recruiters</p>
</div>

</div>


</div>


</div>





{/* RIGHT SIDE */}


<div className="login-right">


<div className="login-card">


<h2>
Welcome <span>Back!</span>
</h2>


<p>
Login to continue your journey
</p>



<form onSubmit={handleLogin}>


<div className="input-group">

<FaEnvelope/>

<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

</div>



<div className="input-group">


<FaLock/>


<input

type={showPassword?"text":"password"}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

>

{
showPassword?
<FaEyeSlash/>
:
<FaEye/>
}

</button>


</div>




<div className="login-options">


<label>

<input type="checkbox"/>

Remember me

</label>


<a href="#">
Forgot Password?
</a>


</div>




<button 
type="submit"
className="login-btn"
>


LOGIN

<FaArrowRight/>


</button>



<div className="divider">

<span></span>

OR

<span></span>

</div>




<div className="social-login">


<button>

<img src={google}/>

Google

</button>



<button>

<img src={github}/>

Github

</button>



<button>

<img src={linkedin}/>

LinkedIn

</button>


</div>



<p className="signup">

New here?

<a href="/register">

Create an account

</a>

</p>



<div className="security">

🔒

Secure login with encrypted data

</div>



</form>


</div>


</div>


</div>


</div>

)


}