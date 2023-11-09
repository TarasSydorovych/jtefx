import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAuth, listUsers } from "firebase/auth";
import { OAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyCBA7D_sUGLuD1top6cwXSy_lDJKo4YMto",
  authDomain: "jtefx-3faec.firebaseapp.com",
  projectId: "jtefx-3faec",
  storageBucket: "jtefx-3faec.appspot.com",
  messagingSenderId: "418583796255",
  appId: "1:418583796255:web:a1c27667da5d159a1b932a",
  measurementId: "G-VG4TVDJ9ZD",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
