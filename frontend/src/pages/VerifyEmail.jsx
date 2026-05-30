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
  const [popupMessage, setPopupMessage] =
  useState("");
  const email = location.state?.email;

  if (!email) {
    nav("/signup");
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();

  if (!otp) {

  setShowPopup(true);

  setPopupAction("");

  return;
}

    try {
      await verifyEmailOtp({ email, otp });

setPopupMessage(
  "Email Verified 🎉"
);

setPopupAction("");

setShowPopup(true);

    }catch (err) {

  console.log(err);

  setShowPopup(true);

  setPopupAction("");

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
  {popupMessage}
</h2>

      <p>

  {popupMessage ===
  "Email Verified 🎉"

    ? "Do you want to continue to Login?"

    : "Please check and try again."}

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