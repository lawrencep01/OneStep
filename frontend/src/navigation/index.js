import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import SingletaskScreen from '../screens/SingletaskScreen';
import ForgotPass from '../screens/ForgotPass'

const Stack = createStackNavigator();

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerShown: false

          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="TaskList"
          component={TaskScreen}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitle: '',
            headerBackTitle: 'Back to Home',
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPass}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SingleTask"
          component={SingletaskScreen}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitle: 'One Step',
            headerBackTitle: ' ',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStack;