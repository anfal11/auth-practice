import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGhTCmLaAkLahC02OoyA3CRCZfJQ1IRJU",
  authDomain: "user-email-password-auth-7dc73.firebaseapp.com",
  projectId: "user-email-password-auth-7dc73",
  storageBucket: "user-email-password-auth-7dc73.appspot.com",
  messagingSenderId: "49491521296",
  appId: "1:49491521296:web:fb756786a0d46ff50d3f95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
// export default app;