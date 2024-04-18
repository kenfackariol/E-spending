import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import * as SQlite from 'expo-sqlite';
import SQLite from 'react-native-sqlite-storage';

const db = SQlite.openDatabase({
  name : 'database.db'
});




export default function App() {
  const createTables = () =>
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,'
        + ' name TEXT, email TEXT, phone INTEGER, password TEXT);'),
        [],
        (tx, result) => { 
          console.log("table Created")
        },
        (error) => {
          console.log("Error: ");
        }
      tx.executeSql('CREATE TABLE IS NOT EXISTS revenu (id-rev INTEGER PRIMARY KEY AUTOINCREMENT, montant FLOAT );')
      tx.executeSql('CREATE TABLE IF NOT EXISTS depense (id_dep INTEGER PRIMARY KEY AUTOINCREMENT,'
        + ' Motif TEXT, Montant FLOAT, date DATE);')
      tx.executeSql('CREATE TABLE IF NOT EXISTS notification(id_notif INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT);')
    })
  return (

    <NavigationContainer>
        <StatusBar style='auto' backgroundColor='#fff'/>
        <AppNavigation />
      </NavigationContainer>

  );
}


