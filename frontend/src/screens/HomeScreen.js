import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const onProfilePress = () => {
    navigation.navigate('Profile');
  };

  const onSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const onLogoutPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.root}>
      <Image
        source={LogoImg}
        style={[styles.LogoImg, { height: height * 0.3 }]}
        resizeMode='contain'
      />
      <Text style={styles.LogoText}>Welcome to OneStep</Text>

      <View style={styles.buttonContainer}>
        <CustomButton text={"Profile"} onPress={onProfilePress} />
        <CustomButton text={"Settings"} onPress={onSettingsPress} />
        <CustomButton text={"Logout"} onPress={onLogoutPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  LogoImg: {
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 20,
  },
  LogoText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
