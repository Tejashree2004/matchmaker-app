import { useEffect, useState } from "react";

import {
  FaHeart,
  FaTimes,
} from "react-icons/fa";

import axiosInstance from "../api/axios";

import SwipeCard from "../components/SwipeCard";
import BottomNavbar from "../components/BottomNavbar";
import ProfileAvatar from "../components/ProfileAvatar";

function Home() {

  // ================= STATES =================
  const [users, setUsers] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH USERS =================
  useEffect(() => {

    fetchUsers();

  }, []);

  // ================= GET USERS =================
  const fetchUsers = async () => {

    try {

      setLoading(true);

const response =
  await axiosInstance.get(
    "/Profile/users"
  );

console.log(
  "✅ USERS:",
  response
);

const loggedInUserId =
  Number(
    localStorage.getItem("userId")
  );

const filteredUsers =
  Array.isArray(response)
    ? response.filter(
        (u) =>
          u.id !== loggedInUserId
      )
    : [];

setUsers(filteredUsers);

    } catch (err) {

      console.log(
        "❌ Fetch users error:",
        err
      );

      setUsers([]);

    } finally {

      setLoading(false);

    }
  };

  // ================= HANDLE SWIPE =================
  const handleSwipe = async (
    isLike
  ) => {

    const selectedUser =
      users[currentIndex];

    if (!selectedUser) return;

    // ================= SAVE TO BACKEND =================
    try {

     await axiosInstance.post(
  "/Profile/swipe",
        {
          likedUserId:
            selectedUser.id,

          isLike,
        }
      );

    } catch (err) {

      console.log(
        "❌ Swipe API Error:",
        err
      );
    }

    // ================= SAVE LIKES =================
    if (isLike) {

      const existingLikes =
        JSON.parse(
          localStorage.getItem(
            "myLikes"
          )
        ) || [];

      const alreadyLiked =
        existingLikes.some(
          (item) =>
            item.id ===
            selectedUser.id
        );

      if (!alreadyLiked) {

        existingLikes.push(
          selectedUser
        );

        localStorage.setItem(
          "myLikes",
          JSON.stringify(
            existingLikes
          )
        );
      }
    }

    // ================= NEXT PROFILE =================
    setCurrentIndex(
      (prev) => prev + 1
    );
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="home-container">

        <div className="loading-screen">

          <div className="loader-heart">
            💖
          </div>

          <h2>
            Finding your perfect vibe...
          </h2>

        </div>

      </div>
    );
  }

  // ================= EMPTY STATE =================
  if (
    !users ||
    users.length === 0 ||
    currentIndex >= users.length
  ) {

    return (

      <div className="home-container">

        {/* HEADER */}
        <div className="home-header">

          <div>

            <h1 className="app-logo">
              SoulSync 💖
            </h1>

            <p className="home-subtitle">
              No new profiles nearby
            </p>

          </div>

          <ProfileAvatar />

        </div>

        {/* EMPTY */}
        <div className="empty-wrapper">

          <div className="empty-icon">
            💔
          </div>

          <h2>
            No More Profiles
          </h2>

          <p>
            New people will appear soon.
          </p>

        </div>

        <BottomNavbar />

      </div>
    );
  }

  
// ================= CURRENT USER =================

const currentUser =
  users[currentIndex] || null;

console.log(
  "CURRENT USER:",
  currentUser
);

return (

    <div className="home-container">

      {/* ================= HEADER ================= */}
      <div className="home-header">

        <div>

          <h1 className="app-logo">
            SoulSync 💖
          </h1>

          <p className="home-subtitle">
            Discover meaningful connections
          </p>

        </div>

        <ProfileAvatar />

      </div>

      {/* ================= CARD ================= */}
      <div className="main-card-wrapper">

       {currentUser && (
  <SwipeCard
    user={currentUser}
  />
)}

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="swipe-actions">

        {/* DISLIKE */}
        <button
          className="swipe-btn dislike-btn"
          onClick={() =>
            handleSwipe(false)
          }
        >

          <FaTimes />

        </button>

        {/* LIKE */}
        <button
          className="swipe-btn like-btn"
          onClick={() =>
            handleSwipe(true)
          }
        >

          <FaHeart />

        </button>

      </div>

      {/* SPACE */}
      <div
        style={{
          height: "120px",
        }}
      ></div>

      {/* NAVBAR */}
      <BottomNavbar />

    </div>
  );
}

export default Home;