import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { verifyEmailOtp } from "../api/api";
import { FaTimes } from "react-icons/fa";

function VerifyEmail() {
  const nav = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [showPopup, setShowPopup] =
  useState(false);

const [popupAction, setPopupAction] =
  useState("");
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

     setShowPopup(true);
setPopupAction("");

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
      {/* ================= EMAIL VERIFIED POPUP ================= */}
{showPopup && (

  <div
    className="popup-backdrop"
    onClick={() => {

      setShowPopup(false);

      // ================= YES ACTION =================
      if (popupAction === "yes") {

        nav("/login");

      }

    }}
  >

    <div
      className="success-popup"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      {/* CLOSE ICON */}
      <div
        className="popup-close"
        onClick={() => {

          setShowPopup(false);

          // ================= YES ACTION =================
          if (popupAction === "yes") {

            nav("/login");

          }

        }}
      >
        <FaTimes />
      </div>

      <h2>
        Email Verified 🎉
      </h2>

      <p>
        Do you want to continue
        to Login?
      </p>

      <div className="popup-buttons">

        {/* YES BUTTON */}
        <button
          className="yes-btn"
          onClick={() =>
            setPopupAction("yes")
          }
        >
          Yes
        </button>

        {/* NO BUTTON */}
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

export default VerifyEmail;