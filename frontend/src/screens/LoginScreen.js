import { View, Text, Image, StyleSheet, useWindowDimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';



const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {height} = useWindowDimensions();
    const LoginPressed = () =>{
    if (!email || !password ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

   
    Alert.alert('Success', 'Login successful!');

    setEmail('');
    setPassword('');
}

const ForgotPassPress = () => {
    console.warn("Football")
}

const NoAccountPress = () => {
    console.warn("Cheese")
}


  return (


    <View style = {styles.root}>
        <Image source={LogoImg} 
      
        style = {[styles.LogoImg, {height: height * 0.3}]}
        resizeMode='contain'/>
       
        <Text style = {styles.LogoText} > OneStep</Text>

        <CustomInput placeholder={"email"} value={email} setValue={setEmail}/>
        <CustomInput placeholder={"password"} value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomButton text={"Log in"} onPress={LoginPressed}/>


        
        <CustomButton 
            text={"Forgot Password"} 
            onPress={ForgotPassPress}
            type= "TERTIARY"
        />

        <CustomButton 
            style = {styles.signupStyle}
            text={"No account? Singup"} 
            onPress={NoAccountPress}
            type= "SECONDARY"
        />
        


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

    },
    signupStyle: {
        color:"green",
        marginTop: -20,
    }

})

export default LoginScreen