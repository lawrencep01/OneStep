import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignupScreen from './frontend/src/screens/SignupScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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