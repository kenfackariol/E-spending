import React from 'react';
import 'react-native-gesture-handler';
import AppDrawer from './navigation/AppDrawer';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';


export default function App() {

  return (
    <NavigationContainer>
    <AppDrawer/>
    </NavigationContainer>
  );
}

