import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import  AppNavigation  from './navigation/appNavigation';
import ThemeProvider from '@react-navigation/native';
import { SignIn } from './Screen/SignIn';
import { View } from 'react-native-web';


export default function App() {
  return (
    <View>
    
        <StatusBar backgroundColor='#fff'/>
        <AppNavigation />
      
    
    </View>

  );
}


