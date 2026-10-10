import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaArrowLeft
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../styles/register.css";


export default function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        if (!fullName || !email || !password) {

            alert("Please fill all required fields.");

            return;

        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;

        }


        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        full_name: fullName,
                        email: email,
                        password: password,
                        phone: phone
                    })
                }
            );


            const data = await response.json();

            console.log("Register Response:", data);


            if (response.ok) {

                alert(
                    "Registration successful! Please login."
                );

                navigate("/");

            }
            else {

                alert(
                    data.message ||
                    "Registration failed."
                );

            }

        }
        catch (error) {

            console.error(
                "Registration Error:",
                error
            );

            alert(
                "Server not connected. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="register-page">


            {/* BACK BUTTON */}

            <button
                className="register-back"
                onClick={() => navigate("/")}
            >

                <FaArrowLeft />

                Back to Login

            </button>


            <div className="register-wrapper">


                {/* LEFT SIDE */}

                <div className="register-left">

                    <div className="register-brand">

                        <span>🚀</span>

                        <h1>
                            Placement
                            <strong>
                                Preparation Portal
                            </strong>
                        </h1>

                    </div>


                    <div className="register-content">

                        <span className="register-badge">
                            🚀 START YOUR JOURNEY
                        </span>


                        <h2>
                            Build Your
                            <span>
                                Placement Future
                            </span>
                        </h2>


                        <p>
                            Create your account and unlock
                            personalized aptitude practice,
                            coding challenges, mock tests,
                            company preparation and career
                            opportunities.
                        </p>


                        <div className="register-features">

                            <div>
                                <span>✓</span>
                                Personalized preparation
                            </div>

                            <div>
                                <span>✓</span>
                                Coding & aptitude practice
                            </div>

                            <div>
                                <span>✓</span>
                                Company-wise preparation
                            </div>

                            <div>
                                <span>✓</span>
                                Track your placement progress
                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="register-right">

                    <div className="register-card">


                        <div className="register-heading">

                            <span className="heading-icon">
                                👋
                            </span>

                            <h2>
                                Create Account
                            </h2>

                            <p>
                                Join Placement Preparation Portal
                            </p>

                        </div>


                        <form
                            onSubmit={handleRegister}
                        >


                            {/* FULL NAME */}

                            <div className="register-input">

                                <FaUser />

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="register-input">

                                <FaEnvelope />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* PHONE */}

                            <div className="register-input">

                                <FaPhone />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="register-input">

                                <FaLock />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="register-input">

                                <FaLock />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >

                                    {showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>

                            </div>


                            {/* TERMS */}

                            <label className="terms">

                                <input
                                    type="checkbox"
                                    required
                                />

                                <span>
                                    I agree to the Terms &
                                    Conditions and Privacy Policy
                                </span>

                            </label>


                            {/* REGISTER */}

                            <button
                                type="submit"
                                className="register-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "CREATE ACCOUNT"
                                }

                                {!loading && (
                                    <FaArrowRight />
                                )}

                            </button>


                            {/* LOGIN */}

                            <p className="already-account">

                                Already have an account?

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/")
                                    }
                                >
                                    Login
                                </button>

                            </p>


                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}