import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DashBoard } from '../Screen/DashBoard';
import { Setting } from '../Screen/Setting';
import { Notification } from '../Screen/Notification';
import SpendingHistory from '../Screen/SpendingHistory';
import { Home } from '../Screen/Home';
import Ionicons from "@expo/vector-icons/Ionicons";
import { initDB, resetDB } from '../utils/database';
import AuthStack from './AuthStack';
import { useEffect } from 'react';
import { AddExpense } from '../Screen/AddExpense';


const Drawer = createDrawerNavigator();

const initializeDB = async () => {
  try{
    // reset DB
    // let response = await resetDB();
    // console.log(response);

    // init DB
    let res = await initDB();
    console.log(res);
  }
  catch(error){
    console.log(error);
  }
}

const AppDrawer = () => {
  useEffect(() => {
    initializeDB()
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style='auto' backgroundColor='#fff' />
      <Drawer.Navigator
        initialRouteName='Dashboard'
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f4f4f5",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#fff"
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: '900'
          },
          drawerActiveTintColor: "blue",
          drawerLabelStyle: {
            color: '#111'
          }
        }}>
          
        <Drawer.Screen name="Dashboard"
          options={{
            drawerLabel: "Dashboard",
            drawerType: 'slide',
            title: "Dashboard",
            drawerIcon: () => (
              <Ionicons name='home-outline' size={20} color={"#808080"} />
            )
          }}
          component={DashBoard} />

<Drawer.Screen name="addExp"
          options={{
            drawerLabel: "Add expense",
            drawerType: 'slide',
            title: "Add Expense",
            drawerIcon: () => (
              <Ionicons name='add-circle-sharp' size={20} color={"#808080"} />
            )
          }}
          component={AddExpense} />

        <Drawer.Screen name="history"
          options={{
            drawerLabel: "Spending history",
            drawerType: 'slide',
            title: "Spending history",
            drawerIcon: () => (
              <Ionicons name='cash-outline' size={20} color={"#808080"} />
            )
          }}
          component={SpendingHistory} />

        <Drawer.Screen name="notif"
          options={{
            drawerLabel: "Notification",
            drawerType: 'slide',
            title: "Notification",
            drawerIcon: () => (
              <Ionicons name='notifications-outline' size={20} color={"#808080"} />
            )
          }}
          component={Notification} />

        <Drawer.Screen name="Setting"
          options={{
            drawerLabel: "Setting",
            drawerType: "slide",
            title: "Setting",
            drawerIcon: () => (
              <Ionicons name='settings-outline' size={20} color={"#808080"} />
            )
          }}
          component={Setting} />

        <Drawer.Screen 
          name="Auth" component={AuthStack} 
        />
        <Drawer.Screen name="Home"
          options={{
            title: 'Are you Ready?',
          }}
          component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;