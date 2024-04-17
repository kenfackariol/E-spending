import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DashBoard } from '../Screen/DashBoard';
import { Setting } from '../Screen/Setting';
import { SpensingHistory } from '../Screen/Spendinghistory';
import { Notification } from '../Screen/Notification';
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();


export default function AppDrawer() {
  return (
    <NavigationContainer>
    <Drawer.Navigator 
      initialRouteName='DashBoard'
      screenOptions={{
        drawerStyle:{
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle:{
          backgroundColor: "#fff"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeignt: "bold"
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle:{
          color: '#111'
        }
      }}>
      <Drawer.Screen name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          drawerType: 'slide',
          title : "Dashboard",
          drawerIcon: () => (
            <Ionicons name='home-outline' size={20} color={"#808080"}/>
          )
        }

        }
        component={DashBoard} />

        <Drawer.Screen name="history"
        options={{
          drawerLabel: "Spending history",
          drawerType: 'slide',
          title : "Spending history",
          drawerIcon: () => (
            <Ionicons name='cash-outline ' size={20} color={"#808080"}/>
          )
        }

        }
        component={SpensingHistory} />

<Drawer.Screen name="notif"
        options={{
          drawerLabel: "Notification",
          drawerType: 'slide',
          title : "Notification",
          drawerIcon: () => (
            <Ionicons name='receipt-outline ' size={20} color={"#808080"}/>
          )
        }

        }
        component={Notification} />

      <Drawer.Screen name="Setting"
        options={{
          drawerLabel: "Setting",
          drawerType:"slide",
          title : "Setting",
          header: {
            navigator
          },
          drawerIcon: () => (
            <Ionicons name='settings-outline' size={20} color={"#808080"}/>
          )
        }

        }
        component={Setting}/>

    </Drawer.Navigator>
    </NavigationContainer>
 
    
    
  );
}