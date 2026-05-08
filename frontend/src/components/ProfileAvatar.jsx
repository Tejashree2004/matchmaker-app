import { useNavigate } from "react-router-dom";

function ProfileAvatar() {
  const navigate = useNavigate();

  // ================= USER DATA =================
  const userData =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  const image =
    userData.photoPreview ||
    userData.photoUrl ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

  return (
    <div
      className="profile-avatar"
      onClick={() => navigate("/settings")}
    >
      <img src={image} alt="profile" />

      {/* ONLINE DOT */}
      <span className="online-dot"></span>
    </div>
  );
}

export default ProfileAvatar;