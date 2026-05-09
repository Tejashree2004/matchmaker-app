import {
  FaUser,
  FaLock,
  FaBell,
  FaHeart,
  FaCrown,
  FaShieldAlt,
  FaSignOutAlt,
  FaChevronRight,
  FaCamera,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BottomNavbar from "../components/BottomNavbar";

function Settings() {

  const navigate = useNavigate();

  // ================= USER STATE =================
  const [user, setUser] = useState({});

  // ================= LOAD USER =================
  useEffect(() => {

    const savedUser =
      JSON.parse(localStorage.getItem("userProfile")) || {};

    setUser(savedUser);

  }, []);

  // ================= PROFILE IMAGE =================
  const profileImage =
    user.photoUrl ||
    user.photoPreview ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      icon: <FaUser />,
      title: "Edit Profile",
      sub: "Update your dating profile",
      action: () => navigate("/profile-setup"),
    },

    {
      icon: <FaHeart />,
      title: "Dating Preferences",
      sub: "Match interests & vibe",
    },

    {
      icon: <FaBell />,
      title: "Notifications",
      sub: "Messages & likes",
    },

    {
      icon: <FaLock />,
      title: "Privacy",
      sub: "Control your visibility",
    },

    {
      icon: <FaShieldAlt />,
      title: "Safety",
      sub: "Block & report settings",
    },

    {
      icon: <FaCrown />,
      title: "Premium",
      sub: "Boost profile visibility",
    },
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userProfile");

    navigate("/login");
  };

  return (
    <div className="settings-container">

      {/* ================= TOP ================= */}
      <div className="settings-top">

        <h2>
          My Profile 💖
        </h2>

      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="settings-profile-card">

        <div className="profile-img-wrap">

          <img
            src={profileImage}
            alt="profile"
          />

          {/* CAMERA BUTTON */}
          <div
            className="camera-icon"
            onClick={() => navigate("/profile-setup")}
          >
            <FaCamera />
          </div>

        </div>

        {/* NAME */}
        <h2>
          {user.name || "Your Name"}
        </h2>

    

      </div>

      {/* ================= MENU ================= */}
      <div className="settings-menu">

        {menuItems.map((item, index) => (
          <div
            className="settings-item"
            key={index}
            onClick={item.action}
          >

            <div className="settings-left">

              <div className="settings-icon">
                {item.icon}
              </div>

              <div>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.sub}
                </p>

              </div>

            </div>

            <FaChevronRight className="arrow" />

          </div>
        ))}

      </div>

      {/* ================= LOGOUT ================= */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        <FaSignOutAlt />

        Logout

      </button>

      {/* ================= NAVBAR ================= */}
      <BottomNavbar />

    </div>
  );
}

export default Settings;