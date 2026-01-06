// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUBq2cp6dQhkxGUlwQ01y1Az8MsNiL9Ic",
  authDomain: "farmacykart-f0650.firebaseapp.com",
  projectId: "farmacykart-f0650",
  storageBucket: "farmacykart-f0650.firebasestorage.app",
  messagingSenderId: "902396666658",
  appId: "1:902396666658:web:e37de93d37a9958968fb7b",
  measurementId: "G-J107YQ2JEX"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
export default app;
