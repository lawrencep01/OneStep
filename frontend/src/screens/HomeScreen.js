import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomButton from '../components/CustomButton';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const HomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const onLogoutPress = () => {
    navigation.navigate('Login');
  };

  const onTaskListPress = () => {
    navigation.navigate('TaskList');
  };

  const onOneTaskPress = () => {
    navigation.navigate('SingleTask');
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
          style={[styles.LogoImg, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.LogoText}>Welcome to OneStep</Text>

        <View style={styles.buttonContainer}>
          <CustomButton text={'One Task'} onPress={onOneTaskPress} />
          <CustomButton text={'Task List'} onPress={onTaskListPress} />
          <CustomButton text={'Logout'} onPress={onLogoutPress} />
        </View>
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