import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

const TaskItem = (props) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], timeOptions)}`;
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={props.completed ? styles.completedSquare : styles.square}></View>
        <View style={styles.textContainer}>
          <Text style={props.completed ? styles.itemTextCompleted : styles.itemText}>
            {props.text}
          </Text>
          <Text style={styles.dateText}>{formatDateTime(props.dateTime)}</Text>
        </View>
      </View>
      <View style={props.completed ? styles.completedCircular : styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  textContainer: {
    flexShrink: 1,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#000000',
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
  },
  completedSquare: {
    width: 24,
    height: 24,
    backgroundColor: '#000000',
    opacity: 0.3,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '100%',
    flexWrap: 'wrap',
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font
  },
  itemTextCompleted: {
    maxWidth: '100%',
    textDecorationLine: 'line-through',
    color: 'grey',
    flexWrap: 'wrap',
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font
  },
  dateText: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
  },
  completedCircular: {
    width: 12,
    height: 12,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
});

export default TaskItem;
