import React from 'react';
import ScreenStack from './frontend/src/navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TaskList from './frontend/src/components/TaskList';
import { NavigationContainer } from '@react-navigation/native';

import SignupScreen from './frontend/src/screens/SignupScreen';

import firebase from 'firebase/compat/app';
import LoginScreen from './frontend/src/screens/LoginScreen';

const firebaseConfig = {
  apiKey: "AIzaSyAR7Pfvtr-1gG8CCRUUQyiREuZBn06qPcM",
  authDomain: "onestep-44122.firebaseapp.com",
  projectId: "onestep-44122",
  storageBucket: "onestep-44122.appspot.com",
  messagingSenderId: "133742872509",
  appId: "1:133742872509:web:760c07dfb8df138fa934d4",
  measurementId: "G-LVJKCMF1Q9"
};


//Initialize Firebase
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
};

const App = () => {
  return(
    <SafeAreaView style ={styles.root}>
      <ScreenStack />  
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
