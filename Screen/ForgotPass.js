// In App.js in a new project
import react, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, KeyboardAvoidingView } from 'react-native';


export function ForgotPass(){
    const [mail, setMail] = useState("")
    const [errors, setErrors] = useState({})

    const verify = () =>{
        let errors = {}
        
        if (!mail) errors.mail = "Please Enter a Email"

        setErrors(errors)
        return Object.keys(errors).length === 0;
      
      };
      const handleCheck = () =>{
        
        if (verify()){
            console.log("checking....")
            setMail("")
            setErrors({})
        } 
      
      };

  return(
    <KeyboardAvoidingView behavior='margin'
     keyboardVerticalOffset={10}
     style={styles.container}>
    <ScrollView>
    <View style={styles.formulaire}>
    
    <Text text30> Enter Your Email* </Text>
    <TextInput  style={styles.input} 
    placeholder='Ex: ariolkenfack1@gmail.com' 
    keyboardType='email-address'
    value={mail}
    onChange={setMail}
    />
    {
        errors.mail ?<Text style={styles.errorText}>{errors.mail}</Text>: null
    }

    <Pressable title='Create' style ={styles.button}
    color={"lightgreen"}
    onPress={handleCheck}>
      <Text >Check Account</Text>
      </Pressable>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView >
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
  

