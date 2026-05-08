import { useEffect, useState } from "react";

import {
  FaHeart,
  FaTimes,
  FaFire,
  FaComments,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";

import SwipeCard from "../components/SwipeCard";
import BottomNavbar from "../components/BottomNavbar";
import ProfileAvatar from "../components/ProfileAvatar";

function Home() {
  const navigate = useNavigate();

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

      setUsers(response || []);
    } catch (err) {
      console.log("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= SWIPE =================
  const handleSwipe = async (isLike) => {
    try {
      const selectedUser = users[currentIndex];

      if (!selectedUser) return;

      // BACKEND API
      await axiosInstance.post("/Profile/swipe", {
        likedUserId: selectedUser.id,
        isLike,
      });

      // LOCAL MATCH SAVE
      if (isLike) {
        const existing =
          JSON.parse(localStorage.getItem("matches")) || [];

        existing.push(selectedUser);

        localStorage.setItem(
          "matches",
          JSON.stringify(existing)
        );
      }

      // NEXT CARD
      setCurrentIndex((prev) => prev + 1);

    } catch (err) {
      console.log("Swipe error:", err);
    }
  };

  // ================= USER PROFILE =================
  const myProfile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="home-container">

        <div className="empty-card">

          <h2>Finding your vibe 💖</h2>

          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </div>
    );
  }

  // ================= EMPTY =================
  if (!users.length || currentIndex >= users.length) {
    return (
      <div className="home-container">

        {/* ================= TOP BAR ================= */}
        <div className="top-bar">

          <div>
            <h2 className="logo-text">
              SoulSync 💖
            </h2>

            <p className="top-sub">
              No new matches right now
            </p>
          </div>

          <ProfileAvatar />

        </div>

        {/* ================= EMPTY ================= */}
        <div className="empty-state-card">

          <div className="empty-heart">
            💔
          </div>

          <h2>No More Profiles</h2>

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

      {/* ================= TOP BAR ================= */}
      <div className="top-bar">

        <div>

          <h2 className="logo-text">
            SoulSync 💖
          </h2>

          <p className="top-sub">
            Discover your perfect vibe
          </p>

        </div>

        <div className="top-right">

          {/* MATCHES */}
          <button
            className="top-circle-btn"
            onClick={() => navigate("/matches")}
          >
            <FaHeart />
          </button>

          {/* CHAT */}
          <button
            className="top-circle-btn"
            onClick={() => navigate("/chat")}
          >
            <FaComments />
          </button>

          {/* PROFILE */}
          <ProfileAvatar />

        </div>

      </div>

      {/* ================= SWIPE CARD ================= */}
      <div className="card-stack">

        <SwipeCard user={currentUser} />

      </div>

      {/* ================= USER SMALL INFO ================= */}
      <div className="mini-profile-bar">

        <div>

          <h3>
            {myProfile.name || "You"} ✨
          </h3>

          <p>
            {myProfile.location || "India"}
          </p>

        </div>

        <div className="fire-box">
          <FaFire />
          <span>24</span>
        </div>

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="action-buttons">

        {/* DISLIKE */}
        <button
          className="circle-btn dislike"
          onClick={() => handleSwipe(false)}
        >
          <FaTimes />
        </button>

        {/* LIKE */}
        <button
          className="circle-btn like"
          onClick={() => handleSwipe(true)}
        >
          <FaHeart />
        </button>

      </div>

      {/* ================= NAVBAR ================= */}
      <BottomNavbar />

    </div>
  );
}

export default Home;