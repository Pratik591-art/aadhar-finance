// Export all Firebase services
export { auth } from './config';
export {
  initializeRecaptcha,
  sendOTP,
  verifyOTP,
  resendOTP,
  signOut, 
  getCurrentUser,
  onAuthChange,
  isAuthenticated
} from './auth';
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
