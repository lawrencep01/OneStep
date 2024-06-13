import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  Platform,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import TaskItem from '../components/TaskItem';
import { auth, database } from '../../../firebase';
import { ref, set, push, onValue } from 'firebase/database';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

const TaskScreen = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
          const tasks = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
          setTaskItems(tasks);
        });
      } else {
        setUser(null);
        setTaskItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    Keyboard.dismiss();
    const newTaskRef = push(ref(database, `tasks/${user.uid}`));
    set(newTaskRef, {
      text: task,
      completed: false,
      dateTime: date.toISOString(),
    });
    setTask('');
    setDate(new Date());
    setShowModal(false);
  };

  const completeTask = (taskId) => {
    const taskRef = ref(database, `tasks/${user.uid}/${taskId}`);
    const taskIndex = taskItems.findIndex((task) => task.id === taskId);
    if (taskIndex >= 0) {
      const updatedTask = { ...taskItems[taskIndex], completed: !taskItems[taskIndex].completed };
      set(taskRef, updatedTask);
    }
  };

  const deleteTask = (taskId) => {
    const taskRef = ref(database, `tasks/${user.uid}/${taskId}`);
    set(taskRef, null);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const showDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onDateChange,
        mode: 'date',
        display: 'default',
      });
    } else {
      setShowPicker(true);
    }
  };

  const showTimePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onDateChange,
        mode: 'time',
        display: 'default',
      });
    } else {
      setShowPicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <View style={styles.items}>
          <SwipeListView
            data={taskItems}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                key={item.id}
                onPress={() => completeTask(item.id)}
                style={styles.rowFront}>
                <TaskItem text={item.text} completed={item.completed} dateTime={item.dateTime} />
              </TouchableHighlight>
            )}
            renderHiddenItem={({ item }) => (
              <View style={styles.rowBack}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
            disableRightSwipe
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
        keyboardVerticalOffset={110}>
        <ScrollView style={styles.inputScrollView}>
          <TextInput
            style={styles.input}
            placeholder="Write a task"
            value={task}
            onChangeText={setTask}
            multiline
            placeholderTextColor="#A9A9A9" // Set custom placeholder text color
          />
        </ScrollView>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={styles.dateWrapper}>
            <FontAwesome name="calendar" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={30} color="grey" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Select Date and Time</Text>
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={onDateChange}
              />
            )}
            {Platform.OS === 'android' && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={showDatePicker}>
                  <Ionicons name="calendar-clear-sharp" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={showTimePicker}>
                  <Ionicons name="time-sharp" size={30} color="black" />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={[styles.saveButton, { width: '80%' }]} onPress={handleAddTask}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showPicker && Platform.OS === 'ios' && (
        <DateTimePicker value={date} mode="datetime" display="default" onChange={onDateChange} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  items: {
    flex: 1,
    marginTop: 20,
  },
  rowFront: {
    backgroundColor: '#FFF',
    marginVertical: 15,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  rowBack: {
    backgroundColor: 'black',
    marginVertical: 15,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  deleteButton: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    paddingRight: 16,
    paddingLeft: 20,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  inputScrollView: {
    flex: 1,
    maxHeight: 100,
    width: '100%',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: 'black',
    fontFamily: 'Roboto_400Regular', // Apply Roboto regular font
    marginRight: 10,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: 'black',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  dateWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 10,
  },
  dateText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 5,
  },
  saveButton: {
    marginTop: 15,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold', // Apply Roboto bold font
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconButton: {
    backgroundColor: '#eeeeee',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default TaskScreen;
