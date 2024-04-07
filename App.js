
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './Screen/HomeScreen';
import { Account } from './Screen/Account';
import { ForgotPass } from './Screen/ForgotPass';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='E-spending!'>
        <Stack.Screen name='Connection' component={HomeScreen}/>
        <Stack.Screen name='Forgot Password' component={ForgotPass}/>
        <Stack.Screen name='New Account' component={Account}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}


