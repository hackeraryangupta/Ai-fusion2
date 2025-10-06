// frontend/firebase.js

// Import Firebase core + Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ for file uploads (resumes, etc.)
import { getAuth } from "firebase/auth"; // ✅ if you plan to add login

// Firebase configuration
const Firebase = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // ✅ safely stored in .env.local
  authDomain: "ai-fusion-efc0b.firebaseapp.com",
  projectId: "ai-fusion-efc0b",
  storageBucket: "ai-fusion-efc0b.appspot.com", // ✅ FIXED (.app → .appspot.com)
  messagingSenderId: "334974616771",
  appId: "1:334974616771:web:d12fb80b657c010ffc0e76",
  measurementId: "G-FMYFXJF86H",
};

// Initialize Firebase
const app = initializeApp(Firebase);
// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
