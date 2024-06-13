import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        styles[`container_${type}`],
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#0000CD',
  },
  container_HOME: {
    backgroundColor: '#dfdfdf',
    padding: 20,
    marginVertical: 7,
  },
  container_SECONDARY: {
    marginVertical: 3,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto_500Medium', // Apply Roboto bold font
  },
  text_HOME: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Roboto_500Medium', // Apply Roboto bold font
  },
  text_SECONDARY: {
    color: 'white',
    fontFamily: 'Roboto_500Medium', // Apply Roboto bold font
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});

export default CustomButton;
