import {
  FaMapMarkerAlt,
  FaHeart,

  FaStar,

  FaFire,
} from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaUser } from "react-icons/fa";



  // ================= DEFAULT IMAGE =================
 function SwipeCard({ user }) {

  console.log("SWIPE USER:", user);

  console.log("USER IMAGE DATA:", user);
  
  // ================= SAFE IMAGE =================
const isValidImage = (url) => {
  if (!url) return false;
  if (typeof url !== "string") return false;
  if (!url.trim()) return false;
  if (url.startsWith("blob:")) return false;
  return true;
};

const profileImage =
  isValidImage(user?.photoUrl)
    ? user.photoUrl
    : isValidImage(user?.photo)
    ? user.photo
    : isValidImage(user?.profilePhoto)
    ? user.profilePhoto
    : "";

  // ================= SAFE INTERESTS =================
  const interests =
    Array.isArray(user?.interests)
      ? user.interests
      : typeof user?.interests === "string"
        ? user.interests.split(",").map(i => i.trim())
        : [];

  return (
    <div className="swipe-card">

      {/* ================= IMAGE ================= */}
 {/* ================= IMAGE ================= */}
<div className="swipe-image-wrapper">

  {profileImage ? (

    <img
      src={profileImage}
      alt="profile"
      className="swipe-img"
    />

  ) : (

    <div className="no-image-placeholder">
   {user?.name?.charAt(0)?.toUpperCase()}
    </div>

  )}

  {/* DARK OVERLAY */}
  <div className="overlay"></div>

</div>

      {/* ================= TOP BADGES ================= */}
      <div className="card-top-badges">

        <div className="online-badge">
          <span className="dot"></span>
          Online
        </div>

        <div className="premium-badge">
          <FaStar />
          Premium
        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="swipe-content">

        {/* NAME + AGE */}
        <div className="name-row">

          <h2>
            {user?.name || "Unknown"}, {user?.age || "--"}
          </h2>

          <div className="mini-like">
            <FaHeart />
          </div>

        </div>

        {/* LOCATION */}
        <div className="location-row">

          <FaMapMarkerAlt />

          <p>
            {user?.location || "Not available"}
          </p>

        </div>

      {/* PERSONALITY */}
<div className="personality-box">

  <FaUser />

  <span>
    {user?.personality || "Fun Loving"}
  </span>

</div>

        {/* LANGUAGE */}
{user?.language ? (
  <div className="language-box">

    <FaGlobe />

    <span>
      {user.language}
    </span>

  </div>
) : null}

        {/* VIBE */}
        {user?.vibe ? (
          <div className="vibe-box">

            <FaFire />

            <span>
              {user.vibe}
            </span>

          </div>
        ) : null}

        {/* INTERESTS */}
        <div className="interest-wrap">

          {interests.length > 0 ? (
            interests.map((item, index) => (
              <span
                key={index}
                className="interest-chip"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="interest-chip">
              ✨ Good Vibes
            </span>
          )}

        </div>

        {/* BIO */}
        <p className="bio">

          {user?.bio ||
            "Looking for genuine conversations and beautiful vibes ✨"}

        </p>

      </div>

    </div>
  );
}

export default SwipeCard;