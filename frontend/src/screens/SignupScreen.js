import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import LogoImg from "../assets/images/favicon.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { auth } from "../../../firebase"; // Import auth from firebase configuration
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import required functions

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { height } = useWindowDimensions();

  const SigninPressed = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            Alert.alert("Success", "Signup Successful!");
            // Clear the form
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.root}>
      <Image
        source={LogoImg}
        style={[styles.LogoImg, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <Text style={styles.LogoText}> OneStep</Text>

      <CustomInput
        placeholder={"Username"}
        value={username}
        setValue={setUsername}
      />
      <CustomInput placeholder={"email"} value={email} setValue={setEmail} />
      <CustomInput
        placeholder={"password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        placeholder={"confirm Password"}
        value={confirmPassword}
        setValue={setConfirmPassword}
        secureTextEntry={true}
      />
      <CustomButton text={"Register"} onPress={SigninPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  LogoImg: {
    maxWidth: 300,
    maxHeight: 200,
  },
  LogoText: {
    paddingBottom: 40,
    color: "white",
    fontSize: 30,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginBottom: 20, // adjust as needed
  },
});

export default SignupScreen;
