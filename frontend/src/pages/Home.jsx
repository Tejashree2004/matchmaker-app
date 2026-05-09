import { useEffect, useState } from "react";

import {
  FaHeart,
  FaTimes,
  FaFire,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";

import SwipeCard from "../components/SwipeCard";
import BottomNavbar from "../components/BottomNavbar";
import ProfileAvatar from "../components/ProfileAvatar";

function Home() {

  const navigate = useNavigate();

  // ================= STATES =================
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  // ================= FETCH USERS =================
  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const response =
        await axiosInstance.get("/Profile/users");

      console.log("✅ USERS:", response);

      if (Array.isArray(response)) {

        setUsers(response);

      } else {

        setUsers([]);

      }

    } catch (err) {

      console.log("❌ Fetch users error:", err);

      setUsers([]);

    } finally {

      setLoading(false);

    }
  };

  // ================= SWIPE =================
  const handleSwipe = async (isLike) => {

    try {

      const selectedUser = users[currentIndex];

      if (!selectedUser) return;

      // SAVE SWIPE
      await axiosInstance.post("/Profile/swipe", {
        likedUserId: selectedUser.id,
        isLike,
      });

      // SAVE MATCH LOCALLY
      if (isLike) {

        const existingMatches =
          JSON.parse(localStorage.getItem("matches")) || [];

        const alreadyExists =
          existingMatches.some(
            (item) => item.id === selectedUser.id
          );

        if (!alreadyExists) {

          existingMatches.push(selectedUser);

          localStorage.setItem(
            "matches",
            JSON.stringify(existingMatches)
          );
        }
      }

      // NEXT USER
      setCurrentIndex((prev) => prev + 1);

    } catch (err) {

      console.log("❌ Swipe error:", err);

      setCurrentIndex((prev) => prev + 1);

    }
  };

  // ================= MY PROFILE =================
  const myProfile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

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

        {/* ================= HEADER ================= */}
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

        {/* ================= EMPTY ================= */}
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
  const currentUser = users[currentIndex];

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

      {/* ================= MAIN CARD ================= */}
      <div className="main-card-wrapper">

        <SwipeCard user={currentUser} />

      </div>

      

      {/* ================= ACTION BUTTONS ================= */}
      <div className="swipe-actions">

        {/* DISLIKE */}
        <button
          className="swipe-btn dislike-btn"
          onClick={() => handleSwipe(false)}
        >
          <FaTimes />
        </button>

        {/* LIKE */}
        <button
          className="swipe-btn like-btn"
          onClick={() => handleSwipe(true)}
        >
          <FaHeart />
        </button>

      </div>

      {/* ================= BOTTOM SPACE ================= */}
      <div style={{ height: "120px" }}></div>

      {/* ================= NAVBAR ================= */}
      <BottomNavbar />

    </div>
  );
}

export default Home;