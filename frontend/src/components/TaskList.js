import { View, Text, Image, StyleSheet, useWindowDimensions, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import TaskItem from '../components/TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    {id: 1, title: 'Task 1', completed: true},
    {id: 2, title: 'Task 2', completed: false},
    {id: 3, title: 'Task 3', completed: false},
  ]);
  const [text, setText] = useState('');

  // function to add a new task
  function addTask() {
    if (text === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setText('');
  }

  // function to delete a task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // function to toggle task completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => task.id === id ? {... task, completed: !task.completed} : task));
  }

  // return the list of tasks
  return (
    <View style={styles.root}>
      {tasks.map(task => (
        <TaskItem
         key={task.id} 
         task={task}
         deleteTask={deleteTask}
         toggleCompleted={toggleCompleted}
        />
      ))} 
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
      />
      <Button title="Add" onPress={addTask} />
    </View>
  );
};
const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: 'black',
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