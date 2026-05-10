import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfileAvatar() {

  const navigate = useNavigate();

  // ================= STATE =================
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userProfile")) || {};
    } catch {
      return {};
    }
  });

  // ================= DEFAULT IMAGE =================
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  // ================= LIVE UPDATE =================
  useEffect(() => {

    const loadUser = () => {
      try {
        const storedUser =
          JSON.parse(localStorage.getItem("userProfile")) || {};
        setUserData(storedUser);
      } catch {
        setUserData({});
      }
    };

    window.addEventListener("userProfileUpdated", loadUser);

    return () => {
      window.removeEventListener("userProfileUpdated", loadUser);
    };

  }, []);

  // ================= SAFE IMAGE (IMPORTANT FIX) =================
  const image =
    userData?.photoUrl ||
    defaultAvatar;

  // ❌ photoPreview removed (CAUSES BLOB ERRORS)

  // ================= USER NAME =================
  const userName =
    userData?.name || "Profile";

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

        {/* ONLINE DOT */}
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