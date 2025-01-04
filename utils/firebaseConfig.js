// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "portfolio-builder-dc82f.firebaseapp.com",
  projectId: "portfolio-builder-dc82f",
  storageBucket: "portfolio-builder-dc82f.firebasestorage.app",
  messagingSenderId: "24838361730",
  appId: "1:24838361730:web:5c225d6ce134f4a52fda9b",
  measurementId: "G-67RZWG5K48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);