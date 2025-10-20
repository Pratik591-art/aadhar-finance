import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkPhoneNumberExists } from "../../firebase";
import SEO from "../../components/SEO";
import { seoConfigs } from "../../utils/seo";

/**
 * Login Page - Phone OTP Authentication
 * Step 1: Phone Number Entry
 * Step 2: OTP Verification
 */  
const Login = () => {
  const { user, setupRecaptcha, requestOTP, confirmOTP, isAuthenticated } =
    useAuth();
  const navigate = useNavigate();

  // Form states
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize reCAPTCHA for step 1
  useEffect(() => {
    if (!isAuthenticated && step === 1) {
      const timer = setTimeout(() => {
        try {
          setupRecaptcha("recaptcha-container-login", {
            size: "normal"
          });
        } catch (err) {
          console.error("Error initializing reCAPTCHA:", err);
          setError("Failed to initialize reCAPTCHA. Please refresh the page.");
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [step, isAuthenticated]);

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Handle phone number input (restrict to Indian format)
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Ensure it starts with +91
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/^\+91/, "");
    }

    // Remove any non-digit characters except the + at the start
    value = "+91" + value.slice(3).replace(/\D/g, "");

    // Limit to 10 digits after +91
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhoneNumber(value);
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate Indian phone number
      if (phoneNumber.length !== 13) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      
      // Check if phone number exists in the database
      let phoneExists = false;
      try {
        phoneExists = await checkPhoneNumberExists(phoneNumber);
      } catch (checkError) {
        console.error('Error checking phone number:', checkError);
        // If there's a Firestore permission error, allow login to proceed
        if (checkError.code === 'permission-denied') {
          console.warn('Permission denied - proceeding with login anyway');
          phoneExists = true; // Assume exists if we can't check
        } else {
          throw checkError;
        }
      }
      
      if (!phoneExists) {
        setError("Phone number not registered. Please sign up first.");
        setLoading(false);
        return;
      }

      await requestOTP(phoneNumber);
      setStep(2);
    } catch (err) {
      const errorMessage = err.message || "Failed to send OTP";
      setError(errorMessage);
      console.error("Error:", err);

      if (err.code === "auth/internal-error") {
        setError("reCAPTCHA error. Please refresh the page and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmOTP(otpCode);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Back to phone step
  const handleBackToPhone = () => {
    setStep(1);
    setOtpCode("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <SEO {...seoConfigs.login} />
      <div className="w-full max-w-md">
        {/* Minimalist Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {[1, 2].map((num) => (
              <div
                key={num}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  step >= num ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">Step {step} of 2</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            {/* Step 1: Phone Number */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-500">
                    Enter your mobile number to login
                  </p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                      required
                      disabled={loading}
                      autoFocus
                    />
                    <span className="flex justify-between">
                      <p className="text-xs text-gray-400">
                        We'll send you a verification code
                      </p>
                      {/* test mobile number */}
                      <p className="text-xs text-gray-400">
                        (For testing, use 8140212584)
                      </p>
                    </span>
                  </div>

                  {/* reCAPTCHA container */}
                  <div
                    id="recaptcha-container-login"
                    className="flex justify-center my-6"
                  ></div>

                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length !== 13}
                    className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-all duration-200 active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/get-started")}
                      className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={handleBackToPhone}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      type="button"
                      disabled={loading}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Enter Code
                    </h1>
                  </div>
                  <p className="text-gray-500">
                    Sent to{" "}
                    <span className="font-medium text-gray-900">
                      {phoneNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleBackToPhone}
                      disabled={loading}
                      className="ml-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      Change Number
                    </button>
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="otpCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="otpCode"
                      value={otpCode}
                      onChange={(e) =>
                        setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="••••••"
                      maxLength="6"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-[0.5em] font-medium transition-all"
                      required
                      disabled={loading}
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-all duration-200 active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify & Login"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Login;
