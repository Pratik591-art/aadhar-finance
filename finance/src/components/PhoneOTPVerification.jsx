import React, { useState } from "react";
import { FaPhoneAlt, FaLock, FaCheckCircle } from "react-icons/fa";
import { auth } from "../utils/firebase-config"; // 🔹 Make sure to import your Firebase config here
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const PhoneOTPVerification = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Initialize reCAPTCHA
  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
        }
      );
    }
  };

  // 🔹 Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setUpRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const fullPhoneNumber = "+91" + phone; // 🇮🇳 change as needed

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      if (result.user) {
        setIsVerified(true);
        alert("Phone number verified successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Phone OTP Verification
        </h2>

        {!isVerified ? (
          <form className="space-y-5">
            {/* Phone Input */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <FaPhoneAlt /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isOtpSent || loading}
                required
              />
            </div>

            {/* Send OTP Button */}
            {!isOtpSent && (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            )}

            {/* OTP Input */}
            {isOtpSent && (
              <>
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <FaLock /> Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </form>
        ) : (
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Verification Successful!
            </h3>
            <p className="text-gray-500 text-sm">
              Your phone number has been verified.
            </p>
          </div>
        )}
      </div>

      {/* 🔹 Required for Firebase reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOTPVerification;
