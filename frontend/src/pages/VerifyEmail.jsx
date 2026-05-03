import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { verifyEmailOtp } from "../api/api";

function VerifyEmail() {
  const nav = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const email = location.state?.email;

  if (!email) {
    nav("/signup");
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      return alert("Please enter OTP");
    }

    try {
      await verifyEmailOtp({ email, otp });

      alert("Email verified 🎉");
      nav("/login");

    } catch (err) {
      console.log(err);
      alert(err?.response?.data || "Invalid OTP");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Verify Email 🔐</h2>

        <p style={{ fontSize: "14px", opacity: 0.7 }}>
          OTP sent to: {email}
        </p>

        {/* ✅ FIX: force black text for OTP input only */}
        <div className="auth-input">
          <form onSubmit={handleVerify}>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button text="Verify" type="submit" />
          </form>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmail;