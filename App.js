import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style='auto' backgroundColor='#fff' />
      <AppNavigation />
    </NavigationContainer>
  );
}

