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
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BottomNavbar from "../components/BottomNavbar";

function Settings() {

  const navigate = useNavigate();

  // ================= USER STATE =================
  const [user, setUser] = useState(null);

  // ================= DEFAULT IMAGE =================
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  // ================= LOAD USER =================
  useEffect(() => {

    const loadUser = () => {

      try {

        const savedUser =
          JSON.parse(
            localStorage.getItem(
              "userProfile"
            )
          ) || {};

        setUser(savedUser);

      } catch {

        setUser({});
      }
    };

    // Initial load
    loadUser();

    // Live updates
    window.addEventListener(
      "userProfileUpdated",
      loadUser
    );

    return () => {

      window.removeEventListener(
        "userProfileUpdated",
        loadUser
      );

    };

  }, []);

  // ================= PROFILE IMAGE =================
  const profileImage =
    user?.photoUrl ||
    user?.photoPreview ||
    defaultAvatar;

  // ================= MENU ITEMS =================
  const menuItems = [

    {
      icon: <FaUser />,
      title: "Edit Profile",
      sub: "Update your dating profile",
      action: () =>
        navigate("/profile-setup"),
    },

    {
      icon: <FaHeart />,
      title: "Dating Preferences",
      sub: "Match interests & vibe",
      action: () =>
        navigate("/preferences"),
    },

    // ================= NEW =================
    {
      icon: <FaHeart />,
      title: "Who Liked You",
      sub: "People interested in you",
      action: () =>
  navigate("/who-liked-you"),
    },

    {
      icon: <FaUsers />,
      title: "You Liked",
      sub: "Profiles you liked",
      action: () =>
       navigate("/my-likes"),
    },

    {
      icon: <FaCheckCircle />,
      title: "Matches",
      sub: "You both liked each other",
      action: () =>
        navigate("/matches"),
    },

    {
      icon: <FaBell />,
      title: "Notifications",
      sub: "Messages & likes",
      action: () =>
        navigate("/notifications"),
    },

    {
      icon: <FaLock />,
      title: "Privacy",
      sub: "Control your visibility",
      action: () =>
        navigate("/privacy"),
    },

    {
      icon: <FaShieldAlt />,
      title: "Safety",
      sub: "Block & report settings",
      action: () =>
        navigate("/safety"),
    },

    {
      icon: <FaCrown />,
      title: "Premium",
      sub: "Boost profile visibility",
      action: () =>
        navigate("/premium"),
    },
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem(
      "jwtToken"
    );

    localStorage.removeItem(
      "userProfile"
    );

    window.dispatchEvent(
      new Event(
        "userProfileUpdated"
      )
    );

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

        {/* IMAGE */}
        <div className="profile-img-wrap">

          <img
            src={profileImage}
            alt="profile"
            className="settings-profile-img"
          />

          {/* CAMERA BUTTON */}
          <div
            className="camera-icon"
            onClick={() =>
              navigate(
                "/profile-setup"
              )
            }
          >

            <FaCamera />

          </div>

        </div>

        {/* NAME */}
        <h2 className="settings-user-name">

          {user?.name ||
            "Your Name"}

        </h2>

        {/* EXTRA INFO */}
        <p className="settings-user-bio">

          {user?.bio ||
            "Build your vibe & meet amazing people ✨"}

        </p>

      </div>

      {/* ================= MENU ================= */}
      <div className="settings-menu">

        {menuItems.map(
          (item, index) => (

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
          )
        )}

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