import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Modal,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TaskItem from "../components/TaskItem";
import { auth, database } from "../../../firebase";
import { ref, set, push, onValue } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TaskScreen = () => {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userTaskRef = ref(database, `tasks/${user.uid}`);
        onValue(userTaskRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const tasks = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setTaskItems(tasks);
          } else {
            setTaskItems([]);
          }
        });
      } else {
        setUser(null);
        setTaskItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert("Error", "Task cannot be empty");
      return;
    }
    Keyboard.dismiss();
    const newTaskRef = push(ref(database, "tasks/" + user.uid));
    set(newTaskRef, {
      text: task,
      completed: false,
      dateTime: date.toISOString(),
    });
    setTask("");
    setDate(new Date());
    setShowModal(false);
  };

  const completeTask = (taskId) => {
    const taskRef = ref(database, "tasks/" + user.uid + "/" + taskId);
    const taskIndex = taskItems.findIndex((task) => task.id === taskId);
    if (taskIndex >= 0) {
      const updatedTask = {
        ...taskItems[taskIndex],
        completed: !taskItems[taskIndex].completed,
      };
      set(taskRef, updatedTask);
    }
  };

  const deleteTask = (taskId) => {
    const taskRef = ref(database, "tasks/" + user.uid + "/" + taskId);
    set(taskRef, null);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <View style={styles.items}>
          <SwipeListView
            data={taskItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => completeTask(item.id)}
              >
                <TaskItem
                  text={item.text}
                  completed={item.completed}
                  dateTime={item.dateTime}
                />
              </TouchableOpacity>
            )}
            renderHiddenItem={({ item }) => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
            rightOpenValue={-75}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={styles.dateWrapper}>
            <FontAwesome name="calendar" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Ionicons name="close" size={30} color="grey" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Select Date and Time</Text>
            <DateTimePicker
              value={date}
              mode={"datetime"}
              display="default"
              onChange={onDateChange}
            />
            <TouchableOpacity
              style={[styles.saveButton, { width: "80%" }]}
              onPress={handleAddTask}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  items: {
    flex: 1,
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 200,
    color: "black",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "black",
  },
  dateWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  dateText: {
    color: "black",
    fontSize: 25,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 353,
    height: 53,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
    paddingRight: 20,
  },
  deleteText: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 5,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskScreen;