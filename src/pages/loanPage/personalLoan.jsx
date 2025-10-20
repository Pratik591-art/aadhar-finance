import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import { seoConfigs } from '../../utils/seo';

export default function personalLoan() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    aadharNumber: '',
    panNumber: '',
    companyId: null,
    form06: null,
    salarySleep: null,
    applicationStatus: '',
    aadharDetails: '',
    otpVerification: '',
    aadharCard: null,
    panCard: null,
    cameraPhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [phonePreview, setPhonePreview] = useState(null);

  const validatePage1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile Number must be 10 digits';
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar Number is required';
    if (!/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = 'Aadhar Number must be 12 digits';
    if (!formData.panNumber.trim()) newErrors.panNumber = 'PAN Number is required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) newErrors.panNumber = 'Invalid PAN format';
    if (!formData.companyId) newErrors.companyId = 'Company ID is required';
    if (!formData.form06) newErrors.form06 = 'Form 06 is required';
    if (!formData.salarySleep) newErrors.salarySleep = 'Salary Slip is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage3 = () => {
    const newErrors = {};
    if (!formData.aadharDetails.trim()) newErrors.aadharDetails = 'Aadhar Details are required';
    if (!formData.otpVerification.trim()) newErrors.otpVerification = 'OTP Verification is required';
    if (!/^\d{6}$/.test(formData.otpVerification)) newErrors.otpVerification = 'OTP must be 6 digits';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar Card upload is required';
    if (!formData.panCard) newErrors.panCard = 'PAN Card upload is required';
    if (!formData.cameraPhoto) newErrors.cameraPhoto = 'Camera photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      if (errors[fieldName]) setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhonePreview(event.target.result);
        setFormData(prev => ({ ...prev, cameraPhoto: file }));
        if (errors.cameraPhoto) setErrors(prev => ({ ...prev, cameraPhoto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (page === 1 && validatePage1()) {
      setPage(2);
      setErrors({});
    } else if (page === 2) {
      setPage(3);
      setErrors({});
    } else if (page === 3 && validatePage3()) {
      setPage(4);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <SEO {...seoConfigs.personalLoan} />
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 text-white rounded-lg p-2 font-bold text-xl">AF</div>
            <h1 className="text-3xl font-bold text-gray-800">Personal Loan Application</h1>
          </div>
          <p className="text-gray-600">Step {page} of 4</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(page / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Page 1: Personal Information */}
        {page === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.mobileNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                />
                {errors.aadharNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.aadharNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.panNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="e.g., ABCDE1234F"
                  maxLength="10"
                />
                {errors.panNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.panNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Company ID *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.companyId ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'companyId')}
                    className="hidden"
                    id="companyId"
                  />
                  <label htmlFor="companyId" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">{formData.companyId ? formData.companyId.name : 'Click to upload Company ID'}</span>
                  </label>
                </div>
                {errors.companyId && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.companyId}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Form 06 *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.form06 ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'form06')}
                    className="hidden"
                    id="form06"
                  />
                  <label htmlFor="form06" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">{formData.form06 ? formData.form06.name : 'Click to upload Form 06'}</span>
                  </label>
                </div>
                {errors.form06 && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.form06}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Last 3 Months Salary Slip *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.salarySleep ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'salarySleep')}
                    className="hidden"
                    id="salarySleep"
                  />
                  <label htmlFor="salarySleep" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">{formData.salarySleep ? formData.salarySleep.name : 'Click to upload Salary Slip'}</span>
                  </label>
                </div>
                {errors.salarySleep && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.salarySleep}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Application Confirmation */}
        {page === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Confirmation</h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
              <CheckCircle size={64} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Documents Submitted Successfully</h3>
              <p className="text-gray-600 mb-6">Your personal information and documents have been received. Please proceed to verify your identity in the next step.</p>
              <div className="bg-white rounded-lg p-4 text-left space-y-2">
                <p className="text-sm"><span className="font-semibold">Name:</span> {formData.fullName}</p>
                <p className="text-sm"><span className="font-semibold">Mobile:</span> {formData.mobileNumber}</p>
                <p className="text-sm"><span className="font-semibold">Aadhar:</span> XXXX XXXX {formData.aadharNumber.slice(-4)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Page 3: Verification & Documents */}
        {page === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Identity Verification</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Details *</label>
                <textarea
                  name="aadharDetails"
                  value={formData.aadharDetails}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-none ${errors.aadharDetails ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="Enter your Aadhar details"
                  rows="3"
                />
                {errors.aadharDetails && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.aadharDetails}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">OTP Verification *</label>
                <input
                  type="text"
                  name="otpVerification"
                  value={formData.otpVerification}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.otpVerification ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'}`}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
                {errors.otpVerification && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.otpVerification}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Aadhar Card *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.aadharCard ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'aadharCard')}
                    className="hidden"
                    id="aadharCard"
                  />
                  <label htmlFor="aadharCard" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">{formData.aadharCard ? formData.aadharCard.name : 'Click to upload Aadhar Card'}</span>
                  </label>
                </div>
                {errors.aadharCard && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.aadharCard}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload PAN Card *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.panCard ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'panCard')}
                    className="hidden"
                    id="panCard"
                  />
                  <label htmlFor="panCard" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">{formData.panCard ? formData.panCard.name : 'Click to upload PAN Card'}</span>
                  </label>
                </div>
                {errors.panCard && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.panCard}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Take Photo from Camera *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${errors.cameraPhoto ? 'border-red-500 bg-red-50' : 'border-blue-300 hover:border-blue-600 bg-blue-50'}`}>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoCapture}
                    className="hidden"
                    id="cameraPhoto"
                  />
                  <label htmlFor="cameraPhoto" className="cursor-pointer flex flex-col items-center gap-2">
                    <Camera size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">Tap to take photo</span>
                  </label>
                </div>
                {phonePreview && (
                  <img src={phonePreview} alt="Captured" className="mt-4 w-32 h-32 object-cover rounded-lg" />
                )}
                {errors.cameraPhoto && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} />{errors.cameraPhoto}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Page 4: Review Status */}
        {page === 4 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
              <CheckCircle size={80} className="mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Application Submitted</h2>
              <p className="text-lg mb-8 opacity-90">Your application is under review</p>
              
              <div className="bg-white bg-opacity-20 rounded-xl p-8 mb-8 backdrop-blur">
                <div className="text-5xl font-bold mb-2">3 Days</div>
                <p className="text-lg opacity-90">Expected Review Time</p>
              </div>

              <div className="space-y-3 text-left">
                <p className="text-sm opacity-90">✓ Documents verified</p>
                <p className="text-sm opacity-90">✓ Identity confirmed</p>
                <p className="text-sm opacity-90">✓ Application queued for processing</p>
              </div>

              <p className="text-sm mt-8 opacity-90">We'll notify you via SMS and Email once the review is complete.</p>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-gray-700 text-sm"><span className="font-semibold">Reference ID:</span> AF-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between mt-8">
          <button
            onClick={handlePrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            disabled={page === 1}
          >
            <ChevronLeft size={20} /> Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {page === 4 ? 'Complete' : 'Next'} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}