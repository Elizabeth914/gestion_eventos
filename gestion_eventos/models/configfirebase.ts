// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaJpLBswad_ij5srGAJCAX5_M7g9mB8Mc",
  authDomain: "foro2login.firebaseapp.com",
  projectId: "foro2login",
  storageBucket: "foro2login.firebasestorage.app",
  messagingSenderId: "819674941527",
  appId: "1:819674941527:web:a286b37c827cc4470dfb12"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);