import react, {useState} from 'react';
import { View,
    Text, 
    StyleSheet, 
    TextInput, 
    KeyboardAvoidingView, 
    ScrollView,
    Pressable,

} from 'react-native';

export function Account(){
    const [name, setName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [errors, setErrors] = useState({});

    const validate = () =>{
        let errors = {}
      
        if (!name) errors.name = "Last name is required"
        else if (name.valueOf.length < 3 ) errors.name = "Short last name"
        
        if (!firstname) errors.firstname = "First name is required"
        else if(firstname.valueOf.length < 3) errors.firstname = "Short firstname"

        if (!phone) errors.phone = "Phone Number is required"
        else if(phone.valueOf.length < 9 || phone.length > 12) errors.phone = "Invalid phone number"
        
        if (!mail) errors.mail = "Email is required"
        else{
          
        }
        if (!password) errors.password = "Password is required"
        if (!cpassword) errors.cpassword = "Please confirm your paswword"
       
        setErrors(errors)
         
        return Object.keys(errors).length === 0;
      
      };
      const handleCreate = () => {
        if(validate()) {
          console.log("Submited", name, mail)
          setName("");
          setFirstName("");
          setPhone("")
          setMail("")
          setPassword("")
          setCpassword("")
          setErrors({});
        }
      }
  return(
    
       <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10}
       style={styles.container}> 
       <Text text30 
       style={{textAlign: "center", marginBottom: 20, fontSize: 35}}
       >Welcome, {name}</Text>
        <View style={styles.formulaire}>
        
        <ScrollView>
        
        <Text text30>Your first name*:</Text>
        <TextInput  style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
        placeholder='Ex: Ariol'
        value={firstname}
        onChangeText={setFirstName}
        />
        {
        errors.firstname ? <Text text30 style={styles.errorText}>
        {errors.firstname}</Text> : null
        }
        <Text text30>Your last name*:</Text>
        <TextInput  style={styles.input} value={name} onChangeText={setName} placeholder='Ex KENFACK' />
        {
        errors.name ? <Text text30 style={styles.errorText}>
        {errors.name}</Text> : null
        }
        <Text text30>Your Phone Number*:</Text>
        <TextInput  style={styles.input}
        keyboardType='numeric'
        value={phone}
        onChangeText={setPhone}
        />
        {
        errors.phone ? <Text text30 style={styles.errorText}>
        {errors.phone}</Text> : null
        }
        <Text text30>Your Email*:</Text>
        <TextInput  style={styles.input} 
        placeholder='Ex: ariolkenfack1@gmail.com' 
        keyboardType='email-address'
        value={mail}
        onChangeText={setMail}
        />
        {
        errors.mail ? <Text text30 style={styles.errorText}>
        {errors.mail}</Text> : null
        }
        <Text text30 style={{textAlign:"justify"}}>Your password*:</Text>
        <TextInput 
        style={styles.input}
         secureTextEntry
         value={password}
        onChangeText={setPassword}
        />
        {
        errors.password ? <Text text30 style={styles.errorText}>
        {errors.password}</Text> : null
        }
        <Text text30 style={{textAlign:"justify"}}>Confirm password*:</Text>
        <TextInput 
        style={styles.input}
         secureTextEntry
         value={cpassword}
        onChangeText={setCpassword}
        />
        {
        errors.cpassword ? <Text text30 style={styles.errorText}>
        {errors.cpassword}</Text> : null
        }
        <Pressable title='Create' style ={styles.button}
        color={"lightgreen"}
        onPress={handleCreate}>
          <Text >Create</Text>
          </Pressable>
      
        
        </ScrollView>
       </View>
       </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: 'center',
  
  },
  formulaire:{
    marginBottom: 100,
    backgroundColor: "#f5f5f5",
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
    marginBottom: 10,
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

