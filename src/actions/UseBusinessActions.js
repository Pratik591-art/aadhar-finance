// src/actions/businessLoanAction.js
import { db, storage, auth } from "../firebase/config";
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// 🔹 Upload a single file to Firebase Storage using UID-based path
export const uploadFileToStorage = async (file, userUid, folderName) => {
  try {
    if (!file) {
      console.warn(`⚠️ No file provided for ${folderName}`);
      return null;
    }

    console.log(`📂 Starting upload for ${folderName}...`);
    const storageRef = ref(
      storage,
      `businessLoans/${userUid}/${folderName}/${file.name}`
    );

    console.log(`⏫ Uploading file: ${file.name} to path: ${storageRef.fullPath}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    console.log(`✅ Upload successful for ${folderName}: ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error(`❌ File upload failed for ${folderName}:`, error);
    throw error;
  }
};

// 🔹 CREATE: Submit Business Loan Application
export const submitBusinessLoanApplication = async (formData) => {
  console.log("🚀 Starting business loan application submission...");
  try {
    const currentUser = auth.currentUser;
    console.log("👤 Current user:", currentUser?.uid || "No user logged in");

    if (!currentUser || !currentUser.uid) {
      throw new Error("User not logged in");
    }

    const userUid = currentUser.uid;
    console.log("📦 Uploading documents for user:", userUid);

    // Upload all business documents
    const [
      shopPhotoURL,
      lastSixMonthBillURL,
      gstDocumentURL,
      shopStockPhotoURL,
      aadharFrontURL,
      aadharBackURL,
      panCardURL,
      selfieURL
    ] = await Promise.all([
      uploadFileToStorage(formData.shopPhoto, userUid, "shopPhoto"),
      uploadFileToStorage(formData.lastSixMonthBill, userUid, "lastSixMonthBill"),
      uploadFileToStorage(formData.gstDocument, userUid, "gstDocument"),
      uploadFileToStorage(formData.shopStockPhoto, userUid, "shopStockPhoto"),
      uploadFileToStorage(formData.aadharFront, userUid, "aadharFront"),
      uploadFileToStorage(formData.aadharBack, userUid, "aadharBack"),
      uploadFileToStorage(formData.panCard, userUid, "panCard"),
      uploadFileToStorage(formData.selfie, userUid, "selfie")
    ]);

    console.log("📸 Document URLs ready");

    // Save to Firestore
    console.log("🗂️ Saving form data to Firestore...");
    const docRef = await addDoc(collection(db, "businessLoans"), {
      userId: userUid,
      // Personal Information
      fullName: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      panNumber: formData.panNumber,
      aadharNumber: formData.aadharNumber,
      gender: formData.gender,
      // Address Information
      completeAddress: formData.completeAddress,
      addressType: formData.addressType,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      // Business Information
      gstNumber: formData.gstNumber,
      // Bank Information
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode: formData.ifscCode,
      // Application Status
      status: "pending",
      applicationDate: new Date(),
      approvedAmount: "5,00,000",
      // Documents
      documents: {
        shopPhoto: shopPhotoURL,
        lastSixMonthBill: lastSixMonthBillURL,
        gstDocument: gstDocumentURL,
        shopStockPhoto: shopStockPhotoURL,
        aadharFront: aadharFrontURL,
        aadharBack: aadharBackURL,
        panCard: panCardURL,
        selfie: selfieURL
      }
    });

    console.log("✅ Business loan application successfully saved! Document ID:", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("❌ Error submitting business loan application:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 READ: Get a single business loan application by ID
export const getBusinessLoanById = async (loanId) => {
  try {
    console.log("📖 Fetching business loan with ID:", loanId);
    const docRef = doc(db, "businessLoans", loanId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("✅ Business loan found:", docSnap.data());
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      console.log("⚠️ No business loan found with this ID");
      return { success: false, error: "Loan not found" };
    }
  } catch (error) {
    console.error("❌ Error fetching business loan:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 READ: Get all business loans for current user
export const getUserBusinessLoans = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not logged in");
    }

    console.log("📖 Fetching all business loans for user:", currentUser.uid);
    const q = query(
      collection(db, "businessLoans"),
      where("userId", "==", currentUser.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const loans = [];
    
    querySnapshot.forEach((doc) => {
      loans.push({ id: doc.id, ...doc.data() });
    });

    console.log(`✅ Found ${loans.length} business loan(s)`);
    return { success: true, data: loans };
  } catch (error) {
    console.error("❌ Error fetching user business loans:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 READ: Get all business loans (Admin)
export const getAllBusinessLoans = async () => {
  try {
    console.log("📖 Fetching all business loans...");
    const querySnapshot = await getDocs(collection(db, "businessLoans"));
    const loans = [];
    
    querySnapshot.forEach((doc) => {
      loans.push({ id: doc.id, ...doc.data() });
    });

    console.log(`✅ Found ${loans.length} total business loan(s)`);
    return { success: true, data: loans };
  } catch (error) {
    console.error("❌ Error fetching all business loans:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 UPDATE: Update business loan application
export const updateBusinessLoan = async (loanId, updateData) => {
  try {
    console.log("🔄 Updating business loan:", loanId);
    const docRef = doc(db, "businessLoans", loanId);
    
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });

    console.log("✅ Business loan updated successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating business loan:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 UPDATE: Update loan status
export const updateLoanStatus = async (loanId, status) => {
  try {
    console.log(`🔄 Updating loan status to: ${status}`);
    const docRef = doc(db, "businessLoans", loanId);
    
    await updateDoc(docRef, {
      status: status,
      statusUpdatedAt: new Date()
    });

    console.log("✅ Loan status updated successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating loan status:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 DELETE: Delete business loan application
export const deleteBusinessLoan = async (loanId) => {
  try {
    console.log("🗑️ Deleting business loan:", loanId);
    
    // First, get the loan data to delete associated files
    const loanData = await getBusinessLoanById(loanId);
    
    if (loanData.success && loanData.data.documents) {
      // Delete all uploaded files from storage
      const documents = loanData.data.documents;
      const deletePromises = [];
      
      for (const [key, url] of Object.entries(documents)) {
        if (url) {
          try {
            const fileRef = ref(storage, url);
            deletePromises.push(deleteObject(fileRef));
          } catch (err) {
            console.warn(`⚠️ Could not delete file ${key}:`, err);
          }
        }
      }
      
      await Promise.all(deletePromises);
      console.log("✅ All documents deleted from storage");
    }
    
    // Delete the Firestore document
    await deleteDoc(doc(db, "businessLoans", loanId));
    
    console.log("✅ Business loan deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting business loan:", error);
    return { success: false, error: error.message };
  }
};

// 🔹 QUERY: Get loans by status
export const getLoansByStatus = async (status) => {
  try {
    console.log(`📖 Fetching loans with status: ${status}`);
    const q = query(
      collection(db, "businessLoans"),
      where("status", "==", status)
    );
    
    const querySnapshot = await getDocs(q);
    const loans = [];
    
    querySnapshot.forEach((doc) => {
      loans.push({ id: doc.id, ...doc.data() });
    });

    console.log(`✅ Found ${loans.length} loan(s) with status: ${status}`);
    return { success: true, data: loans };
  } catch (error) {
    console.error("❌ Error fetching loans by status:", error);
    return { success: false, error: error.message };
  }
};