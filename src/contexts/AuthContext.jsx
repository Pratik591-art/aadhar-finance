import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeRecaptcha,
  sendOTP,
  verifyOTP,
  resendOTP,
  signOut as firebaseSignOut,
  getCurrentUser,
  onAuthChange
} from '../firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Initialize reCAPTCHA verifier
   * @param {string} containerId - Container element ID
   * @param {object} options - reCAPTCHA options
   */
  const setupRecaptcha = (containerId = 'recaptcha-container', options = {}) => {
    try {
      // Clear existing verifier from state
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
        } catch (e) {
          console.log('Previous verifier already cleared');
        }
        setRecaptchaVerifier(null);
      }

      const verifier = initializeRecaptcha(containerId, options);
      setRecaptchaVerifier(verifier);
      return verifier;
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      throw error;
    }
  };

  /**
   * Send OTP to phone number
   * @param {string} phoneNumber - Phone number with country code
   * @returns {Promise<ConfirmationResult>}
   */
  const requestOTP = async (phoneNumber) => {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized. Call setupRecaptcha() first.');
    }
    return await sendOTP(phoneNumber, recaptchaVerifier);
  };

  /**
   * Verify OTP code
   * @param {string} code - OTP code
   * @returns {Promise<UserCredential>}
   */
  const confirmOTP = async (code) => {
    return await verifyOTP(code);
  };

  /**
   * Resend OTP
   * @param {string} phoneNumber - Phone number with country code
   * @returns {Promise<ConfirmationResult>}
   */
  const resendOTPCode = async (phoneNumber) => {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized. Call setupRecaptcha() first.');
    }
    return await resendOTP(phoneNumber, recaptchaVerifier);
  };

  /**
   * Sign out current user
   */
  const logout = async () => {
    await firebaseSignOut();
    setRecaptchaVerifier(null);
  };

  const value = {
    user,
    loading,
    setupRecaptcha,
    requestOTP,
    confirmOTP,
    resendOTPCode,
    logout,
    isAuthenticated: !!user,
    currentUser: getCurrentUser()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
