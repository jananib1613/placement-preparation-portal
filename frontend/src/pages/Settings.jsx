import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/settings.css";

export default function Settings() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [loading, setLoading] = useState(true);

    const [darkMode, setDarkMode] = useState(true);

    const [notifications, setNotifications] = useState({

        practice: true,
        test: true,
        placement: true,
        achievement: true

    });

    const [profile, setProfile] = useState({

        full_name: "",
        email: "",
        phone: "",
        college: "",
        course: "",
        skills: "",
        profile_image: ""

    });

    const [showPasswordModal, setShowPasswordModal] = useState(false);

const [passwordData, setPasswordData] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: ""

});

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/users/profile/${userId}`

            );

            if (res.data.success) {

                setProfile({

                    full_name: res.data.user.full_name || "",
                    email: res.data.user.email || "",
                    phone: res.data.user.phone || "",
                    college: res.data.user.college || "",
                    course: res.data.user.course || "",
                    skills: res.data.user.skills || "",
                    profile_image: res.data.user.profile_image || ""

                });

            }

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };
        const saveProfile = async () => {




            const handlePasswordChange = async () => {

    if (
        passwordData.currentPassword === "" ||
        passwordData.newPassword === "" ||
        passwordData.confirmPassword === ""
    ) {

        alert("Please fill all fields");
        return;

    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {

        alert("Passwords do not match");
        return;

    }

    try {

        const res = await axios.put(

            "http://localhost:5000/api/users/change-password",

            {

                userId,

                currentPassword: passwordData.currentPassword,

                newPassword: passwordData.newPassword

            }

        );

        alert(res.data.message);

        if (res.data.success) {

            setShowPasswordModal(false);

            setPasswordData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

    }
    catch (error) {

        console.log(error);

        alert("Unable to change password");

    }

};

        try {

            const res = await axios.put(

                `http://localhost:5000/api/users/profile/${userId}`,

                {

                    full_name: profile.full_name,
                    phone: profile.phone,
                    college: profile.college,
                    course: profile.course,
                    skills: profile.skills

                }

            );

            if (res.data.success) {

                alert("✅ Profile Updated Successfully");

                fetchProfile();

            }

        }

        catch (err) {

            console.log(err);

            alert("❌ Unable to update profile");

        }

    };



    const toggleNotification = (name) => {

        setNotifications({

            ...notifications,

            [name]: !notifications[name]

        });

    };



    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };



    if (loading) {

        return (

            <div className="loading-page">

                <h2>Loading Profile...</h2>

            </div>

        );

    }



    return (

<div className="settings-page">

<div className="settings-header">

<h1>⚙️ Settings</h1>

<p>

Manage your profile and personalize your Placement Preparation Portal

</p>

</div>



<div className="settings-card">

<h2>

👤 Profile Information

</h2>



<div className="profile-section">

<div className="profile-image">

{

profile.profile_image ?

<img

src={profile.profile_image}

alt="Profile"

/>

:

profile.full_name.charAt(0).toUpperCase()

}

</div>



<div className="profile-details">

<h3>

{profile.full_name}

</h3>

<p>

{profile.email}

</p>

</div>

</div>



<div className="input-grid">

<div>

<label>

Full Name

</label>

<input

type="text"

name="full_name"

value={profile.full_name}

onChange={handleChange}

/>

</div>



<div>

<label>

Email

</label>

<input

type="email"

value={profile.email}

readOnly

/>

</div>



<div>

<label>

Phone

</label>

<input

type="text"

name="phone"

value={profile.phone}

onChange={handleChange}

/>

</div>



<div>

<label>

College

</label>

<input

type="text"

name="college"

value={profile.college}

onChange={handleChange}

/>

</div>
<div>

<label>

Course

</label>

<input

type="text"

name="course"

value={profile.course}

onChange={handleChange}

/>

</div>



<div>

<label>

Skills

</label>

<input

type="text"

name="skills"

placeholder="Java, React, SQL..."

value={profile.skills}

onChange={handleChange}

/>

</div>

</div>



<div className="save-section">

<button

className="save-btn"

onClick={saveProfile}

>

💾 Save Profile

</button>

</div>

</div>





{/* ================= Appearance ================= */}

<div className="settings-card">

<h2>

🎨 Appearance

</h2>

<div className="setting-row">

<div>

<h3>

Dark Mode

</h3>

<p>

Use premium dark interface

</p>

</div>

<label className="switch">

<input

type="checkbox"

checked={darkMode}

onChange={() => setDarkMode(!darkMode)}

/>

<span className="slider"></span>

</label>

</div>

</div>





{/* ================= Notifications ================= */}

<div className="settings-card">

<h2>

🔔 Notifications

</h2>

<div className="notification-list">

<div className="setting-row">

<p>

Daily Practice Reminder

</p>

<input

type="checkbox"

checked={notifications.practice}

onChange={() =>

toggleNotification("practice")

}

/>

</div>



<div className="setting-row">

<p>

Mock Test Alerts

</p>

<input

type="checkbox"

checked={notifications.test}

onChange={() =>

toggleNotification("test")

}

/>

</div>



<div className="setting-row">

<p>

Placement Drive Updates

</p>

<input

type="checkbox"

checked={notifications.placement}

onChange={() =>

toggleNotification("placement")

}

/>

</div>



<div className="setting-row">

<p>

Achievement Notifications

</p>

<input

type="checkbox"

checked={notifications.achievement}

onChange={() =>

toggleNotification("achievement")

}

/>

</div>

</div>

</div>
{/* ================= SECURITY ================= */}

<div className="settings-card">

    <h2>🔐 Security</h2>

    <div className="security-actions">

        <button

className="action-btn"

onClick={()=>setShowPasswordModal(true)}

>

🔑 Change Password

</button>

        <button
            className="action-btn"
            onClick={() => alert("Login Activity feature coming soon")}
        >
            🕒 View Login Activity
        </button>

    </div>

</div>



{/* ================= PLACEMENT PREFERENCES ================= */}

<div className="settings-card">

    <h2>🎯 Placement Preferences</h2>

    <div className="preference-list">

        <div className="preference-item">
            <span>Dream Company</span>
            <strong>Google</strong>
        </div>

        <div className="preference-item">
            <span>Preferred Role</span>
            <strong>Software Developer</strong>
        </div>

        <div className="preference-item">
            <span>Placement Readiness</span>
            <strong>84%</strong>
        </div>

    </div>

</div>



{/* ================= AI SETTINGS ================= */}

<div className="settings-card">

    <h2>🤖 AI Preferences</h2>

    <div className="preference-list">

        <div className="setting-row">

            <p>AI Study Planner</p>

            <input
                type="checkbox"
                defaultChecked
            />

        </div>

        <div className="setting-row">

            <p>AI Interview Feedback</p>

            <input
                type="checkbox"
                defaultChecked
            />

        </div>

        <div className="setting-row">

            <p>Career Suggestions</p>

            <input
                type="checkbox"
                defaultChecked
            />

        </div>

    </div>

</div>



{/* ================= ACCOUNT ================= */}

<div className="settings-card danger">

    <h2>⚙️ Account</h2>

    <button
        className="logout-btn"
        onClick={logout}
    >
        🚪 Logout
    </button>

    <button
        className="delete-btn"
        onClick={() => {

            if (window.confirm("Are you sure you want to delete your account?")) {

                alert("Delete Account API will be connected.");

            }

        }}
    >
        🗑 Delete Account
    </button>

</div>

{/* ================= CHANGE PASSWORD MODAL ================= */}

{

showPasswordModal && (

<div className="password-modal">

    <div className="password-card">

        <h2>
            🔐 Change Password
        </h2>

        <input

            type="password"

            placeholder="Current Password"

            value={passwordData.currentPassword}

            onChange={(e)=>

                setPasswordData({

                    ...passwordData,

                    currentPassword:e.target.value

                })

            }

        />



        <input

            type="password"

            placeholder="New Password"

            value={passwordData.newPassword}

            onChange={(e)=>

                setPasswordData({

                    ...passwordData,

                    newPassword:e.target.value

                })

            }

        />



        <input

            type="password"

            placeholder="Confirm Password"

            value={passwordData.confirmPassword}

            onChange={(e)=>

                setPasswordData({

                    ...passwordData,

                    confirmPassword:e.target.value

                })

            }

        />



        <div className="password-buttons">

            <button

                className="save-btn"

                onClick={handlePasswordChange}

            >

                Update Password

            </button>



            <button

                className="delete-btn"

                onClick={()=>setShowPasswordModal(false)}

            >

                Cancel

            </button>

        </div>

    </div>

</div>

)

}

</div>

);

}