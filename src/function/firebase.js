import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAuth, listUsers } from "firebase/auth";
import { OAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyBp7Vh74FRzirfMHgNFaIoLNXCXlmPdmvA",
  authDomain: "jtefx-353bb.firebaseapp.com",
  databaseURL:
    "https://jtefx-353bb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jtefx-353bb",
  storageBucket: "jtefx-353bb.appspot.com",
  messagingSenderId: "331185217504",
  appId: "1:331185217504:web:6aa8ad34db9daf8f779585",
  measurementId: "G-E6WQ26WCFX",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
