import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignupScreen from './frontend/src/screens/SignupScreen';

// correct firebase import
import firebase from 'firebase/compat/app';

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
/*if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
};*/
const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = () => {
  return(
    <SafeAreaView style ={styles.root}>
      <SignupScreen/>  
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'black',
    
    
  },

});


export default App;