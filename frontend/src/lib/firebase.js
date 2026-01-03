// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAoR3kfrs0O__F7fP_Ta4tjPGiw4mKao0",
  authDomain: "farmacykart-bdbf2.firebaseapp.com",
  projectId: "farmacykart-bdbf2",
  storageBucket: "farmacykart-bdbf2.firebasestorage.app",
  messagingSenderId: "996249967620",
  appId: "1:996249967620:web:6a1db93c5ff4293cbce951",
  measurementId: "G-B0PN380VKF"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Analytics might fail in SSR/Node env, so be careful or check window
export const auth = getAuth(app);
export default app;
