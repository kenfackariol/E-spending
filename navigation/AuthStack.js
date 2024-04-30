
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { SignUp } from '../Screen/SignUp';
import { Home } from '../Screen/Home';
import { DashBoard } from '../Screen/DashBoard';
import { AddExpense } from '../Screen/AddExpense';
import AppDrawer from './AppDrawer';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='ForgotPassword' component={ForgotPass} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen
      name='Home' 
      component={Home} 
      options={{headerShown: false}}/>
      
      <Stack.Screen name='drawer'
        component={AppDrawer} 
        options={{headerShown: false,
        headerLeft: () => null}
      }
      />
      
    </Stack.Navigator>
    
    
  );
};

export default AuthStack;