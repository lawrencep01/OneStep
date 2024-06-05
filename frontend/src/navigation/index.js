import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';

const Stack = createStackNavigator();

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: '#fff', 
      }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStack;