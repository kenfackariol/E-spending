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


const AppDrawer = () => {

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
            <Ionicons name='add-circle-outline' size={20} color={"#808080"} />
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

      <Drawer.Screen name="Account"
        options={{
          drawerLabel: "Account",
          drawerType: 'slide',
          title: "Account",
          drawerIcon: () => (
            <Ionicons name='person-outline' size={20} color={"#808080"} />
          )
        }}
        component={Account} />

<Drawer.Screen name="budget"
        options={{
          drawerLabel: "Budget",
          drawerType: 'slide',
          title: "Budget",
          drawerIcon: () => (
            <Ionicons name='wallet-outline' size={20} color={"#808080"} />
          )
        }}
        component={Budget} />
    </Drawer.Navigator>

  );
};

export default AppDrawer;