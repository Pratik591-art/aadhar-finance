import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
            size: "normal",
            callback: () => console.log("reCAPTCHA verified"),
          });
        } catch (err) {
          console.error("Error initializing reCAPTCHA:", err);
          setError("Failed to initialize reCAPTCHA. Please refresh the page.");
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [step, isAuthenticated, setupRecaptcha]);

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
    if (value.length <= 13) {
      setPhoneNumber(value);
    }
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (phoneNumber.length !== 13) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      await requestOTP(phoneNumber);
      setStep(2);
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError(err.message || "Failed to send OTP. Please try again.");
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
      if (otpCode.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP");
      }

      await confirmOTP(otpCode);
      // AuthContext will handle navigation after successful login
      navigate("/");
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError(err.message || "Invalid OTP. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 sm:p-10 border border-gray-100">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <span className="text-2xl font-bold text-white">AF</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Aadhar Finance</h2>
            <p className="text-sm text-gray-500 mt-1">Secure & Fast Loans</p>
          </div>

          {/* Progress Indicator */}
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

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
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
                  <button
                    onClick={handleBackToPhone}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
                    disabled={loading}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                  </button>

                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Verify OTP
                  </h1>
                  <p className="text-gray-500">
                    Enter the 6-digit code sent to{" "}
                    <button
                      onClick={handleBackToPhone}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                      disabled={loading}
                    >
                      {phoneNumber}
                    </button>
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="otpCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      OTP Code
                    </label>
                    <input
                      type="text"
                      id="otpCode"
                      value={otpCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 6) {
                          setOtpCode(value);
                        }
                      }}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xl text-center tracking-[0.5em] font-semibold"
                      maxLength={6}
                      required
                      disabled={loading}
                      autoFocus
                    />
                    <p className="text-xs text-gray-400 text-center">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                        disabled={loading}
                      >
                        Resend
                      </button>
                    </p>
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

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
