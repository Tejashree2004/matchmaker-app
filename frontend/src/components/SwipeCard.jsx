import {
  FaMapMarkerAlt,
  FaHeart,
  FaMusic,
  FaStar,
} from "react-icons/fa";

function SwipeCard({ user }) {
  return (
    <div className="swipe-card">

      {/* ================= IMAGE ================= */}
      <img
        src={
          user.photoUrl ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        }
        alt="profile"
        className="swipe-img"
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="overlay"></div>

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
            {user.name || "Sophia"},{" "}
            {user.age || 22}
          </h2>

          <div className="mini-like">
            <FaHeart />
          </div>

        </div>

        {/* LOCATION */}
        <div className="location-row">

          <FaMapMarkerAlt />

          <p>
            {user.location || "Mumbai"}
          </p>

        </div>

        {/* PERSONALITY */}
        <div className="personality-box">

          <FaMusic />

          <span>
            {user.personality || "Fun Loving"}
          </span>

        </div>

        {/* INTERESTS */}
        <div className="interest-wrap">

          {user.interests
            ?.split(",")
            .map((item, index) => (
              <span
                key={index}
                className="interest-chip"
              >
                {item}
              </span>
            ))}

        </div>

        {/* BIO */}
        <p className="bio">
          {user.bio ||
            "Looking for genuine conversations and beautiful vibes ✨"}
        </p>

      </div>

    </div>
  );
}

export default SwipeCard;