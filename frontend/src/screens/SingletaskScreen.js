import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { auth, database } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

const SingleTaskScreen = () => {
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userTaskRef = ref(database, `tasks/${user.uid}`);
        onValue(userTaskRef, (snapshot) => {
          const data = snapshot.val();
          const tasksList = data
            ? Object.keys(data)
                .map((key) => ({ id: key, ...data[key] }))
                .filter((task) => !task.completed)
                .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            : [];
          setTasks(tasksList);
          setTask(tasksList[0] || null);
        });
      } else {
        setUser(null);
        setTasks([]);
        setTask(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  const completeTask = (taskId) => {
    const taskRef = ref(database, `tasks/${user.uid}/${taskId}`);
    set(taskRef, { ...task, completed: true });
    const remainingTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(remainingTasks);
    setTask(remainingTasks[0] || null);
  };

  const handleTaskPress = () => {
    if (task) {
      completeTask(task.id);
    } else {
      Alert.alert('No current tasks');
    }
  };

  return (
    <View style={styles.container}>
      {task ? (
        <TouchableOpacity style={styles.taskContainer} onPress={handleTaskPress}>
          <Text style={styles.taskText}>{task.text}</Text>
          <Text style={styles.taskTime}>{new Date(task.dateTime).toLocaleString()}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.noTaskContainer}>
          <Text style={styles.noTaskText}>No current tasks</Text>
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => navigation.navigate('TaskList')}>
            <Text style={styles.addTaskButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}
      {task && (
        <TouchableOpacity
          style={styles.taskListButton}
          onPress={() => navigation.navigate('TaskList')}>
          <Text style={styles.taskListButtonText}>Go to Task List</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  taskContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  taskTime: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font
  },
  noTaskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTaskText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  addTaskButton: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  addTaskButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  taskListButton: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
  },
  taskListButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
});

export default SingleTaskScreen;
