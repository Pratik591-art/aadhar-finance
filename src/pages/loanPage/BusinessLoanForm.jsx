import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle,
  Clock,
  Home,
  CreditCard,
} from "lucide-react";
import { submitBusinessLoanApplication } from "../../actions/UseBusinessActions";

export default function BusinessLoanForm() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    panNumber: "",
    aadharNumber: "",
    gender: "",
    completeAddress: "",
    addressType: "",
    state: "",
    city: "",
    pincode: "",
    otp: "",
    gstNumber: "",
    shopPhoto: null,
    lastSixMonthBill: null,
    gstDocument: null,
    shopStockPhoto: null,
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    selfie: null,
    bankAccountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({});
  const [approvedAmount] = useState("5,00,000");
  const [applicationId, setApplicationId] = useState(null); // Or some default value
  const validatePage1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile Number is required";
    if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Mobile Number must be 10 digits";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.panNumber.trim())
      newErrors.panNumber = "PAN Number is required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber))
      newErrors.panNumber = "Invalid PAN format";
    if (!formData.aadharNumber.trim())
      newErrors.aadharNumber = "Aadhar Number is required";
    if (!/^\d{12}$/.test(formData.aadharNumber))
      newErrors.aadharNumber = "Aadhar Number must be 12 digits";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.completeAddress.trim())
      newErrors.completeAddress = "Complete Address is required";
    if (!formData.addressType)
      newErrors.addressType = "Address Type is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.otp.trim()) newErrors.otp = "OTP is required";
    if (!/^\d{6}$/.test(formData.otp)) newErrors.otp = "OTP must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage2 = () => {
    const newErrors = {};
    if (!formData.gstNumber.trim())
      newErrors.gstNumber = "GST Number is required";
    if (!/^\d{15}$/.test(formData.gstNumber))
      newErrors.gstNumber = "GST Number must be 15 digits";
    if (!formData.shopPhoto) newErrors.shopPhoto = "Shop Photo is required";
    if (!formData.lastSixMonthBill)
      newErrors.lastSixMonthBill = "Last 6 Months Bills are required";
    if (!formData.gstDocument)
      newErrors.gstDocument = "GST Document is required";
    if (!formData.shopStockPhoto)
      newErrors.shopStockPhoto = "Shop Stock Photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage4 = () => {
    const newErrors = {};
    if (!formData.aadharFront)
      newErrors.aadharFront = "Aadhar Front is required";
    if (!formData.aadharBack) newErrors.aadharBack = "Aadhar Back is required";
    if (!formData.panCard) newErrors.panCard = "PAN Card is required";
    if (!formData.selfie) newErrors.selfie = "Selfie is required";
    if (!formData.bankAccountNumber.trim())
      newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!formData.confirmAccountNumber.trim())
      newErrors.confirmAccountNumber = "Confirm Account Number is required";
    if (formData.bankAccountNumber !== formData.confirmAccountNumber)
      newErrors.confirmAccountNumber = "Account numbers do not match";
    if (!formData.ifscCode.trim()) newErrors.ifscCode = "IFSC Code is required";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
      newErrors.ifscCode = "Invalid IFSC Code format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      if (errors[fieldName])
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviews((prev) => ({ ...prev, [fieldName]: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (page === 1 && validatePage1()) {
      setLoading(true);
      setLoadingText("Verifying CIBIL Score...");
      setTimeout(() => {
        setLoading(false);
        setPage(2);
        setErrors({});
      }, 60000); // 1 minute
    } else if (page === 2 && validatePage2()) {
      setLoading(true);
      setLoadingText("Processing Documents...");
      setTimeout(() => {
        setLoading(false);
        setPage(3);
        setErrors({});
      }, 120000); // 2 minutes
    } else if (page === 3) {
      setPage(4);
      setErrors({});
    } else if (page === 4 && validatePage4()) {
      // --- START OF CORRECTIONS ---

      // 1. Use setLoading(true) to show the modal
      setLoading(true);
      setLoadingText("Submitting Application to Firebase...");

      try {
        const result = await submitBusinessLoanApplication(formData);

        if (result.success) {
          console.log("✅ Application submitted successfully!");

          // 2. Now this will work
          setApplicationId(result.docId);
          setPage(5);
          setErrors({});
        } else {
          console.error("❌ Submission failed:", result.error);
          setErrors({
            submit: "Failed to submit application. Please try again.",
          });
        }
      } catch (error) {
        console.error("❌ Submission error:", error);
        setErrors({ submit: "An error occurred. Please try again." });
      } finally {
        // 3. Use setLoading(false) to hide the modal
        setLoading(false);
      }
      // --- END OF CORRECTIONS ---
    }
  };

  const handlePrevious = () => {
    if (page > 1 && page !== 5) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
            <Clock
              size={64}
              className="text-blue-600 mx-auto mb-4 animate-spin"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {loadingText}
            </h3>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 text-white rounded-lg p-2 font-bold text-xl">
              AF
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Business Loan Application
            </h1>
          </div>
          {page <= 4 && (
            <>
              <p className="text-gray-600">Step {page} of 4</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(page / 4) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>

        {/* Page 1: Personal Information */}
        {page === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.mobileNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.dateOfBirth
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.panNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="e.g., ABCDE1234F"
                  maxLength="10"
                />
                {errors.panNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.panNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhar Card Number *
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.aadharNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                />
                {errors.aadharNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.aadharNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.gender
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.gender}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="completeAddress"
                  value={formData.completeAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-none ${
                    errors.completeAddress
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter your complete address"
                  rows="3"
                />
                {errors.completeAddress && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.completeAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Type *
                </label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.addressType
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                >
                  <option value="">Select Address Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="rented">Rented</option>
                  <option value="owned">Owned</option>
                </select>
                {errors.addressType && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.addressType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.state
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter your state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.state}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.city
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.pincode
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="6-digit pincode"
                  maxLength="6"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.pincode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.otp
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.otp}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  OTP sent to your mobile number
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Loan Approval + Business Documents */}
        {page === 2 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="text-center">
                <CheckCircle size={80} className="mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-2">Congratulations!</h2>
                <p className="text-xl mb-6 opacity-90">
                  Your loan has been pre-approved
                </p>
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur">
                  <p className="text-sm opacity-90 mb-2">
                    Approved Loan Amount
                  </p>
                  <div className="text-5xl font-bold">₹{approvedAmount}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Business Information
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Full Name</p>
                    <p className="font-semibold">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Mobile Number</p>
                    <p className="font-semibold">{formData.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Aadhar Number</p>
                    <p className="font-semibold">
                      XXXX XXXX {formData.aadharNumber.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">PAN Number</p>
                    <p className="font-semibold">{formData.panNumber}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GST Number *
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.gstNumber
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="15-digit GST number"
                    maxLength="15"
                  />
                  {errors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.gstNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Shop Photo *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      errors.shopPhoto
                        ? "border-red-500 bg-red-50"
                        : "border-blue-300 hover:border-blue-600 bg-blue-50"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "shopPhoto")}
                      className="hidden"
                      id="shopPhoto"
                      accept="image/*"
                    />
                    <label
                      htmlFor="shopPhoto"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={24} className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {formData.shopPhoto
                          ? formData.shopPhoto.name
                          : "Click to upload Shop Photo"}
                      </span>
                    </label>
                  </div>
                  {previews.shopPhoto && (
                    <img
                      src={previews.shopPhoto}
                      alt="Shop"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  {errors.shopPhoto && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.shopPhoto}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Last 6 Months Business Billing *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      errors.lastSixMonthBill
                        ? "border-red-500 bg-red-50"
                        : "border-blue-300 hover:border-blue-600 bg-blue-50"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "lastSixMonthBill")}
                      className="hidden"
                      id="lastSixMonthBill"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="lastSixMonthBill"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={24} className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {formData.lastSixMonthBill
                          ? formData.lastSixMonthBill.name
                          : "Click to upload Bills (PDF/DOC)"}
                      </span>
                    </label>
                  </div>
                  {errors.lastSixMonthBill && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.lastSixMonthBill}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload GST PDF *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      errors.gstDocument
                        ? "border-red-500 bg-red-50"
                        : "border-blue-300 hover:border-blue-600 bg-blue-50"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "gstDocument")}
                      className="hidden"
                      id="gstDocument"
                      accept=".pdf"
                    />
                    <label
                      htmlFor="gstDocument"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={24} className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {formData.gstDocument
                          ? formData.gstDocument.name
                          : "Click to upload GST Document (PDF)"}
                      </span>
                    </label>
                  </div>
                  {errors.gstDocument && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.gstDocument}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Shop Photo with Stock *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      errors.shopStockPhoto
                        ? "border-red-500 bg-red-50"
                        : "border-blue-300 hover:border-blue-600 bg-blue-50"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "shopStockPhoto")}
                      className="hidden"
                      id="shopStockPhoto"
                      accept="image/*"
                    />
                    <label
                      htmlFor="shopStockPhoto"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={24} className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {formData.shopStockPhoto
                          ? formData.shopStockPhoto.name
                          : "Click to upload Shop Stock Photo"}
                      </span>
                    </label>
                  </div>
                  {previews.shopStockPhoto && (
                    <img
                      src={previews.shopStockPhoto}
                      alt="Stock"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  {errors.shopStockPhoto && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.shopStockPhoto}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page 3: Application Confirmation */}
        {page === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Application Confirmation
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
              <CheckCircle size={64} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Documents Submitted Successfully
              </h3>
              <p className="text-gray-600 mb-6">
                Your business information and documents have been received.
                Please proceed to verify your identity in the next step.
              </p>
              <div className="bg-white rounded-lg p-4 text-left space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Name:</span>{" "}
                  {formData.fullName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {formData.mobileNumber}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Aadhar:</span> XXXX XXXX{" "}
                  {formData.aadharNumber.slice(-4)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">GST Number:</span>{" "}
                  {formData.gstNumber}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Approved Amount:</span> ₹
                  {approvedAmount}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page 4: Identity Verification */}
        {page === 4 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Identity Verification
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Aadhar Photo (Front) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    errors.aadharFront
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "aadharFront")}
                    className="hidden"
                    id="aadharFront"
                    accept="image/*"
                  />
                  <label
                    htmlFor="aadharFront"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.aadharFront
                        ? formData.aadharFront.name
                        : "Click to upload Aadhar Front"}
                    </span>
                  </label>
                </div>
                {previews.aadharFront && (
                  <img
                    src={previews.aadharFront}
                    alt="Aadhar Front"
                    className="mt-2 w-48 h-32 object-cover rounded-lg"
                  />
                )}
                {errors.aadharFront && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.aadharFront}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Aadhar Photo (Back) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    errors.aadharBack
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "aadharBack")}
                    className="hidden"
                    id="aadharBack"
                    accept="image/*"
                  />
                  <label
                    htmlFor="aadharBack"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.aadharBack
                        ? formData.aadharBack.name
                        : "Click to upload Aadhar Back"}
                    </span>
                  </label>
                </div>
                {previews.aadharBack && (
                  <img
                    src={previews.aadharBack}
                    alt="Aadhar Back"
                    className="mt-2 w-48 h-32 object-cover rounded-lg"
                  />
                )}
                {errors.aadharBack && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.aadharBack}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload PAN Photo *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    errors.panCard
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "panCard")}
                    className="hidden"
                    id="panCard"
                    accept="image/*"
                  />
                  <label
                    htmlFor="panCard"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.panCard
                        ? formData.panCard.name
                        : "Click to upload PAN Card"}
                    </span>
                  </label>
                </div>
                {previews.panCard && (
                  <img
                    src={previews.panCard}
                    alt="PAN Card"
                    className="mt-2 w-48 h-32 object-cover rounded-lg"
                  />
                )}
                {errors.panCard && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.panCard}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Selfie Photo *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    errors.selfie
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFileUpload(e, "selfie")}
                    className="hidden"
                    id="selfie"
                  />
                  <label
                    htmlFor="selfie"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Camera size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      Tap to take Selfie
                    </span>
                  </label>
                </div>
                {previews.selfie && (
                  <img
                    src={previews.selfie}
                    alt="Selfie"
                    className="mt-2 w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                )}
                {errors.selfie && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.selfie}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Account Number *
                </label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.bankAccountNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter your bank account number"
                />
                {errors.bankAccountNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.bankAccountNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Account Number *
                </label>
                <input
                  type="text"
                  name="confirmAccountNumber"
                  value={formData.confirmAccountNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.confirmAccountNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Re-enter your bank account number"
                />
                {errors.confirmAccountNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.confirmAccountNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.ifscCode
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="e.g., SBIN0001234"
                  maxLength="11"
                />
                {errors.ifscCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.ifscCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Page 5: Final Review Status */}
        {page === 5 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white mb-8">
              <CheckCircle size={80} className="mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Application Submitted!
              </h2>
              <p className="text-lg mb-8 opacity-90">
                All documents completed and under review
              </p>

              <div className="bg-white bg-opacity-20 rounded-xl p-8 mb-8 backdrop-blur">
                <div className="text-5xl font-bold mb-2">4-5 Days</div>
                <p className="text-lg opacity-90">Standard Review Time</p>
              </div>

              <div className="space-y-3 text-left mb-8">
                <p className="text-sm opacity-90">
                  ✓ Personal details verified
                </p>
                <p className="text-sm opacity-90">
                  ✓ Business documents received
                </p>
                <p className="text-sm opacity-90">✓ Identity confirmed</p>
                <p className="text-sm opacity-90">✓ Bank details validated</p>
                <p className="text-sm opacity-90">✓ GST details verified</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <Home size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Premium Fast-Track Service
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get your loan verified and credited within 24 hours!
                  </p>

                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4 backdrop-blur">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} /> All documents verified in 24
                        hours
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} /> Amount credited to bank in 24
                        hours
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} /> Bank employee home
                        verification
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} /> Priority application
                        processing
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-lg p-4 text-gray-800">
                    <div>
                      <p className="text-sm text-gray-600">
                        One-time service charge
                      </p>
                      <p className="text-3xl font-bold text-green-600">₹999</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                      <CreditCard size={20} />
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Application Reference ID:</span>{" "}
                BL-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Approved Amount:</span> ₹
                {approvedAmount}
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                We'll notify you via SMS and Email once the review is complete.
              </p>
              <p className="mt-2">
                For queries, contact our helpline:{" "}
                <span className="font-semibold text-blue-600">
                  1800-XXX-XXXX
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {page < 5 && (
          <div className="flex gap-4 justify-between mt-8">
            <button
              onClick={handlePrevious}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              disabled={page === 1}
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {page === 4 ? "Submit Application" : "Next"}{" "}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
