import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveUserDetails } from '../../firebase';

/**
 * Multi-step Login Flow
 * Step 1: Phone Authentication (India only)
 * Step 2: User Details Form
 * Step 3: Confirmation Message
 */
const GetStarted = () => {
  const {
    user,
    setupRecaptcha,
    requestOTP,
    confirmOTP,
    isAuthenticated
  } = useAuth();

  const navigate = useNavigate();

  // Form states
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: User Details, 4: Confirmation
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // User details state
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: ''
  });

  // Initialize reCAPTCHA for step 1
  useEffect(() => {
    if (!isAuthenticated && step === 1) {
      const timer = setTimeout(() => {
        try {
          setupRecaptcha('recaptcha-container', {
            size: 'normal',
            callback: () => console.log('reCAPTCHA verified')
          });
        } catch (err) {
          console.error('Error initializing reCAPTCHA:', err);
          setError('Failed to initialize reCAPTCHA. Please refresh the page.');
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
    if (!value.startsWith('+91')) {
      value = '+91' + value.replace(/^\+91/, '');
    }
    
    // Remove any non-digit characters except the + at the start
    value = '+91' + value.slice(3).replace(/\D/g, '');
    
    // Limit to 10 digits after +91
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    
    setPhoneNumber(value);
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate Indian phone number
      if (phoneNumber.length !== 13) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }

      await requestOTP(phoneNumber);
      setStep(2);
      console.log('OTP sent successfully');
    } catch (err) {
      const errorMessage = err.message || 'Failed to send OTP';
      setError(errorMessage);
      console.error('Error:', err);

      if (err.code === 'auth/internal-error') {
        setError('reCAPTCHA error. Please refresh the page and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmOTP(otpCode);
      console.log('User authenticated successfully');
      setStep(3); // Move to user details
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle user details form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit user details
  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!userDetails.fullName || !userDetails.email || !userDetails.dateOfBirth) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userDetails.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Save user details to Firestore
      if (user?.uid) {
        await saveUserDetails(user.uid, {
          ...userDetails,
          phoneNumber: phoneNumber,
          uid: user.uid
        });
        console.log('User details saved successfully');
      }
      
      // Move to confirmation step
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to save details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Restart the process
  const handleRestart = () => {
    setStep(1);
    setPhoneNumber('+91');
    setOtpCode('');
    setUserDetails({
      fullName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      occupation: ''
    });
    setError('');
  };

  // Render different steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                } font-semibold transition-all duration-300`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > num ? 'bg-blue-600' : 'bg-gray-300'
                  } transition-all duration-300`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Phone</span>
            <span>OTP</span>
            <span>Details</span>
            <span>Done</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Phone Number */}
          {step === 1 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome! 👋</h2>
                <p className="text-gray-600">Enter your mobile number to get started</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send you an OTP to verify your number
                  </p>
                </div>

                {/* reCAPTCHA container */}
                <div id="recaptcha-container" className="flex justify-center"></div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length !== 13}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors duration-200 shadow-lg"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP 🔐</h2>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to<br />
                  <span className="font-semibold text-blue-600">{phoneNumber}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="otpCode"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-semibold"
                    required
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length !== 6}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors duration-200 shadow-lg"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 font-medium transition-colors duration-200"
                >
                  Change Number
                </button>
              </form>
            </div>
          )}

          {/* Step 3: User Details */}
          {step === 3 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Details 📝</h2>
                <p className="text-gray-600">Help us know you better</p>
              </div>

              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={userDetails.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={userDetails.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={userDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={userDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={userDetails.pincode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        handleInputChange({ target: { name: 'pincode', value } });
                      }}
                      maxLength="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={userDetails.occupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors duration-200 shadow-lg"
                  >
                    {loading ? 'Submitting...' : 'Submit Details'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">All Set! 🎉</h2>
                <p className="text-gray-600 mb-6">
                  Your account has been created successfully
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Account Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{userDetails.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{userDetails.email}</span>
                  </div>
                  {userDetails.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium">{userDetails.city}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors duration-200 shadow-lg mb-3"
              >
                Go to Home
              </button>

              <button
                onClick={handleRestart}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
