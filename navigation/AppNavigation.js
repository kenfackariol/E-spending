import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../Screen/SignUp';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { DashBoard } from '../Screen/DashBoard';

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sing In'>
        <Stack.Screen name='Sign In' component={SignIn}/>
        <Stack.Screen name='Forgot Password' component={ForgotPass}/>
        <Stack.Screen name='Sign Up' component={SignUp}/>
        <Stack.Screen name='Dash' component={DashBoard}/>
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}