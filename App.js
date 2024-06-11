import React from 'react';
import ScreenStack from './frontend/src/navigation';
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';
import './firebase';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ScreenStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
