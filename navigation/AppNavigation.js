import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../Screen/SignUp';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { DashBoard } from '../Screen/DashBoard';
import { Home } from '../Screen/Home';
import { initDB } from '../utils/database';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  // Initialize the database
  useEffect(() => {
    initDB()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  })

  return (
    
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen 
        name='SignIn' 
        options={{
          title: "Login",
          
        }}
        component={SignIn}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPass}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Dash'
         component={DashBoard}/>
        <Stack.Screen name='Home'
        
        options={{
          title: 'Are you Ready?',
        }}
        component={Home}/>
      </Stack.Navigator>

  );
}