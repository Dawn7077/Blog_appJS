 
import { initializeApp } from "firebase/app"; 
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyC5cU-u5XZeBXPSr-uMSNRYw-u2I8r9NFI",
  authDomain: "blog-app-062026.firebaseapp.com",
  projectId: "blog-app-062026",
  storageBucket: "blog-app-062026.firebasestorage.app",
  messagingSenderId: "613003545473",
  appId: "1:613003545473:web:30d968939deffbf06ef680",
  measurementId: "G-DW38QQB32Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app)
export const db = getFirestore(app)