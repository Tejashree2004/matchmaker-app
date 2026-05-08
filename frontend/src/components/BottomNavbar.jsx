import { NavLink } from "react-router-dom";

import {
  FaHeart,
  FaComments,
  FaUser,
  FaHome,
} from "react-icons/fa";

function BottomNavbar() {

  const profile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  return (
    <div className="bottom-navbar">

      {/* HOME */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaHome />
      </NavLink>

      {/* MATCHES */}
      <NavLink
        to="/matches"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaHeart />
      </NavLink>

      {/* CHAT */}
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaComments />
      </NavLink>

      {/* PROFILE */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >

        {profile.photoPreview ? (
          <img
            src={profile.photoPreview}
            alt="profile"
            className="nav-profile-img"
          />
        ) : (
          <FaUser />
        )}

      </NavLink>

    </div>
  );
}

export default BottomNavbar;