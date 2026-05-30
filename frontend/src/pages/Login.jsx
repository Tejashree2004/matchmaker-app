import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../api/api";
import { FaTimes } from "react-icons/fa";


function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showPopup, setShowPopup] = useState(false);

const [popupMessage, setPopupMessage] =
  useState("");

const [popupAction, setPopupAction] =
  useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopupMessage(
  "Please fill all fields"
);

setPopupAction("");

setShowPopup(true);

return;
    }

    try {
      const res = await loginUser({ email, password });

      const token = res?.data?.token || res?.token;

      if (!token) {
        setPopupMessage(
  "Login failed ❌"
);

setPopupAction("");

setShowPopup(true);

return;
      }

      localStorage.setItem(
  "jwtToken",
  token
);

setPopupMessage(
  "Login Successful 🎉"
);

setPopupAction("yes");

setShowPopup(true);

    } catch (err) {
      console.error(err);
      setPopupMessage(
  err?.response?.data ||
  "Login failed"
);

setPopupAction("");

setShowPopup(true);
    }
  };

  const handleGuest = () => {
    nav("/profile-setup");
  };

  return (
    <div className="container">
      <div className="card login-card">

        <h2>Login 💖</h2>

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
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <Button text="Login" onClick={handleLogin} />

       

        {/* SIGNUP */}
        <p className="auth-text">
          Don't have an account?{" "}
          <span onClick={() => nav("/signup")}>Signup</span>
        </p>

      </div>
      {/* ================= LOGIN POPUP ================= */}
{showPopup && (

  <div
    className="popup-backdrop"
    onClick={() => {

      setShowPopup(false);

      if (
        popupAction === "yes"
      ) {

        nav("/profile-setup");

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
            "yes"
          ) {

            nav(
              "/profile-setup"
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

export default Login;