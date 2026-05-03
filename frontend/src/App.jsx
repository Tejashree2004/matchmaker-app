import { Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  return (
    <Routes>
      {/* ================= DEFAULT ================= */}
      <Route path="/" element={<Splash />} />

      {/* ================= ONBOARDING ================= */}
      <Route path="/onboarding1" element={<Onboarding1 />} />
      <Route path="/onboarding2" element={<Onboarding2 />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ FIXED ROUTE */}
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ================= PROFILE ================= */}
      <Route path="/profile-setup" element={<ProfileSetup />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;