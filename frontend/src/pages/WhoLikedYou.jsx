import { useEffect, useState } from "react";

import {
  FaMapMarkerAlt,
  FaHeart,
  FaFire,
  FaUser,
} from "react-icons/fa";

import axiosInstance from "../api/axios";

import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/BottomNavbar";

function WhoLikedYou() {

  const navigate = useNavigate();

  // ================= STATES =================
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================
  useEffect(() => {

    fetchLikedUsers();

  }, []);

  // ================= API =================
  const fetchLikedUsers = async () => {

    try {

      setLoading(true);

      const response =
        await axiosInstance.get(
          "/Profile/liked-me"
        );

      console.log(
        "LIKED ME:",
        response.data
      );

     setUsers(response || []);

    } catch (err) {

      console.log(
        "Liked Me Error:",
        err
      );

      setUsers([]);

    } finally {

      setLoading(false);

    }
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="home-container">

        <div className="loading-screen">

          <div className="loader-heart">
            💘
          </div>

          <h2>
            Loading likes...
          </h2>

        </div>

      </div>
    );
  }

  return (

    <div className="home-container">

      {/* ================= HEADER ================= */}
      <div className="home-header">

        <div>

          <h1 className="app-logo">
            Who Liked You 💘
          </h1>

          <p className="home-subtitle">
            People interested in you
          </p>

        </div>

      </div>

      {/* ================= EMPTY ================= */}
      {users.length === 0 ? (

        <div className="empty-wrapper">

          <div className="empty-icon">
            😢
          </div>

          <h2>
            No Likes Yet
          </h2>

          <p>
            Nobody liked your profile yet.
          </p>

        </div>

      ) : (

        /* ================= LIST ================= */
        <div className="likes-list">

          {users.map(
            (user, index) => (

              <div
                className="liked-card"
                key={`${user.id}-${index}`}
                onClick={() =>
                  navigate("/profile-view", {
                    state: { user },
                  })
                }
              >

                {/* ================= IMAGE ================= */}
                <div className="liked-image-wrapper">

                  {user.photoUrl ? (

                    <img
                      src={user.photoUrl}
                      alt="profile"
                      className="liked-img"
                    />

                  ) : (

                    <div className="liked-empty">

                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}

                    </div>

                  )}

                  <div className="liked-overlay"></div>

                </div>

                {/* ================= CONTENT ================= */}
                <div className="liked-content">

                  {/* NAME */}
                  <div className="liked-name-row">

                    <h2>

                      {user.name || "Unknown"},
                      {" "}
                      {user.age || "18"}

                    </h2>

                    <div className="liked-heart">

                      <FaHeart />

                    </div>

                  </div>

                  {/* LOCATION */}
                  <div className="liked-location">

                    <FaMapMarkerAlt />

                    <span>

                      {user.location || "Unknown"}

                    </span>

                  </div>

                  {/* PERSONALITY */}
                  <div className="liked-personality">

                    <FaUser />

                    <span>

                      {user.personality ||
                        "Fun Loving"}

                    </span>

                  </div>

                  {/* VIBE */}
                  {user.vibe && (

                    <div className="liked-vibe">

                      <FaFire />

                      <span>
                        {user.vibe}
                      </span>

                    </div>

                  )}

                  {/* BIO */}
                  <p className="liked-bio">

                    {user.bio ||
                      "Looking for genuine vibes ✨"}

                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* ================= SPACE ================= */}
      <div
        style={{
          height: "100px",
        }}
      />

      {/* ================= NAVBAR ================= */}
      <BottomNavbar />

    </div>
  );
}

export default WhoLikedYou;