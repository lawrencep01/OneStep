import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Back to Login" component={LoginScreen} />
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