// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAR7Pfvtr-1gG8CCRUUQyiREuZBn06qPcM',
  authDomain: 'onestep-44122.firebaseapp.com',
  databaseURL: 'https://onestep-44122-default-rtdb.firebaseio.com',
  projectId: 'onestep-44122',
  storageBucket: 'onestep-44122.appspot.com',
  messagingSenderId: '133742872509',
  appId: '1:133742872509:web:760c07dfb8df138fa934d4',
  measurementId: 'G-LVJKCMF1Q9',
};

// Initialize Firebase if not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize services with AsyncStorage for auth persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getDatabase(app);

export { auth, database };
