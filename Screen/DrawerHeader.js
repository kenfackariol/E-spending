import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getUser } from '../api/api';
import { UserContext } from "../contexts/UserContext";

const DrawerHeader = () => {
  const [letter, setLetter] = useState({email:""})
  const [l, setL] = useState("")
  const {user} = useContext(UserContext);


  useEffect(() => {
    
    console.log(user)
    }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity >
      <View
        source={require('../assets/19199299.jpg')}
        style={styles.arealetter}
      >
        <Text style={{fontSize: 40, fontWeight:"bold", color: "white"}}>{user.nom.charAt(0).toUpperCase()}</Text>
      </View>
      </TouchableOpacity>
      <Text style={styles.text}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  arealetter: {
    alignItems:'center',
    justifyContent: "center",
    borderRadius: 49,
    backgroundColor: '#808B96',
    height: 80,
    width: 80,
    marginBottom: 10,
    
    
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default DrawerHeader;