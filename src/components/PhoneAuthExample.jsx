import React, { useState, useEffect } from 'react';
import {
  initializeRecaptcha,
  sendOTP,
  verifyOTP,
  signOut,
  getCurrentUser,
  onAuthChange
} from '../firebase';

const PhoneAuthExample = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setStep('phone');
        setPhoneNumber('');
        setOtpCode('');
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    if (!user && step === 'phone') {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        try {
          const verifier = initializeRecaptcha('recaptcha-container', {
            size: 'normal',
            callback: () => {
              console.log('reCAPTCHA verified successfully');
            }
          });
          setRecaptchaVerifier(verifier);
        } catch (err) {
          console.error('Error initializing reCAPTCHA:', err);
          setError('Failed to initialize reCAPTCHA. Please refresh the page.');
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [user, step]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate phone number format
      if (!phoneNumber.startsWith('+')) {
        throw new Error('Phone number must include country code (e.g., +911234567890)');
      }

      await sendOTP(phoneNumber, recaptchaVerifier);
      setStep('otp');
    } catch (err) {
      const errorMessage = err.message || 'Failed to send OTP. Please try again.';
      setError(errorMessage);
      console.error('Error sending OTP:', err);
      
      // For internal errors, suggest page refresh
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
      const userCredential = await verifyOTP(otpCode);
      console.log('User signed in successfully:', userCredential.user);
      setOtpCode('');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error('Error verifying OTP:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setStep('phone');
      setPhoneNumber('');
      setOtpCode('');
      console.log('User signed out successfully');
    } catch (err) {
      setError(err.message || 'Failed to sign out');
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtpCode('');
    setError('');
    // reCAPTCHA will be reinitialized by useEffect when step changes
  };

  // If user is already signed in
  if (user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p className="text-gray-700">
            <strong>UID:</strong> {user.uid}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Phone Authentication</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP}>
          <div className="mb-4">
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

          {/* reCAPTCHA container */}
          <div id="recaptcha-container" className="mb-4"></div>

          <button
            type="submit"
            disabled={loading || !phoneNumber}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              OTP sent to {phoneNumber}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otpCode.length !== 6}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed mb-2"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={handleBackToPhone}
            disabled={loading}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:bg-gray-200"
          >
            Back to Phone Number
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneAuthExample;
