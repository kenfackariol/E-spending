import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DashBoard } from './DashBoard';
import { Setting } from './Setting';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    
    <Drawer.Navigator initialRouteName='DashBoard'>
      <Drawer.Screen name="Dashboard" component={DashBoard} />
      <Drawer.Screen name="Setting"  component={Setting}/>
    </Drawer.Navigator>
    
  );
}