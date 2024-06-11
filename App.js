import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import ScreenStack from './frontend/src/navigation';
import 'react-native-gesture-handler';
import './firebase';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView style={styles.root}>
        <ScreenStack />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
