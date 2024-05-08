// In App.js in a new project

import react, { useContext, useState } from 'react';
import { useEffect } from 'react';
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
import { checkUser } from '../utils/database';
import { UserContext } from '../contexts/UserContext';
//import { initDB } from '../utils/database';




const index_logo = require("../assets/7849.jpg");

const screenWidth = Dimensions.get('window').width;

 // initialize database
 /*useEffect(() => {
  initDB()
      .then(() => {
          console.log('Database initialized');
      })
      .catch((error) => {
          console.error('Error initializing database:', error);
      })
}, []);*/


export function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, user } = useContext(UserContext);

  //validate error message
  const validateForm = () => {

    let errors = {}
    if (!username) errors.username = "User name is required"
    if (!password) errors.password = "Password is required"
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoggingIn(true)
      checkUser(username, password)
  .then(user => {
    if (user) {
      // L'utilisateur existe, vous pouvez accéder à ses données
      console.log('Utilisateur trouvé :', user);
      setUsername("");
      setPassword("");
      setErrors({});
      // save the user in the context
      login(user);
      setIsLoggingIn(false)
    } else {
      // L'utilisateur n'existe pas
      console.log('Utilisateur non trouvé');
      Alert.alert("nom ou password \nIncorrect")
      setPassword("")
    }
  })
  .catch(error => {
    // Une erreur s'est produite lors de la vérification de l'utilisateur
    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
  });
      
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
      {isLoggingIn && (
          <View style={styles.backdrop}>
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorText}>Logging in progress...</Text>
              <ActivityIndicator animating={isLoggingIn} size="large" color="#0000ff" />
            </View>
          </View>
        )}
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
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', // Center the content horizontally
    shadowColor: '#000000', // Shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Better color contrast
    marginBottom: 10,
  },

});


