// In App.js in a new project

import react, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text,
  View, Alert,
  TextInput, 
  Image, ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";


const index_logo = require("../assets/7849.jpg");

const screenWidth = Dimensions.get('window').width;

export function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //validate error message
  const validateForm = () => {

    let errors = {}
    if (!username) errors.username = "Email is required"
    if (!password) errors.password = "Password is required"
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submited", username, password)
      const goToDash = () => {
        navigation.navigate('Home');
      }
      setUsername("");
      setPassword("");
      setErrors({});
      goToDash();
    }
  }


  //return to the main app
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={[styles.container]}>
      <StatusBar backgroundColor='orange' />
  
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.formulaire}>
        <Image source={index_logo} style={{ width: screenWidth * 0.9, marginBottom: 25, height: 200, marginTop: 60 }} />
  
        <View style={styles.formContainer}>
          <View style={styles.spaceInput}>
            <Ionicons name='person' color={"#F5B041"} size={40} />
            <TextInput style={[styles.input, { width: '80%' }]} placeholder='Enter your user name' onChangeText={setUsername} value={username} />
          </View>
          {errors.username ? <Text style={[styles.errorText, { marginBottom: 10 }]}>{errors.username}</Text> : null}
  
          <View style={[styles.spaceInput, { marginTop: 30 }]}>
            <Ionicons name='lock-closed' color={"#F5B041"} size={40} />
            <TextInput style={[styles.input, { width: '80%' }]} placeholder='Enter your password' secureTextEntry onChangeText={setPassword} value={password} />
          </View>
          {errors.password ? <Text style={[styles.errorText, { marginBottom: 10 }]}>{errors.password}</Text> : null}
  
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={{ fontSize: 10, color: "grey", marginVertical: 10, textAlign: "right" }}>Forgot password?</Text>
          </TouchableOpacity>
  
          <View style={[styles.spaceInput, { justifyContent: 'space-between' }]}>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => navigation.navigate("SignUp")}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  
      <View style={[styles.spaceInput, { alignItems: "center", marginTop: 20 }]}>
        <Text style={{ fontStyle: "italic" }}>Designed By @riol</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulaire: {
    marginTop: 0,

    backgroundColor: "#FFF",
    alignContent: "center",
    borderRadius: 10,

  },
  input: {
    borderWidth: 1,
    height: 40,
    borderColor: "orange",
    width: 340,
    padding: 10,
    shadowColor: 'black',
    borderRadius: 5
  },
  spaceInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: 'space-around',
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#F5B041",
    marginRight: 10,
  },
  createButton: {
    backgroundColor: "#EAF2F8",
  },
  alertcolor: {
    backgroundColor: "#F1948A",
  },
  createColor: {
    backgroundColor: "#EAF2F8",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  }

});


