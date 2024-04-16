// In App.js in a new projec
import react, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
  });



export function ForgotPass(){
    

  return(
    <Formik initialValues={{
      email: '',
    }}
    validationSchema={SignupSchema}
    onSubmit={values => Alert.alert('Checking....')}
    >
      {({values, errors, touched,handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <KeyboardAvoidingView behavior='margin'
     keyboardVerticalOffset={10}
     style={styles.container}>
    <ScrollView>
    <View style={styles.formulaire}>
    
    <Text text30> Enter Your Email* </Text>
    <TextInput  style={styles.input} 
    placeholder='Ex: ariolkenfack1@gmail.com' 
    keyboardType='email-address'
    value={values.email}
    onChangeText={handleChange("email")}
    onBlur={() => setFieldTouched('email')}
    />
        {
        touched.email && errors.email && (<Text text30 style={styles.errorText}>
        {errors.email}</Text>)
        }
    <TouchableOpacity title='Create' style ={styles.button}
    color={"lightgreen"}
    onPress={handleSubmit}>
      <Text >Check Account</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView >
     )}
    </Formik>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#f5f5f5',
      justifyContent: 'justify',
    },
    formulaire:{
    marginVertical: 200,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: 'center',
    padding : 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset:{
        width: 0,
        height: 2
      },
    },
    input:{
      borderWidth: 2,
      height: 40,
      borderColor: "orange",
      marginTop: 10,
      marginBottom: 25,
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
  

