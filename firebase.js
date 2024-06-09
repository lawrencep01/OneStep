import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR7Pfvtr-1gG8CCRUUQyiREuZBn06qPcM",
  authDomain: "onestep-44122.firebaseapp.com",
  databaseURL: "https://onestep-44122-default-rtdb.firebaseio.com",
  projectId: "onestep-44122",
  storageBucket: "onestep-44122.appspot.com",
  messagingSenderId: "133742872509",
  appId: "1:133742872509:web:760c07dfb8df138fa934d4",
  measurementId: "G-LVJKCMF1Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with AsyncStorage for auth persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
//const firestore = getFirestore(app);
const database = getDatabase(app);


export { auth, database };

