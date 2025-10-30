// src/actions/userAction.js
import { db, storage, auth } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      `personalLoans/${userUid}/${folderName}/${file.name}`
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

// 🔹 Upload all files and save form data to Firestore
export const submitLoanApplication = async (formData) => {
  console.log("🚀 Starting loan application submission...");
  try {
    const currentUser = auth.currentUser;
    console.log("👤 Current user:", currentUser?.uid || "No user logged in");

    if (!currentUser || !currentUser.uid) {
      throw new Error("User not logged in");
    }

    const userUid = currentUser.uid;
    console.log("📦 Uploading documents for user:", userUid);

    // Upload documents using UID-based folder path
    const aadharFrontURL = await uploadFileToStorage(
      formData.aadharFront,
      userUid,
      "aadharFront"
    );
    const aadharBackURL = await uploadFileToStorage(
      formData.aadharBack,
      userUid,
      "aadharBack"
    );
    const panFrontURL = await uploadFileToStorage(
      formData.panFront,
      userUid,
      "panFront"
    );
    const panBackURL = await uploadFileToStorage(
      formData.panBack,
      userUid,
      "panBack"
    );

    console.log("📸 Document URLs ready:", {
      aadharFrontURL,
      aadharBackURL,
      panFrontURL,
      panBackURL,
    });

    // Save to Firestore
    console.log("🗂️ Saving form data to Firestore...");
    const docRef = await addDoc(collection(db, "personalLoan"), {
      userId: userUid,
      phoneNumber: currentUser.phoneNumber || formData.mobileNumber || null,
      loanAmount: formData.loanAmount,
      monthlySalary: formData.monthlySalary,
      loanPurpose: formData.loanPurpose,
      fullName: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      completeAddress: formData.completeAddress,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      aadharNumber: formData.aadharNumber,
      panNumber: formData.panNumber,
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode: formData.ifscCode,
      createdAt: new Date(),
      documents: {
        aadharFront: aadharFrontURL,
        aadharBack: aadharBackURL,
        panFront: panFrontURL,
        panBack: panBackURL,
      },
    });

    console.log("✅ Loan application successfully saved! Document ID:", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("❌ Error submitting loan application:", error);
    return { success: false, error };
  }
};
