import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>So much more that we can do</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
