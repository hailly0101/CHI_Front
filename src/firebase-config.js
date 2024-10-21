// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore";  // Firebase Firestore
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Your web app's Firebase configuration
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
const db = getFirestore(app);  // Firebase Firestore
const messaging = getMessaging(app);
const provider = new GoogleAuthProvider();

// 비동기 작업을 함수로 분리
async function requestNotificationPermission() {
  if (await isSupported()) {
    try {
      const currentToken = await getToken(messaging, { vapidKey: 'Ud_cMm29hcY8LmlFgGWYSc3p6RehpWOHXdTyZb_HZ1o' });
      if (currentToken) {
        console.log('Current token for client:', currentToken);
      } else {
        console.log('No registration token available.');
      }
    } catch (err) {
      console.error('An error occurred while retrieving token.', err);
    }
  } else {
    console.log('Firebase messaging is not supported on this browser.');
  }
}

// 비동기 작업 실행
requestNotificationPermission();

// 최상위 레벨에서 export
export { messaging, auth, db, provider };