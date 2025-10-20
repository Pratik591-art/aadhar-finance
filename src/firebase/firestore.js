import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import app from './config';

// Initialize Firestore
export const db = getFirestore(app);

/**
 * Save user details to Firestore
 * @param {string} userId - User ID (from Firebase Auth)
 * @param {Object} userData - User details object
 * @returns {Promise<void>}
 */
export const saveUserDetails = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log('User details saved successfully');
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error;
  }
};

/**
 * Get user details from Firestore
 * @param {string} userId - User ID
 * @returns {Promise<Object>}
 */
export const getUserDetails = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No user details found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};

/**
 * Update user details in Firestore
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateUserDetails = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('User details updated successfully');
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

/**
 * Delete user details from Firestore
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export const deleteUserDetails = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    
    console.log('User details deleted successfully');
  } catch (error) {
    console.error('Error deleting user details:', error);
    throw error;
  }
};

/**
 * Check if a phone number is already registered
 * @param {string} phoneNumber - Phone number to check
 * @returns {Promise<boolean>}
 */
export const checkPhoneNumberExists = async (phoneNumber) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('phoneNumber', '==', phoneNumber),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    const exists = !querySnapshot.empty;
    
    return exists;
  } catch (error) {
    console.error('Error checking phone number:', error);
    console.error('Error details:', error.code, error.message);
    // Throw error instead of returning false so we can handle it properly
    throw error;
  }
};

/**
 * Check if user has completed their profile
 * @param {string} userId - User ID
 * @returns {Promise<boolean>}
 */
export const hasCompletedProfile = async (userId) => {
  try {
    const userData = await getUserDetails(userId);
    
    if (!userData) return false;
    
    // Check required fields
    const requiredFields = ['fullName', 'email', 'dateOfBirth', 'phoneNumber'];
    return requiredFields.every(field => userData[field]);
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};

/**
 * Search users by email
 * @param {string} email - Email to search
 * @returns {Promise<Array>}
 */
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return users;
  } catch (error) {
    console.error('Error searching user by email:', error);
    throw error;
  }
};
