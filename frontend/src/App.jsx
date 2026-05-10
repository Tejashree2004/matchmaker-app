import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ================= AUTH =================
import Splash from "./pages/Splash";

import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

import ProfileSetup from "./pages/ProfileSetup";

// ================= MAIN PAGES =================
import Home from "./pages/Home";

import Matches from "./pages/Matches";

import MyLikes from "./pages/MyLikes";

import WhoLikedYou from "./pages/WhoLikedYou";

import Chat from "./pages/Chat";

import Settings from "./pages/Settings";

// ================= COMPONENTS =================
import BottomNavbar from "./components/BottomNavbar";

function App() {

  const location = useLocation();

  // ================= HIDE NAVBAR =================
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
        <Route
          path="/"
          element={<Splash />}
        />

        {/* ================= ONBOARDING ================= */}
        <Route
          path="/onboarding1"
          element={<Onboarding1 />}
        />

        <Route
          path="/onboarding2"
          element={<Onboarding2 />}
        />

        {/* ================= AUTH ================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        {/* ================= PROFILE ================= */}
        <Route
          path="/profile-setup"
          element={<ProfileSetup />}
        />

        {/* ================= HOME ================= */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* ================= MATCHES ================= */}
        <Route
          path="/matches"
          element={<Matches />}
        />

        {/* ================= MY LIKES ================= */}
        <Route
          path="/my-likes"
          element={<MyLikes />}
        />

        {/* ================= WHO LIKED YOU ================= */}
        <Route
          path="/who-liked-you"
          element={<WhoLikedYou />}
        />

        {/* ================= CHAT ================= */}
        <Route
          path="/chat"
          element={<Chat />}
        />

        {/* ================= SETTINGS ================= */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* ================= NAVBAR ================= */}
      {!hideNavbar && (
        <BottomNavbar />
      )}

    </div>
  );
}

export default App;