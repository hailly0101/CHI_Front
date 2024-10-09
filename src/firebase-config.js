// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore";  // Firebase Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5As5BKbHxAtQLSbpB6wme_2Z0V57LpPU",
  authDomain: "pocketmind-ed11e.firebaseapp.com",
  projectId: "pocketmind-ed11e",
  storageBucket: "pocketmind-ed11e.appspot.com",
  messagingSenderId: "693520526870",
  appId: "1:693520526870:web:a8d02e8a0bd9dd36904f37",
  measurementId: "G-RFFY3FL876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firebase 
const provider = new GoogleAuthProvider();

export { auth, db, provider };