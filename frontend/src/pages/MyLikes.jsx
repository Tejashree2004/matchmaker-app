import { useEffect, useState } from "react";

import BottomNavbar from "../components/BottomNavbar";

function MyLikes() {

  // ================= STATES =================
  const [likedUsers, setLikedUsers] =
    useState([]);

  // ================= LOAD LIKES =================
  useEffect(() => {

    const savedLikes =
      JSON.parse(
        localStorage.getItem(
          "myLikes"
        )
      ) || [];

    console.log(
      "💖 MY LIKES:",
      savedLikes
    );

    setLikedUsers(savedLikes);

  }, []);

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
                <img
                  className="liked-img"
                  src={
                    user.photoUrl ||
                    user.photoPreview ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                />

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