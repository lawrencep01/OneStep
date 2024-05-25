import { View, Text, Image, StyleSheet, useWindowDimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';


const SignupScreen = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {height} = useWindowDimensions();
  
  const SigninPressed = () =>{
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Signup successful!');

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }


  return (


    <View style = {styles.root}>
      <Image source={LogoImg} 
      
      style = {[styles.LogoImg, {height: height * 0.3}]}
       resizeMode='contain'/>
       
      <Text style = {styles.LogoText} > OneStep</Text>

      <CustomInput placeholder={"Username"} value={username} setValue={setUsername}/>
      <CustomInput placeholder={"email"} value={email} setValue={setEmail}/>
      <CustomInput placeholder={"password"} value={password} setValue={setPassword} secureTextEntry={true}/>
      <CustomInput placeholder={"confirm Password"} value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
      <CustomButton text={"Sign up"} onPress={SigninPressed}/>

    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    padding: 20,

  },
  LogoImg: {
    maxWidth: 300,
    maxHeight: 200,
  },
  LogoText:{
    paddingBottom: 40,
    color: 'white',
    fontSize: 30,

  }
})

export default SignupScreen