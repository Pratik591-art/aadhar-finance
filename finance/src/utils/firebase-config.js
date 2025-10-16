import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Added two very common services: Auth and Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The environment variables are accessed via process.env and their REACT_APP_ prefix.
// The variables are injected into the client-side bundle by the React build tool.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the main app object too, though it's often not needed directly
export default app;

/* How to use these exports in your React components: