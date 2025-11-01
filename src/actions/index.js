// Export all Firebase services
export { auth } from '../firebase/auth';
export {
  initializeRecaptcha,
  sendOTP,
  verifyOTP,
  resendOTP,
  signOut, 
  getCurrentUser,
  onAuthChange,
  isAuthenticated
} from '../firebase/auth';

export {
  db,
  saveUserDetails,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
  hasCompletedProfile,
  getUserByEmail,
  checkPhoneNumberExists
} from './firestore';
