// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmNsc-iT0ww7VFqgV4Kj0GYLpUvynPrjw",
  authDomain: "employeetracker-761e2.firebaseapp.com",
  projectId: "employeetracker-761e2",
  storageBucket: "employeetracker-761e2.appspot.com",
  messagingSenderId: "85456797281",
  appId: "1:85456797281:web:d2ef9c1888f290157c3420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };