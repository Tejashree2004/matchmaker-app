import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfileAvatar() {

  const navigate = useNavigate();

  // ================= STATE =================
  const [userData, setUserData] =
    useState({});

  // ================= LOAD USER =================
  useEffect(() => {

    const loadUser = () => {

      try {

        const storedUser =
          JSON.parse(
            localStorage.getItem(
              "userProfile"
            )
          ) || {};

        setUserData(storedUser);

      } catch {

        setUserData({});

      }
    };

    loadUser();

    // ================= STORAGE UPDATE =================
    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };

  }, []);

  // ================= PROFILE IMAGE =================
  const image =
    userData.photoPreview ||
    userData.photoUrl ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

  // ================= USER NAME =================
  const userName =
    userData.name || "Profile";

  return (

    <div className="profile-avatar-wrapper">

      {/* ================= AVATAR ================= */}
      <div
        className="profile-avatar"
        onClick={() => navigate("/settings")}
      >

        <img
          src={image}
          alt="profile"
          className="profile-avatar-img"
        />

        {/* ================= ONLINE DOT ================= */}
        <span className="online-dot"></span>

      </div>

      {/* ================= TOOLTIP ================= */}
      <div className="profile-tooltip">

        {userName}

      </div>

    </div>
  );
}

export default ProfileAvatar;