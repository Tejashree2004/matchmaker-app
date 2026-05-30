import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { signupUser } from "../api/api";
import { FaTimes } from "react-icons/fa";

function Signup() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [showPopup, setShowPopup] =
  useState(false);

const [popupMessage, setPopupMessage] =
  useState("");

const [popupAction, setPopupAction] =
  useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!email || !password) {
      setPopupMessage(
  "Email and Password required"
);

setPopupAction("");

setShowPopup(true);

return;
    }

    if (password !== confirmPassword) {
      setPopupMessage(
  "Passwords do not match 💔"
);

setPopupAction("");

setShowPopup(true);

return;
    }

    if (password.length < 6) {
setPopupMessage(
  "Password must be at least 6 characters"
);

setPopupAction("");

setShowPopup(true);

return;
    }

    console.log("🚀 PAYLOAD:", { email, password });

    try {
      const res = await signupUser({ email, password });

      console.log("✅ SUCCESS:", res);
nav("/verify-email", { state: { email } });
    } catch (err) {
      console.log("❌ FULL ERROR:", err);

    setPopupMessage(
  err?.message ||
  err?.response?.data ||
  "Signup failed"
);

setPopupAction("");

setShowPopup(true);
    }
  };

  return (
    <div className="container">
      <div className="card login-card">

        <h2>Signup 💕</h2>

        {/* EMAIL */}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="password-box">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="password-box">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
            style={{ cursor: "pointer" }}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {/* BUTTON */}
        <Button text="Signup" onClick={handleSignup} />

        {/* LOGIN LINK */}
        <p className="auth-text">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>
            Login
          </span>
        </p>

      </div>
      {/* ================= SIGNUP POPUP ================= */}
{showPopup && (

  <div
    className="popup-backdrop"
    onClick={() => {

      setShowPopup(false);

      if (
        popupAction === "success"
      ) {

        nav(
          "/verify-email",
          {
            state: { email }
          }
        );

      }

    }}
  >

    <div
      className="success-popup"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <div
        className="popup-close"
        onClick={() => {

          setShowPopup(false);

          if (
            popupAction ===
            "success"
          ) {

            nav(
              "/verify-email",
              {
                state: { email }
              }
            );

          }

        }}
      >
        <FaTimes />
      </div>

      <h2>
        {popupMessage}
      </h2>

      <p>
        Do you want to continue?
      </p>

      <div className="popup-buttons">

        <button
          className="yes-btn"
          onClick={() =>
            setPopupAction("yes")
          }
        >
          Yes
        </button>

        <button
          className="no-btn"
          onClick={() =>
            setPopupAction("no")
          }
        >
          No
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}

export default Signup;