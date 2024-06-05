import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoImg from "../assets/images/favicon.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { auth } from "../../../firebase"; // Import auth from firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth"; // Import sign in function
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const LoginPressed = () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      Alert.alert("Success", "Login successful!");
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
  };
  const ForgotPassPress = () => {
    console.warn("Football");
  };

  const NoAccountPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      enableOnAndroid={true}
      extraHeight={150}
      keyboardShouldPersistTaps="handled"
    >
    <View style={styles.inner}>
      <Image
        source={LogoImg}
        style={[styles.LogoImg, { height: height * 0.25 }]}
        resizeMode="contain"
      />

      <Text style={styles.LogoText}> OneStep</Text>

      <CustomInput placeholder={"email"} value={email} setValue={setEmail} autoCorrect={false} />
      <CustomInput placeholder={"password"} value={password} setValue={setPassword} secureTextEntry={true} />

      <CustomButton text={"Log In"} onPress={LoginPressed} />

      <CustomButton
        text={"Forgot Password"}
        onPress={ForgotPassPress}
        type="TERTIARY"
      />

      <CustomButton
        text={"No account? Sign Up"}
        onPress={NoAccountPress}
        type="SECONDARY"
      />
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  LogoImg: {
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 5,
  },
  LogoText: {
    marginBottom: 30,
    color: "white",
    fontSize: 35,
  },
});

export default LoginScreen;
