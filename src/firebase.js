// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// Import other Firebase services if needed
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATiAswW7Uc33YkV8PvHT1jryTDzfS0p5g",
  authDomain: "americanas-padel-1.firebaseapp.com",
  projectId: "americanas-padel-1",
  storageBucket: "americanas-padel-1.appspot.com",
  messagingSenderId: "558807349234",
  appId: "1:558807349234:web:7637b2dac013d53f37dd6b",
  measurementId: "G-HQS11GZ8NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
const database = getDatabase(app);

export { database };
