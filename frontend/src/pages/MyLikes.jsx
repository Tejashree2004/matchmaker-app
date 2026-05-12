import { useEffect, useState } from "react";

import BottomNavbar from "../components/BottomNavbar";
import axiosInstance from "../api/axios";
function MyLikes() {

  // ================= STATES =================
  const [likedUsers, setLikedUsers] =
    useState([]);

  // ================= LOAD LIKES =================
useEffect(() => {

  fetchLikes();

}, []);

const fetchLikes = async () => {

  try {

    const response =
      await axiosInstance.get(
        "/Profile/my-likes"
      );

    const data =
      response?.data || [];

    setLikedUsers(data);

  } catch (err) {

    console.log(
      "❌ Fetch likes error:",
      err
    );

    setLikedUsers([]);
  }
};

  return (

    <div className="home-container">

      {/* ================= HEADER ================= */}
      <div className="home-header">

        <div>

          <h1 className="app-logo">
            You Liked 💖
          </h1>

          <p className="home-subtitle">
            Profiles you liked
          </p>

        </div>

      </div>

      {/* ================= EMPTY ================= */}
      {likedUsers.length === 0 ? (

        <div className="empty-wrapper">

          <div className="empty-icon">
            💔
          </div>

          <h2>
            No Likes Yet
          </h2>

          <p>
            Start liking profiles to see them here.
          </p>

        </div>

      ) : (

        /* ================= LIKES GRID ================= */
        <div className="likes-grid">

          {likedUsers.map(
            (user, index) => (

              <div
                className="liked-card"
                key={user.id || index}
              >

                {/* PROFILE IMAGE */}
      {user.photoUrl ? (

<img
  className="liked-img"
  src={user.photoUrl}
  alt="profile"
  onError={(e) => {
    e.target.style.display = "none";
  }}
/>

) : (

  <div className="liked-empty">
    No Photo
  </div>

)}

                {/* INFO */}
                <div className="liked-info">

                  <h3>
                    {user.name || "Unknown"}
                  </h3>

                  <p>
                    📍 {user.location || "Unknown"}
                  </p>

                  <p>
                    🎂 {user.age || "18"}
                  </p>

                  <p>
                    ✨ {user.bio || "No bio"}
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* NAVBAR SPACE */}
      <div style={{ height: "100px" }} />

      <BottomNavbar />

    </div>
  );
}

export default MyLikes;