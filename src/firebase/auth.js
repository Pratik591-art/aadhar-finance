import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './firestore';


/**
 * Initialize reCAPTCHA verifier
 * @param {string} containerId - The ID of the container element for reCAPTCHA
 * @param {Object} options - Optional configuration
 * @returns {RecaptchaVerifier}
 */
export const initializeRecaptcha = (containerId = 'recaptcha-container', options = {}) => {
  // Clear any existing reCAPTCHA instance safely
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (error) {
      // Verifier already destroyed, ignore error
      console.log('Previous reCAPTCHA instance already cleared');
    }
    window.recaptchaVerifier = null;
  }

  // Ensure the container exists and is empty
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container element with ID '${containerId}' not found`);
  }
  
  // Clear container content
  container.innerHTML = '';

  const defaultOptions = {
    size: 'invisible', // Use invisible to avoid multiple renders
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    },
    ...options
  };

  try {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, defaultOptions);
    console.log('reCAPTCHA initialized successfully');
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error creating RecaptchaVerifier:', error);
    throw error;
  }
};

/**
 * Send OTP to phone number
 * @param {string} phoneNumber - Phone number with country code (e.g., +911234567890)
 * @param {RecaptchaVerifier} recaptchaVerifier - reCAPTCHA verifier instance
 * @returns {Promise<ConfirmationResult>}
 */
export const sendOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    // Phone number must be in E.164 format (e.g., +911234567890)
    if (!phoneNumber.startsWith('+')) {
      throw new Error('Phone number must include country code (e.g., +911234567890)');
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    // Store confirmation result for OTP verification
    window.confirmationResult = confirmationResult;

    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);

    // Don't clear reCAPTCHA here - let the component handle reinitialization
    // Clearing here causes the "already destroyed" error

    throw error;
  }
};



/**
 * Verify OTP, check Firestore for existing user, create if new, then login.
 * @param {string} otpCode - The 6-digit OTP code
 * @param {ConfirmationResult} confirmationResult - Optional, uses window.confirmationResult if not provided
 * @returns {Promise<UserCredential>}
 */
export const verifyOTP = async (otpCode, confirmationResult = null) => {
  try {
    const result = confirmationResult || window.confirmationResult;
    if (!result) throw new Error("No confirmation result found.");

    const userCredential = await result.confirm(otpCode);
    const user = userCredential.user;

    window.confirmationResult = null;

    // Check Firestore for existing user / create if new
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "",
        email: "",
      });
      console.log("✅ New user created");
    } else {
      console.log("🔑 Existing user logged in");
    }

    // --- Get and store Firebase JWT ---
    const token = await user.getIdToken();
    localStorage.setItem("firebase_token", token);

    return userCredential;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};


/**
 * Re-send OTP (same as sendOTP but explicitly named for clarity)
 * @param {string} phoneNumber - Phone number with country code
 * @param {RecaptchaVerifier} recaptchaVerifier - reCAPTCHA verifier instance
 * @returns {Promise<ConfirmationResult>}
 */
export const resendOTP = async (phoneNumber, recaptchaVerifier) => {
  return sendOTP(phoneNumber, recaptchaVerifier);
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);

    // Clear any stored confirmation results
    window.confirmationResult = null;

    // Clear reCAPTCHA
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current user
 * @returns {User|null}
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function that receives the user object
 * @returns {Unsubscribe} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
