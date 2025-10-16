import React, { useState } from "react";
import { FaUser, FaPhone, FaIdCard, FaStore, FaFileInvoice, FaUpload, FaImage } from "react-icons/fa";

const BusinessLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    shopPic: null,
    last6MonthBill: null,
    aadhaarUpload: null,
    gstUpload: null,
    shopStockPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Business Loan Form Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Business Loan Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaPhone /> Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaIdCard /> Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              placeholder="Enter Aadhaar number"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* PAN Number */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaIdCard /> PAN Number
            </label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN number"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* File Uploads */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaStore /> Shop Photo
            </label>
            <input type="file" name="shopPic" onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaFileInvoice /> Last 6 Months Bill
            </label>
            <input type="file" name="last6MonthBill" onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUpload /> Aadhaar Upload (Front/Back)
            </label>
            <input type="file" name="aadhaarUpload" onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUpload /> GST Upload
            </label>
            <input type="file" name="gstUpload" onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaImage /> Shop Stock Photo
            </label>
            <input type="file" name="shopStockPhoto" onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Aadhaar verification via OTP & complete Video KYC required.
        </p>
      </div>
    </div>
  );
};

export default BusinessLoanForm;
