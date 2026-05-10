import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../api/api";

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await loginUser({ email, password });

      const token = res?.data?.token || res?.token;

      if (!token) {
        return alert("Login failed ❌");
      }

      // save token
      localStorage.setItem("jwtToken", token);

      // ✅ redirect to profile setup (your requirement)
      nav("/profile-setup");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data || "Login failed");
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
    </div>
  );
}

export default Login;