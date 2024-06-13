import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import LogoImg from '../assets/images/favicon.png';
import CustomButton from '../components/CustomButton';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';

const HomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

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
          <CustomButton text={'One Task'} onPress={onOneTaskPress} type="HOME" />
          <CustomButton text={'Task List'} onPress={onTaskListPress} type="HOME" />
          <View style={{ width: '100%', marginVertical: 30, borderRadius: 5 }}>
            <CustomButton text={'Logout'} onPress={onLogoutPress} type="PRIMARY" />
          </View>
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
    fontSize: 32,
    marginBottom: 40,
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
