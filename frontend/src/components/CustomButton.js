import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
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
    backgroundColor: '#3B71F3',
  },
  container_TERTIARY: {
    marginVertical: 3,
  },
  container_SECONDARY: {
    marginVertical: 3,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_TERTIARY: {
    color: 'white',
  },
  text_SECONDARY: {
    color: 'white',
  },

  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});

export default CustomButton;
