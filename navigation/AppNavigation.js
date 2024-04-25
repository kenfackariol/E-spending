import { useEffect } from 'react';

import { SignUp } from '../Screen/SignUp';
import { SignIn } from '../Screen/SignIn';
import { ForgotPass } from '../Screen/ForgotPass';
import { DashBoard } from '../Screen/DashBoard';
import { Home } from '../Screen/Home';
import { AddExpense } from '../Screen/AddExpense';
import { initDB } from '../utils/database';
import { createStackNavigator } from '@react-navigation/stack';




//import { dropTable } from '../utils/database';

/*import { SuppTable } from '../utils/database';*/



const Stack = createStackNavigator();

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
  //gerer la vitesse de transition
  
  return (
    
      <Stack.Navigator initialRouteName='SignIn'
        
      >
        
        <Stack.Screen 
        name='SignIn' 
        options={{
          title: "Login",

        }}
        component={SignIn}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPass}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Dash'
         component={DashBoard}
         options={{
          title: 'DashBoard',
          headerLeft: null,
          
          
        }}
         />
        <Stack.Screen name='Home'
        options={{
          title: 'Are you Ready?',
          headerLeft : null,
          
          
          
        }}
        component={Home}/>

<Stack.Screen name='addExp'
        options={{
          title: 'New Expense',
          headerLeft : null,
         
        }}
        component={AddExpense}/>
      </Stack.Navigator>

  );
}