import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";

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

const navigate = useNavigate();

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

const loggedInUserId = localStorage.getItem("userId");

console.log(
  "LOGGED USER ID:",
  loggedInUserId
);
const allUsers = Array.isArray(response)
  ? response
  : [];
console.log(
  "ALL USERS:",
  allUsers
);

const filteredUsers =
  allUsers.filter(
    (u) =>
     String(u.id) !== String(loggedInUserId)
  );
  setUsers(filteredUsers);

console.log(
  "FILTERED USERS:",
  filteredUsers
);




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
const handleSwipe = async (
  isLike,
  swipedUser
) => {

  if (!swipedUser) return;

  try {

    await axiosInstance.post(
      "/Profile/swipe",
      {
        likedUserId: swipedUser.id,
        isLike: isLike
      }
    );

    // remove card from UI
    setUsers((prev) =>
      prev.filter(
        (u) => u.id !== swipedUser.id
      )
    );

  } catch (err) {

    console.log(
      "Swipe error",
      err
    );
  }
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
  users.length === 0 
) {

    return (

      <div className="home-container">

        {/* HEADER */}
        <div className="home-header">

          <div>

            <h1 className="app-logo">
              MatchMaker 💖
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
  users.length > 0
    ? users[0]
    : null;

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
           MatchMaker 💖
          </h1>

          <p className="home-subtitle">
            Discover meaningful connections
          </p>

        </div>

        <ProfileAvatar />

      </div>

 {/* ================= CARD ================= */}
<div className="scroll-profiles-container">

{currentUser ? (

    <TinderCard
      key={currentUser.id}
      preventSwipe={["up", "down"]}
      onSwipe={(dir) => {

        if (dir === "right") {

       handleSwipe(
  true,
  currentUser
);

        } else if (dir === "left") {

        handleSwipe(
  false,
  currentUser
);

        }

      }}
    >

   <div
  className="scroll-profile"
  onClick={() =>
    navigate("/profile-view", {
      state: { user: currentUser },
    })
  }
>

        <SwipeCard
          user={currentUser}
        />

        <div className="swipe-actions">

          {/* DISLIKE */}
          <button
            className="swipe-btn dislike-btn"
           onClick={(e) => {
  e.stopPropagation(); // ✅ IMPORTANT
  handleSwipe(false, currentUser);
}}
          >

            <FaTimes />

          </button>

          {/* LIKE */}
          <button
            className="swipe-btn like-btn"
            onClick={(e) => {
  e.stopPropagation();
  handleSwipe(true, currentUser);
}}
          >

            <FaHeart />

          </button>

        </div>

      </div>

    </TinderCard>

) : (

  <div className="empty-wrapper">

    <h2>No Profile Found 💔</h2>

  </div>

)} 

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