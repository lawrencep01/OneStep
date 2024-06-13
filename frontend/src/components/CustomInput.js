import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#A9A9A9" // Set a custom color for the placeholder text
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font to the input text
  },
});

export default CustomInput;
