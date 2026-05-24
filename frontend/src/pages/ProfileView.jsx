
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaUser,
  FaGlobe,
  FaFire,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";

function ProfileView() {

  const location = useLocation();

  const navigate = useNavigate();

  const user = location.state?.user;

  if (!user) {

    return (

      <div className="profile-view-container">

        <div className="empty-wrapper">

          <h2>
            User not found 💔
          </h2>

        </div>

      </div>
    );
  }

  const interests =
    Array.isArray(user?.interests)
      ? user.interests
      : typeof user?.interests === "string"
      ? user.interests
          .split(",")
          .map((i) => i.trim())
      : [];

  return (

    <div className="profile-view-container">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="profile-bg-circle one"></div>
      <div className="profile-bg-circle two"></div>

      {/* ================= HEADER ================= */}
      <div className="profile-view-header">

        <button
          className="back-btn"
          onClick={() =>
            navigate(-1)
          }
        >

          <FaArrowLeft />

        </button>

        <h1 className="profile-title">
          Profile 💖
        </h1>

      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="profile-card">

        {/* ================= IMAGE ================= */}
        <div className="profile-image-wrapper">

          {user.photoUrl ? (

            <img
              src={user.photoUrl}
              alt="profile"
              className="profile-main-img"
            />

          ) : (

            <div className="profile-placeholder">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

          )}

          {/* OVERLAY */}
          <div className="profile-image-overlay"></div>

          {/* PREMIUM */}
          <div className="profile-premium-badge">
            ✨ Premium Vibes
          </div>

          {/* ONLINE */}
          <div className="profile-online-status">

            <span className="online-dot"></span>

            Online

          </div>

        </div>

        {/* ================= CONTENT ================= */}
        <div className="profile-info">

          {/* NAME */}
          <div className="profile-name-row">

            <div>

              <h2 className="profile-name">

                {user.name},
                {" "}
                {user.age}

              </h2>

              <p className="profile-tagline">

                Looking for genuine vibes ✨

              </p>

            </div>

            <div className="profile-like-icon">

              <FaHeart />

            </div>

          </div>

          {/* ================= BASIC INFO ================= */}

          <h3 className="section-title">
            Basic Info
          </h3>

          {/* LOCATION */}
          <div className="profile-info-card">

            <FaMapMarkerAlt />

            <span>
              {user.location || "Unknown"}
            </span>

          </div>

          {/* PERSONALITY */}
          <div className="profile-info-card">

            <FaUser />

            <span>
              {user.personality || "Fun Loving"}
            </span>

          </div>

          {/* LANGUAGE */}
          {user.language && (

            <div className="profile-info-card">

              <FaGlobe />

              <span>
                {user.language}
              </span>

            </div>

          )}

          {/* VIBE */}
          {user.vibe && (

            <div className="profile-info-card">

              <FaFire />

              <span>
                {user.vibe}
              </span>

            </div>

          )}

          {/* ================= INTERESTS ================= */}

          <h3 className="section-title">
            Interests
          </h3>

          <div className="profile-interest-wrap">

            {interests.length > 0 ? (

              interests.map(
                (item, index) => (

                  <span
                    key={index}
                    className="interest-chip"
                  >

                    {item}

                  </span>
                )
              )

            ) : (

              <span className="interest-chip">

                ✨ Good Vibes

              </span>

            )}

          </div>

          {/* ================= ABOUT ================= */}

          <div className="profile-about">

            <h3>
              About Me ✨
            </h3>

            <p>

              {user.bio ||
                "Looking for genuine conversations ✨"}

            </p>

          </div>

          {/* ================= ACTION BUTTONS ================= */}

          

        </div>

      </div>

    </div>
  );
}

export default ProfileView;

