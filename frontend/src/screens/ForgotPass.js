import { View, Text, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LogoImg from '../assets/images/favicon.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { auth } from '../../../firebase'; // Import auth from firebase configuration
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Check your email, and once you have reset navigate back to login and try again");
      
      navigation.navigate('Login')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(`Error: ${errorMessage}`);
    }
  };

  const BackToLog = () => {
    navigation.navigate('Login');
  };

  const NoAccountPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/images/Background.jpeg')}
        style={styles.backgroundImage}
        blurRadius={20}
      />
      <View style={styles.overlay}>
        <Image
          source={LogoImg}
          style={[styles.LogoImg, { height: height * 0.25 }]}
          resizeMode="contain"
        />

        <Text style={styles.LogoText}> Reset Password </Text>

        <CustomInput placeholder={'email'} value={email} setValue={setEmail} />

        <CustomButton text={'Reset Password'} onPress={handlePasswordReset} />

        <CustomButton text={'Back to Log in'} onPress={BackToLog} type="TERTIARY" />

        <CustomButton text={'No account? Sign Up'} onPress={NoAccountPress} type='TERTIARY'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    marginBottom: 5,
  },
  LogoText: {
    marginBottom: 30,
    color: 'white',
    fontSize: 35,
  },
});

export default ForgotPass;
