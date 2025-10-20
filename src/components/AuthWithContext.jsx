import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Example component using AuthContext
 * This is a cleaner alternative to PhoneAuthExample.jsx
 */
const AuthWithContext = () => {
  const {
    user,
    setupRecaptcha,
    requestOTP,
    confirmOTP,
    logout,
    isAuthenticated
  } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize reCAPTCHA when component mounts or step changes back to phone
  useEffect(() => {
    if (!isAuthenticated && step === 'phone') {
      // Small delay to ensure DOM is ready
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
  }, [isAuthenticated, step]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber.startsWith('+')) {
        throw new Error('Phone number must include country code (e.g., +911234567890)');
      }

      await requestOTP(phoneNumber);
      setStep('otp');
    } catch (err) {
      const errorMessage = err.message || 'Failed to send OTP';
      setError(errorMessage);
      console.error('Error:', err);
      
      // Force page reload on auth/internal-error to reset reCAPTCHA completely
      if (err.code === 'auth/internal-error') {
        setError('reCAPTCHA error. Please refresh the page and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmOTP(otpCode);
      console.log('User signed in successfully');
      setOtpCode('');
      setStep('phone');
    } catch (err) {
      setError(err.message || 'Invalid OTP');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setStep('phone');
      setPhoneNumber('');
      setOtpCode('');
    } catch (err) {
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('phone');
    setOtpCode('');
    setError('');
    // reCAPTCHA will be reinitialized by useEffect when step changes
  };

  // Authenticated view
  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome! 👋</h2>
        <div className="space-y-2 mb-6">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="font-medium">{user.phoneNumber}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">User ID</p>
            <p className="font-mono text-sm">{user.uid}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  // Authentication flow
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {step === 'phone' ? 'Sign In' : 'Verify OTP'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+911234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Include country code (e.g., +91 for India)
            </p>
          </div>

          <div id="recaptcha-container"></div>

          <button
            type="submit"
            disabled={loading || !phoneNumber}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label htmlFor="otpCode" className="block text-gray-700 font-medium mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otpCode"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="123456"
              maxLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
              required
              disabled={loading}
              autoFocus
            />
            <p className="text-sm text-gray-500 mt-1">
              OTP sent to {phoneNumber}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otpCode.length !== 6}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthWithContext;
