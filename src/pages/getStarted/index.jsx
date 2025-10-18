import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveUserDetails, checkPhoneNumberExists } from "../../firebase";
import { indianStates, citiesByState } from "../../data/indianLocations";

/**
 * Multi-step Login Flow
 * Step 1: Phone Authentication (India only)
 * Step 2: User Details Form
 * Step 3: Confirmation Message
 */
const GetStarted = () => {
  const { user, setupRecaptcha, requestOTP, confirmOTP, isAuthenticated } =
    useAuth();

  const navigate = useNavigate();

  // Form states
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: User Details, 4: Confirmation
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  // React Hook Form for Step 3 (User Details)
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      occupation: "",
      aadharNumber: "",
      panNumber: "",
    },
  });

  // Watch state field to filter cities
  const selectedState = watch("state");
  const availableCities = selectedState && citiesByState[selectedState] ? citiesByState[selectedState] : [];

  // Reset city when state changes
  useEffect(() => {
    if (selectedState && step === 3) {
      setValue("city", "");
    }
  }, [selectedState, setValue, step]);

  // Initialize reCAPTCHA for step 1
  useEffect(() => {
    if (!isAuthenticated && step === 1) {
      const timer = setTimeout(() => {
        try {
          setupRecaptcha("recaptcha-container", {
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
  }, [step, isAuthenticated]);

  // If already authenticated, move to user details step
  useEffect(() => {
    if (isAuthenticated && step < 3) {
      setStep(3);
    }
  }, [isAuthenticated]);

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

      // Check if phone number is already registered
      const phoneExists = await checkPhoneNumberExists(phoneNumber);
      if (phoneExists) {
        setError("Your phone number is already registered. Please login instead.");
        setLoading(false);
        return;
      }

      await requestOTP(phoneNumber);
      setStep(2);
      console.log("OTP sent successfully");
    } catch (err) {
      const errorMessage = err.message || "Failed to send OTP";
      // if ()
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
      console.log("User authenticated successfully");
      setStep(3); // Move to user details
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Submit user details using React Hook Form
  const onSubmitUserDetails = async (data) => {
    setError("");
    setLoading(true);

    try {
      // Prepare user details with phone number
      const userDetailsWithPhone = {
        ...data,
        phoneNumber: phoneNumber,
        uid: user?.uid,
        createdAt: new Date().toISOString(),
      };

      // Save user details to Firestore
      if (user?.uid) {
        await saveUserDetails(user.uid, userDetailsWithPhone);
        console.log("User details saved successfully", userDetailsWithPhone);
      }

      // Always set submitted data for display
      setSubmittedData(userDetailsWithPhone);

      // Move to confirmation step
      setStep(4);
    } catch (err) {
      setError(err.message || "Failed to save details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Restart the process
  const handleRestart = () => {
    setStep(1);
    setPhoneNumber("+91");
    setOtpCode("");
    setSubmittedData(null);
    setError("");
  };

  // Render different steps
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-md">
        {/* Minimalist Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  step >= num ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">Step {step} of 4</p>
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
                  Welcome
                </h1>
                <p className="text-gray-500">
                  Enter your mobile number to continue
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
                  id="recaptcha-container"
                  className="flex justify-center my-6"
                ></div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length !== 13}
                  className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-all duration-200 active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                    "Continue"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                  >
                    Login
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
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    type="button"
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
                    onClick={() => setStep(1)}
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
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                    "Verify"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: User Details */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  About You
                </h1>
                <p className="text-gray-500">Tell us a bit about yourself</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitUserDetails)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border ${
                      formErrors.fullName ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                    autoFocus
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-red-600">
                      {formErrors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 border ${
                      formErrors.email ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-600">
                      {formErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                        validate: (value) => {
                          const today = new Date();
                          const birthDate = new Date(value);
                          const age =
                            today.getFullYear() - birthDate.getFullYear();
                          return (
                            age >= 18 || "You must be at least 18 years old"
                          );
                        },
                      })}
                      className={`w-full px-4 py-3 border ${
                        formErrors.dateOfBirth
                          ? "border-red-300"
                          : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      disabled={loading}
                    />
                    {formErrors.dateOfBirth && (
                      <p className="text-xs text-red-600">
                        {formErrors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className={`w-full px-4 py-3 border ${
                        formErrors.gender ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white`}
                      disabled={loading}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.gender && (
                      <p className="text-xs text-red-600">
                        {formErrors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Optional Fields Divider */}
                <div className="pt-2 pb-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Address Information
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className={`w-full px-4 py-3 border ${
                      formErrors.address ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                  />
                  {formErrors.address && (
                    <p className="text-xs text-red-600">
                      {formErrors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <select
                      id="state"
                      {...register("state", {
                        required: "State is required",
                      })}
                      className={`w-full px-4 py-3 border ${
                        formErrors.state ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white`}
                      disabled={loading}
                    >
                      {indianStates.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.state && (
                      <p className="text-xs text-red-600">
                        {formErrors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      {...register("city", {
                        required: "City is required",
                      })}
                      className={`w-full px-4 py-3 border ${
                        formErrors.city ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white`}
                      disabled={loading || !selectedState}
                    >
                      <option value="">Select City</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && (
                      <p className="text-xs text-red-600">
                        {formErrors.city.message}
                      </p>
                    )}
                    {!selectedState && (
                      <p className="text-xs text-gray-400">
                        Please select a state first
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      {...register("pincode", {
                        required: "Pincode is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Pincode must be 6 digits",
                        },
                      })}
                      maxLength="6"
                      className={`w-full px-4 py-3 border ${
                        formErrors.pincode
                          ? "border-red-300"
                          : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      disabled={loading}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                      }}
                    />
                    {formErrors.pincode && (
                      <p className="text-xs text-red-600">
                        {formErrors.pincode.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="occupation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      {...register("occupation", {
                        required: "Occupation is required",
                      })}
                      className={`w-full px-4 py-3 border ${
                        formErrors.occupation ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      disabled={loading}
                    />
                    {formErrors.occupation && (
                      <p className="text-xs text-red-600">
                        {formErrors.occupation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ID Documents Section */}
                <div className="pt-2 pb-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    ID Documents (Optional)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="aadharNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Aadhar Number
                    </label>
                    <input
                      type="text"
                      id="aadharNumber"
                      {...register("aadharNumber", {
                        pattern: {
                          value: /^[0-9]{12}$/,
                          message: "Aadhar must be 12 digits",
                        },
                      })}
                      placeholder="XXXX XXXX XXXX"
                      maxLength="12"
                      className={`w-full px-4 py-3 border ${
                        formErrors.aadharNumber
                          ? "border-red-300"
                          : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      disabled={loading}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                      }}
                    />
                    {formErrors.aadharNumber && (
                      <p className="text-xs text-red-600">
                        {formErrors.aadharNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="panNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="panNumber"
                      {...register("panNumber", {
                        pattern: {
                          value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                          message: "Invalid PAN format (e.g., ABCDE1234F)",
                        },
                      })}
                      placeholder="ABCDE1234F"
                      maxLength="10"
                      className={`w-full px-4 py-3 border ${
                        formErrors.panNumber
                          ? "border-red-300"
                          : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase`}
                      disabled={loading}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .toUpperCase()
                          .slice(0, 10);
                      }}
                    />
                    {formErrors.panNumber && (
                      <p className="text-xs text-red-600">
                        {formErrors.panNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
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
                        Saving...
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8">
                {/* Success Icon with Animation */}
                <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-checkmark-scale">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="animate-checkmark-draw"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  You're All Set
                </h1>
                <p className="text-gray-500">Welcome to Aadhar Finance</p>
              </div>

              {/* Summary Card */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="font-medium text-gray-900">
                      {phoneNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">
                      {submittedData?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">Email</span>
                    <span className="font-medium text-gray-900 truncate ml-2">
                      {submittedData?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl hover:bg-blue-700 font-medium transition-all duration-200 active:scale-[0.98]"
                >
                  Go to Home
                </button>

                <button
                  onClick={handleRestart}
                  className="w-full text-gray-600 py-2 px-4 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 text-sm"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our{" "}
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Terms
            </span>{" "}
            &{" "}
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
