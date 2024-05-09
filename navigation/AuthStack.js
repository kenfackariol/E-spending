
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { SignUp } from '../Screen/SignUp';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='ForgotPassword' component={ForgotPass} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
    
    
  );
};

export default AuthStack;