import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../Screen/SignUp';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { DashBoard } from '../Screen/DashBoard';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    
      <Stack.Navigator initialRouteName='Sign In'>
        <Stack.Screen name='Sign In' component={SignIn}/>
        <Stack.Screen name='Forgot Password' component={ForgotPass}/>
        <Stack.Screen name='Sign Up' component={SignUp}/>
        <Stack.Screen name='Dash' component={DashBoard}/>
        
      </Stack.Navigator>

  );
}