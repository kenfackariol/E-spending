import React from 'react';
import 'react-native-gesture-handler';
import AppDrawer from './navigation/AppDrawer';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './contexts/UserContext';
import RootNavigator from './navigation/RootNavigator';


export default function App() {

  return (
    <UserProvider>
      {/* <NavigationContainer>
        <AppDrawer />
      </NavigationContainer> */}
      <RootNavigator />
    </UserProvider>
  );
}

