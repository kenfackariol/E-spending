import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DashBoard } from '../Screen/DashBoard';
import { Setting } from '../Screen/Setting';
import { Notification } from '../Screen/Notification';
import SpendingHistory from '../Screen/SpendingHistory';
import { Account } from '../Screen/Account';
import { Home } from '../Screen/Home';
import Ionicons from "@expo/vector-icons/Ionicons";
import { initDB, resetDB } from '../utils/database';
import AuthStack from './AuthStack';
import { useEffect, useState } from 'react';
import { AddExpense } from '../Screen/AddExpense';
import { AddBudget } from '../Screen/AddBudget';
import { View, SafeAreaView } from 'react-native';
import DrawerHeader from "../Screen/DrawerHeader";
import { initCategories } from '../utils/categories_seed';
import { getCategories } from '../utils/database';
import { Budget } from '../Screen/Budget';


//import { dropTable } from '../utils/database';

const Drawer = createDrawerNavigator();

const initializeDB = async () => {
  try {
    // reset DB
    // let response = await resetDB();
    // console.log(response);

    // init DB
    let res = await initDB();
    console.log(res);

    //init categories
    //let int = await initCategories();
    //console.log(int);
    let cats = await getCategories();

  }
  catch (error) {
    console.log(error);
  }
}


const AppDrawer = () => {
  useEffect(() => {
    initializeDB()
  }, []);

  return (


    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <DrawerHeader />
            <DrawerItemList {...props} />
          </SafeAreaView>
        )

      }}
      initialRouteName='Dashboard'
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f4f4f5",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerTintColor: "#154360",
        headerTitleStyle: {
          fontWeight: '900'
        },
        drawerActiveTintColor: "#154360",
        drawerLabelStyle: {
          color: '#111'
        }
      }}>

      <Drawer.Screen name="Dashboard"
        options={{
          drawerLabel: "Acceuil",
          drawerType: 'slide',
          title: "Tableau de Bord",
          drawerIcon: () => (
            <Ionicons name='home-outline' size={20} color={"#808080"} />
          )
        }}
        component={DashBoard} />

      <Drawer.Screen name="addExp"
        options={{
          drawerLabel: "Ajout de depense",
          drawerType: 'slide',
          title: "Nouvelle depense",
          drawerIcon: () => (
            <Ionicons name='add-circle-outline' size={20} color={"#808080"} />
          )
        }}
        component={AddExpense} />

      <Drawer.Screen name="history"
        options={{
          drawerLabel: "historique",
          drawerType: 'slide',
          title: "historique des depenses",
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


      <Drawer.Screen name="Account"
        options={{
          drawerLabel: "Paramètre",
          drawerType: 'slide',
          title: "Paramètre",
          drawerIcon: () => (
            <Ionicons name='settings-outline' size={20} color={"#808080"} />
          )
        }}
        component={Account} />

<Drawer.Screen name="budget"
        options={{
          drawerLabel: "Budgets",
          drawerType: 'slide',
          title: "Budget(s)",
          drawerIcon: () => (
            <Ionicons name='wallet-outline' size={20} color={"#808080"} />
          )
        }}
        component={Budget} />





    </Drawer.Navigator>

  );
};

export default AppDrawer;