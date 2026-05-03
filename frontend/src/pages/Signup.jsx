import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { signupUser } from "../api/api";

function Signup() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!email || !password) {
      return alert("Email and Password required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match 💔");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    console.log("🚀 PAYLOAD:", { email, password });

    try {
      const res = await signupUser({ email, password });

      console.log("✅ SUCCESS:", res);
nav("/verify-email", { state: { email } });
    } catch (err) {
      console.log("❌ FULL ERROR:", err);

      alert(
        err?.message ||
        err?.response?.data ||
        "Signup failed"
      );
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
    </div>
  );
}

export default Signup;