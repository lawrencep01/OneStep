import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR7Pfvtr-1gG8CCRUUQyiREuZBn06qPcM",
  authDomain: "onestep-44122.firebaseapp.com",
  projectId: "onestep-44122",
  storageBucket: "onestep-44122.appspot.com",
  messagingSenderId: "133742872509",
  appId: "1:133742872509:web:760c07dfb8df138fa934d4",
  measurementId: "G-LVJKCMF1Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

