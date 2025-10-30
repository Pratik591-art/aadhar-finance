import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Calendar,
  MapPin,
  CreditCard,
  FileText,
  Clock,
  Zap,
} from "lucide-react";
import { submitLoanApplication } from "../../actions/UseLoanActions";

export default function personalLoan() {
  const [page, setPage] = useState(1);
  const [showFastTrack, setShowFastTrack] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Page 1 - Loan Details
    loanAmount: "",
    monthlySalary: "",
    loanPurpose: "",

    // Page 2 - Personal Details
    fullName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    completeAddress: "",
    state: "",
    city: "",
    pincode: "",
    aadharNumber: "",
    panNumber: "",
    bankAccountNumber: "",
    confirmBankAccountNumber: "",
    ifscCode: "",

    // Page 3 - Documents
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({});

  // Validation functions
  const validatePage1 = () => {
    const newErrors = {};
    if (!formData.loanAmount || formData.loanAmount <= 0) {
      newErrors.loanAmount = "Please enter a valid loan amount";
    }
    if (!formData.monthlySalary || formData.monthlySalary <= 0) {
      newErrors.monthlySalary = "Please enter a valid monthly salary";
    }
    if (!formData.loanPurpose.trim()) {
      newErrors.loanPurpose = "Please specify the purpose of loan";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage2 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.completeAddress.trim())
      newErrors.completeAddress = "Address is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.aadharNumber.trim())
      newErrors.aadharNumber = "Aadhar number is required";
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }
    if (!formData.panNumber.trim())
      newErrors.panNumber = "PAN number is required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    }
    if (!formData.bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = "Bank account number is required";
    }
    if (!formData.confirmBankAccountNumber.trim()) {
      newErrors.confirmBankAccountNumber = "Please confirm bank account number";
    }
    if (formData.bankAccountNumber !== formData.confirmBankAccountNumber) {
      newErrors.confirmBankAccountNumber = "Account numbers do not match";
    }
    if (!formData.ifscCode.trim()) newErrors.ifscCode = "IFSC code is required";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage3 = () => {
    const newErrors = {};

    if (!formData.aadharFront)
      newErrors.aadharFront = "Aadhar front is required";
    if (!formData.aadharBack) newErrors.aadharBack = "Aadhar back is required";
    if (!formData.panFront) newErrors.panFront = "PAN front is required";
    if (!formData.panBack) newErrors.panBack = "PAN back is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const result = await submitLoanApplication(formData);
    if (result.success) {
      alert("✅ Loan application submitted successfully!");
      setPage(4);
    } else {
      alert("❌ Submission failed. Please try again.");
      console.error(result.error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle file upload
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "File size must be less than 2MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, [fieldName]: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviews((prev) => ({ ...prev, [fieldName]: event.target.result }));
      };
      reader.readAsDataURL(file);

      if (errors[fieldName])
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (page === 1 && validatePage1()) {
      setPage(2);
      setErrors({});
    } else if (page === 2 && validatePage2()) {
      setPage(3);
      setErrors({});
    } else if (page === 3 && validatePage3()) {
      setPage(4);
      setErrors({});
    } else if (page === 4) {
      setPage(5);
      setErrors({});
    } else if (page === 5 && showFastTrack) {
      setPage(6);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 shadow-lg">
              <IndianRupee size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Loan Application
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Step {page} of {showFastTrack ? 6 : 5}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(page / (showFastTrack ? 6 : 5)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Page 1: Loan Details */}
        {page === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <IndianRupee className="text-blue-600" size={32} />
              Loan Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount *
                </label>
                <div className="relative">
                  <IndianRupee
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition text-lg ${
                      errors.loanAmount
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="Enter loan amount"
                  />
                </div>
                {errors.loanAmount && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.loanAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Salary *
                </label>
                <div className="relative">
                  <IndianRupee
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="monthlySalary"
                    value={formData.monthlySalary}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition text-lg ${
                      errors.monthlySalary
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="Enter monthly salary"
                  />
                </div>
                {errors.monthlySalary && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.monthlySalary}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Purpose of Loan *
                </label>
                <textarea
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition resize-none text-lg ${
                    errors.loanPurpose
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Describe the purpose of this loan"
                  rows="4"
                />
                {errors.loanPurpose && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.loanPurpose}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Personal Details */}
        {page === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FileText className="text-blue-600" size={32} />
              Personal Details
            </h2>
            <p className="text-gray-600 mb-6">
              Enter details as per Aadhar card
            </p>

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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter full name as per Aadhar"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="your@email.com"
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
                    Select Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="completeAddress"
                  value={formData.completeAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition resize-none ${
                    errors.completeAddress
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter complete address"
                  rows="3"
                />
                {errors.completeAddress && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.completeAddress}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.state
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="State"
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.city
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-600"
                    }`}
                    placeholder="City"
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhar Number *
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition uppercase ${
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.bankAccountNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Enter bank account number"
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
                  Confirm Bank Account Number *
                </label>
                <input
                  type="text"
                  name="confirmBankAccountNumber"
                  value={formData.confirmBankAccountNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.confirmBankAccountNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-600"
                  }`}
                  placeholder="Re-enter bank account number"
                />
                {errors.confirmBankAccountNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.confirmBankAccountNumber}
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition uppercase ${
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

        {/* Page 3: Documents Upload */}
        {page === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Upload className="text-blue-600" size={32} />
              Personal Documents
            </h2>
            <p className="text-gray-600 mb-6">
              All documents must be less than 2 MB
            </p>

            <div className="space-y-6">
              {/* Aadhar Front */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Aadhar Card (Front) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    errors.aadharFront
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "aadharFront")}
                    className="hidden"
                    id="aadharFront"
                  />
                  <label
                    htmlFor="aadharFront"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.aadharFront
                        ? formData.aadharFront.name
                        : "Click to upload Aadhar Front"}
                    </span>
                    {formData.aadharFront && (
                      <span className="text-xs text-gray-500">
                        ({(formData.aadharFront.size / 1024).toFixed(2)} KB)
                      </span>
                    )}
                  </label>
                </div>
                {previews.aadharFront && (
                  <img
                    src={previews.aadharFront}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                  />
                )}
                {errors.aadharFront && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.aadharFront}
                  </p>
                )}
              </div>

              {/* Aadhar Back */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Aadhar Card (Back) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    errors.aadharBack
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "aadharBack")}
                    className="hidden"
                    id="aadharBack"
                  />
                  <label
                    htmlFor="aadharBack"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.aadharBack
                        ? formData.aadharBack.name
                        : "Click to upload Aadhar Back"}
                    </span>
                    {formData.aadharBack && (
                      <span className="text-xs text-gray-500">
                        ({(formData.aadharBack.size / 1024).toFixed(2)} KB)
                      </span>
                    )}
                  </label>
                </div>
                {previews.aadharBack && (
                  <img
                    src={previews.aadharBack}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                  />
                )}
                {errors.aadharBack && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.aadharBack}
                  </p>
                )}
              </div>

              {/* PAN Front */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload PAN Card (Front) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    errors.panFront
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "panFront")}
                    className="hidden"
                    id="panFront"
                  />
                  <label
                    htmlFor="panFront"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.panFront
                        ? formData.panFront.name
                        : "Click to upload PAN Front"}
                    </span>
                    {formData.panFront && (
                      <span className="text-xs text-gray-500">
                        ({(formData.panFront.size / 1024).toFixed(2)} KB)
                      </span>
                    )}
                  </label>
                </div>
                {previews.panFront && (
                  <img
                    src={previews.panFront}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                  />
                )}
                {errors.panFront && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.panFront}
                  </p>
                )}
              </div>

              {/* PAN Back */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload PAN Card (Back) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    errors.panBack
                      ? "border-red-500 bg-red-50"
                      : "border-blue-300 hover:border-blue-600 bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "panBack")}
                    className="hidden"
                    id="panBack"
                  />
                  <label
                    htmlFor="panBack"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {formData.panBack
                        ? formData.panBack.name
                        : "Click to upload PAN Back"}
                    </span>
                    {formData.panBack && (
                      <span className="text-xs text-gray-500">
                        ({(formData.panBack.size / 1024).toFixed(2)} KB)
                      </span>
                    )}
                  </label>
                </div>
                {previews.panBack && (
                  <img
                    src={previews.panBack}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                  />
                )}
                {errors.panBack && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.panBack}
                  </p>
                )}

                <button
                  onClick={() => {
                    if (validatePage3()) handleSubmit();
                  }}
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-4 rounded-xl font-bold transition ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page 4: Application Success */}
        {page === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={64} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Successfully Applied for Loan!
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-6">
                <p className="text-lg mb-2 opacity-90">Loan Amount</p>
                <p className="text-5xl font-bold">
                  {formatCurrency(formData.loanAmount)}
                </p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-left space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg mb-3">
                  Application Summary
                </h3>
                <p className="text-sm">
                  <span className="font-semibold">Name:</span>{" "}
                  {formData.fullName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {formData.mobileNumber}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {formData.email}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Loan Purpose:</span>{" "}
                  {formData.loanPurpose}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page 5: Under Review / Fast Track Option */}
        {page === 5 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Clock size={64} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                All Documents Completed
              </h2>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Under Review
                </h3>
                <p className="text-gray-700 text-lg font-medium mb-2">
                  Standard Processing Time
                </p>
                <p className="text-4xl font-bold text-yellow-600 mb-2">
                  4-5 Days
                </p>
                <p className="text-sm text-gray-600">
                  Your application is in queue for verification
                </p>
              </div>

              <div className="space-y-3 text-left mb-8">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle
                    className="text-green-600 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Documents Submitted
                    </p>
                    <p className="text-sm text-gray-600">
                      All required documents received
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <Clock
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Verification Pending
                    </p>
                    <p className="text-sm text-gray-600">
                      Will be processed in 4-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Track Option */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={40} className="text-yellow-300" />
                <h3 className="text-2xl font-bold">Fast Track Service</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-200 flex-shrink-0"
                  />
                  <p className="text-lg">All documents verified in 24 hours</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-200 flex-shrink-0"
                  />
                  <p className="text-lg">Amount credited within 24 hours</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-200 flex-shrink-0"
                  />
                  <p className="text-lg">Bank employee home verification</p>
                </div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur mb-6">
                <p className="text-lg mb-2 opacity-90">One-time Service Fee</p>
                <p className="text-5xl font-bold">₹999</p>
              </div>

              <button
                onClick={() => setShowFastTrack(true)}
                className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
              >
                Get Instant Approval - Pay ₹999
              </button>

              <p className="text-center text-sm mt-4 opacity-90">
                Skip the wait and get your loan approved today!
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleNext}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium underline"
              >
                Continue with standard processing (4-5 days)
              </button>
            </div>
          </div>
        )}

        {/* Page 6: Payment & Final Confirmation */}
        {page === 6 && showFastTrack && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Zap size={64} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Fast Track Activated!
              </h2>

              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 mb-6">
                <CheckCircle
                  size={48}
                  className="text-green-600 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Payment Successful
                </h3>
                <p className="text-gray-700 mb-4">Service Fee: ₹999 paid</p>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="font-mono font-bold text-lg">
                    {Math.random().toString(36).substr(2, 12).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-4">Your loan of</h3>
                <p className="text-5xl font-bold mb-4">
                  {formatCurrency(formData.loanAmount)}
                </p>
                <p className="text-lg opacity-90">will be credited within</p>
                <p className="text-3xl font-bold mt-2">24 Hours</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                  <CheckCircle
                    className="text-green-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Priority Verification
                    </p>
                    <p className="text-sm text-gray-600">
                      Your documents are being fast-tracked
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <Clock
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Home Verification Scheduled
                    </p>
                    <p className="text-sm text-gray-600">
                      Bank employee will visit within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <IndianRupee
                    className="text-purple-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Amount Ready</p>
                    <p className="text-sm text-gray-600">
                      Will be credited to account: XXXX
                      {formData.bankAccountNumber.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded text-left">
                <p className="font-semibold text-gray-800 mb-2">
                  Important Information:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• You will receive a confirmation call within 2 hours</li>
                  <li>• Keep your original documents ready for verification</li>
                  <li>
                    • SMS and email updates will be sent to your registered
                    contacts
                  </li>
                  <li>• Customer support: 1800-XXX-XXXX (24/7)</li>
                </ul>
              </div>

              <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">Application ID:</span> LA-
                  {Math.random().toString(36).substr(2, 10).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {page < 4 && (
          <div className="flex gap-4 justify-between mt-8">
            <button
              onClick={handlePrevious}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition shadow-lg ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300"
              }`}
              disabled={page === 1}
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}

        {page === 4 && (
          <div className="mt-8">
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              Continue <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
