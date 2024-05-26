import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignupScreen from './frontend/src/screens/SignupScreen';
import LoginScreen from './frontend/src/screens/LoginScreen';

const App = () => {
  return(
    <SafeAreaView style ={styles.root}>
      <LoginScreen/>
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