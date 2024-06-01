import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, deleteTask, toggleCompleted }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleCompleted(task.id)}>
        <Text style={[styles.taskText, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#222',
    borderRadius: 5,
  },
  taskText: {
    color: 'white',
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    color: 'red',
  },
});

export default TaskItem;