import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbbOEEHZY6hFNbuIE_PZLzwUooos45EuY",
  authDomain: "restaurant-d646f.firebaseapp.com",
  projectId: "restaurant-d646f",
  storageBucket: "restaurant-d646f.appspot.com",
  messagingSenderId: "544786126234",
  appId: "1:544786126234:web:15c5eee7eaf3eb4f3a9623",
  measurementId: "G-236Y3D37PN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);