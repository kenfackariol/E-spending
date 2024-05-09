import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getUser } from '../utils/database';

const DrawerHeader = () => {
  const [letter, setLetter] = useState({email:""})
  const [l, setL] = useState("")
  function userGet(){
    getUser(1)
    .then(user  => {
      console.log(user)
      if(user){
        setLetter(user)
        setL(user.nom.charAt(0).toUpperCase())
        console.log(user.nom.charAt(0).toUpperCase())
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    userGet();
    }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={userGet}>
      <View
        source={require('../assets/19199299.jpg')}
        style={styles.arealetter}
      >
        <Text style={{fontSize: 40, fontWeight:"bold", color: "white"}}>{l}</Text>
      </View>
      </TouchableOpacity>
      <Text style={styles.text}>{letter.email}</Text>
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