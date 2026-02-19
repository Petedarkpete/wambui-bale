// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from '@firebase/firestore';
import { getAuth } from "firebase/auth";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSHYEoZbBXb9gzCDIvruP13ORdCJOg6jE",
  authDomain: "wambui-bales.firebaseapp.com",
  projectId: "wambui-bales",
  storageBucket: "wambui-bales.firebasestorage.app",
  messagingSenderId: "749335753297",
  appId: "1:749335753297:web:d869d9fc8fa7afc3237e70",
  measurementId: "G-N15TW1NPC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
//const getAnalytics = getAnalytics(app);
const firestore = getFirestore(app);