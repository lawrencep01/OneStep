import { Text, StyleSheet, Pressable } from 'react-native';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';
import React from 'react';

const TextButton = ({ onPress, text }) => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto_500Medium',
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});

export default TextButton;
