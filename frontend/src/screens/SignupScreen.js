import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase'; // Import auth from firebase configuration
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import required functions



  

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const SigninPressed = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }


   

    
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            Alert.alert('Success', 'Signup Successful!');
            // Clear the form
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('Home')
          })
          .catch((error) => {
            Alert.alert('Error', error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });

  };
 const BackToLog = () => {
      navigation.navigate('Login');
    }



  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/images/Background.jpeg')}
          style={styles.backgroundImage}
          blurRadius={20}
        />
        <View style={styles.overlay}>
          <Image
            source={LogoImg}
            style={[styles.LogoImg, { height: height * 0.3, marginTop: -50 }]}
            resizeMode="contain"
          />

        <Text style={styles.LogoText}> Sign Up</Text>

        <CustomInput placeholder={'Username'} value={username} setValue={setUsername} />
        <CustomInput placeholder={'email'} value={email} setValue={setEmail} />
        <CustomInput
          placeholder={'password'}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder={'confirm Password'}
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
        />
        <CustomButton text={'Register'} onPress={SigninPressed} />
        <CustomButton text={'Already have an account? Back to Log in'} onPress={BackToLog} type="SECONDARY" />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  LogoImg: {
    maxWidth: 300,
    maxHeight: 200,
  },
  LogoText: {
    paddingBottom: 30,
    color: 'white',
    fontSize: 35,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 20, // adjust as needed
  },
});

export default SignupScreen;
