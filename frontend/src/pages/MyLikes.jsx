import { useEffect, useState } from "react";

import {
  FaMapMarkerAlt,
  FaHeart,
  FaFire,
  FaUser,
} from "react-icons/fa";

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

  // ================= GET LIKES =================
const fetchLikes = async () => {

  try {

    const res =
      await axiosInstance.get(
        "/Profile/my-likes"
      );

    setLikedUsers(res || []);

  } catch (err) {

    console.log(
      "❌ Likes error:",
      err
    );

    setLikedUsers([]);
  }
};
// ================= REMOVE LIKE =================
const removeLike = async (likedUserId) => {

  try {

    await axiosInstance.post(
      "/Profile/swipe",
      {
        likedUserId: likedUserId,
        isLike: false
      }
    );

    // UI se remove karo
    setLikedUsers((prev) =>
      prev.filter(
        (u) => u.id !== likedUserId
      )
    );

  } catch (err) {

    console.log(
      "❌ Remove like error:",
      err
    );
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
      {!likedUsers || likedUsers.length === 0 ? (

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

        /* ================= LIKES LIST ================= */
        <div className="likes-list">

          {likedUsers?.map(
            (user, index) => (

              <div
                className="liked-card"
              key={`${user.id}-${index}`}
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

                 <div
  className="liked-heart"
  onClick={() =>
    removeLike(user.id)
  }
>

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

export default MyLikes;