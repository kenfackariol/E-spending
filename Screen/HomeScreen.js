// In App.js in a new project

import react, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, 
  View,Alert, 
  TextInput, Pressable,
  Image, ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  } from 'react-native';

const index_logo = require("../assets/7849.jpg");

export function HomeScreen({navigation}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

   //validate error message
  const validateForm =  () =>{
    
    let errors = {}

    if (!username) errors.username = "Email is required"
    

    if (!password) errors.password = "Password is required"
  
    setErrors(errors)
    
    return Object.keys(errors).length === 0;

  };
  const handleSubmit = () => {
    if(validateForm()) {
      console.log("Submited", username, password)
      setUsername("");
      setPassword("");
      setErrors({});
    }
  }

  //return to the main app
  return(
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}
      style={[styles.container]}>

      <View style={styles.formulaire}>
      <Text text30><Text style={{fontSize: 43, 
        color: "orange", 
        marginVertical:0, 
        textAlign: "center"}}>
          E</Text>spending<Text style={{fontSize: 43, 
        color: "orange", 
        marginVertical:0, 
        textAlign: "center"}}>!</Text></Text>
      <ScrollView style={styles.formulaire}>
        <ActivityIndicator size = "large" color = "orange" animating={false}/>
       
        <Image source={index_logo} style = {{width: 350, height: 200 }}/>
  
        <TextInput style={styles.input} 
        placeholder='Enter your e-mail'
        onChangeText={setUsername}  
        value={username}
        />
        {
        errors.username ? <Text text30 style={styles.errorText}>
        {errors.username}</Text> : null
        }
        <TextInput  style={styles.input}  
        placeholder='Enter your password' 
        secureTextEntry
        onChangeText = {setPassword}
        value = {password}
        />
        {
        errors.password ? <Text text30 style={styles.errorText}>
        {errors.password}</Text> : null
        }
        <Pressable         onPress={() => navigation.navigate("Forgot Password")}>
        <Text style={{fontSize: 10, color: "grey", 
        marginVertical:10, textAlign: "right"}}>
          Forgot password?</Text>
        </Pressable>
        <Pressable  title='Create account' 
        style = {styles.button} 
        onPress={handleSubmit}>
        <Text >Submit</Text>
        </Pressable>
      

        <Pressable style = {[styles.button, styles.createColor]} 
        title='Create account'
        onPress={() => navigation.navigate("New Account")}>
        <Text> Create Account </Text>
        </Pressable>

      </ScrollView>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'justify',
    paddingTop: StatusBar.currentHeight
  },
  formulaire:{
    marginTop: 0,
    backgroundColor: "white",
    alignContent: "center",
    padding : 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset:{
      width: 0,
      height: 2
    },
  },
  input:{
    borderWidth: 1,
    height: 40,
    borderColor: "orange",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
  button: {
    alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#F4D03F",
        marginVertical: 5,
  },
  alertcolor:{
    backgroundColor: "#F1948A",
  },
  createColor:{
    backgroundColor:"#EAF2F8",
  },
  errorText:{
    fontSize: 10,
color: "red",
marginBottom: 10,
  }

});


