import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignupScreen from './frontend/src/screens/SignupScreen';

const App = () => {
  return(
    <SafeAreaView style ={styles.root}>
      <SignupScreen />
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;