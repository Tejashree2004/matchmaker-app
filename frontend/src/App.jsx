import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ================= AUTH & ONBOARDING =================
import Splash from "./pages/Splash";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

import ProfileSetup from "./pages/ProfileSetup";

// ================= MAIN APP PAGES =================
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";

// ================= COMPONENTS =================
import BottomNavbar from "./components/BottomNavbar";
import SwipeCard from "./components/SwipeCard";
import ProfileAvatar from "./components/ProfileAvatar";

function App() {
  const location = useLocation();

  // ================= HIDE NAVBAR PAGES =================
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("verify") ||
    location.pathname.includes("onboarding") ||
    location.pathname.includes("profile-setup");

  return (
    <div className="app-wrapper">

      {/* ================= ROUTES ================= */}
      <Routes>

        {/* ================= SPLASH ================= */}
        <Route path="/" element={<Splash />} />

        {/* ================= ONBOARDING ================= */}
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* ================= PROFILE SETUP ================= */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* ================= MAIN APP ================= */}
        <Route path="/home" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* ================= GLOBAL COMPONENTS ================= */}

      {!hideNavbar && <BottomNavbar />}

    </div>
  );
}

export default App;