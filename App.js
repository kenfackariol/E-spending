import React from 'react';
import 'react-native-gesture-handler';
import AppDrawer from './navigation/AppDrawer';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  return (
    <NavigationContainer>
    <AppDrawer/>
    </NavigationContainer>
  );
}

