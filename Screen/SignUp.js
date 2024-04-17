import react, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { useEffect } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SQlite from 'expo-sqlite';
import { SQLite } from 'expo';

const logo = require("../assets/Mobile-login-Cristina.jpg");

const screenWidth = Dimensions.get('window').width;

export function SignUp() {
  const db = SQlite.openDatabase('myBase.db');
  const [name, setName] = useState("")
  const [verifName, setVerifName] = useState(false)
  const [email, setEmail] = useState("")
  const [verifEmail, setVerifEmail] = useState(false)
  const [phone, setPhone] = useState("")
  const [verifPhone, setVerifPhone] = useState(false)
  const [pass, setPass] = useState("")
  const [verifPass, setVerifPass] = useState(false)
  const [cpass, setCpass] = useState("")
  const [verifCpass, setVerifCpass] = useState(false)

  const createTables = () =>
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,'
        + ' name TEXT, email TEXT, phone INTEGER, password TEXT);')
      tx.executeSql('CREATE TABLE IS NOT EXISTS revenu (id-rev INTEGER PRIMARY KEY AUTOINCREMENT, montant FLOAT );')
      tx.executeSql('CREATE TABLE IF NOT EXISTS depense (id_dep INTEGER PRIMARY KEY AUTOINCREMENT,'
        + ' Motif TEXT, Montant FLOAT, date DATE);')
      tx.executeSql('CREATE TABLE IF NOT EXISTS notification(id_notif INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT);')
    })



  function handleName(e) {

    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setVerifName(false);

    if (nameVar.length > 2) {
      setName(nameVar);
      setVerifName(true);
    }
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setVerifEmail(false);
    if (/^[\w.%+=]+@[\w.=]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setVerifEmail(true);
    }
  }

  function handlePhone(e) {
    const phoneVar = e.nativeEvent.text;
    setPhone(phoneVar);
    setVerifPhone(false)

    if (/[6]{1}[0-9]{8}/.test(phoneVar)) {
      setPhone(phoneVar);
      setVerifPhone(true);
    }
  }

  function handlePass(e) {
    const passVar = e.nativeEvent.text;
    setPass(passVar);
    setVerifPass(false)

    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(passVar) && passVar.length > 1) {
      setPass(passVar);
      setVerifPass(true);
    }
  }

  function handleCpass(e) {
    const cpassVar = e.nativeEvent.text;
    setCpass(cpassVar);
    setVerifCpass(false);

    if (pass == cpassVar && verifPass == true) {
      setCpass(cpass);
      setVerifCpass(true);
    }
  }

  function handleSubmit() {
    if (verifName == true && verifEmail == true && verifPhone == true && verifPass == true && verifCpass == true) {
      const insert = () => {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO user (name, email, phone, password)'
            + ' VALUES (?, ?, ?, ?);')
        })
        return true
      }
    }
  }


  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}
      style={styles.container}>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.formulaire}>
          <View style={{ alignItems: "center" }}>
            <Image source={logo} style={{ width: screenWidth*0.9, height: 250, }} />
          </View>


          <View style={styles.spaceInput}>
            <Ionicons name='person-outline' color={"orange"} size={40} />

            <TextInput style={styles.input}

              onChange={e => handleName(e)}
              /*onChangeText={()} */
              placeholder='Enter your User name' />
            {
              name.length < 1 ? null :
                name.length < 3 ? (<Ionicons name='close-circle-sharp' color={"red"} size={25} />) :
                  verifName ? (
                    <Ionicons name='checkmark-circle' color={"#28B463"} size={25} />)
                    : (<Ionicons name='close-circle-sharp' color={"red"} size={25} />)
            }

          </View>
          {
            name.length < 1 ? null :
              name.length < 3 ? (<Text style={styles.errorText}>username is too short</Text>) :
                verifName ?
                  null
                  : (<Text style={styles.errorText}>User name is required</Text>)
          }
          <View style={styles.spaceInput}>
            <Ionicons name='mail-outline' color={"orange"} size={40} />

            <TextInput style={styles.input}
              placeholder='Enter your e-mail adress'
              keyboardType='email-address'
              autoCapitalize="none"
              onChange={e => handleEmail(e)}
            />
            {
              email.length < 1 ? null :
                verifEmail ? (
                  <Ionicons name='checkmark-circle' color={"#28B463"} size={25} />)
                  : (<Ionicons name='close-circle-sharp' color={"red"} size={25} />)
            }
          </View>
          {
            email.length < 1 ? null :
              verifEmail ? null
                : (<Text style={styles.errorText}>Invalid Email</Text>)
          }


          <View style={styles.spaceInput}>
            <Ionicons name='call-outline' color={"orange"} size={40} />
            <TextInput
              placeholder='Enter your Phone Number'
              style={styles.input}
              onChange={e => handlePhone(e)}
            />
            {
              phone.length < 1 ? null :
                verifPhone ? (
                  <Ionicons name='checkmark-circle' color={"#28B463"} size={25} />)
                  : (<Ionicons name='close-circle-sharp' color={"red"} size={25} />)
            }
          </View>
          {
            phone.length < 1 ? null :
              verifPhone ? null
                : (<Text style={styles.errorText}>Invalid Number</Text>)
          }

          <View style={styles.spaceInput}>
            <Ionicons name='lock-closed-outline' color={"orange"} size={40} />
            <TextInput
              placeholder='Enter your Password'
              style={styles.input}
              secureTextEntry
              onChange={e => handlePass(e)}
            />
            {
              pass.length < 1 ? null :
                verifPass ? (
                  <Ionicons name='checkmark-circle' color={"#28B463"} size={25} />)
                  : (<Ionicons name='close-circle-sharp' color={"red"} size={25} />)
            }
          </View>
          {
            pass.length < 1 ? null :
              verifPass ? null
                : (<Text style={styles.errorText}>Invalid Password</Text>)
          }

          <View style={styles.spaceInput}>
            <Ionicons name='lock-closed' color={"orange"} size={40} />


            <TextInput
              placeholder='Confirm the password'
              style={styles.input}
              secureTextEntry
              onChange={e => handleCpass(e)}
            />
            {
              cpass.length < 1 ? null :
                verifCpass ? (
                  <Ionicons name='checkmark-circle' color={"#28B463"} size={25} />)
                  : (<Ionicons name='close-circle-sharp' color={"red"} size={25} />)
            }

          </View>
          {
            cpass.length < 1 ? null :
              verifCpass ? null
                : (<Text style={styles.errorText}>Password is not comfirm</Text>)
          }


          <TouchableOpacity
            style={[styles.button, styles.alertcolor]}
            onPress={handleSubmit}
          >


            <Text >Submit</Text>
          </TouchableOpacity>



        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'justify',

  },
  formulaire: {
    marginTop: 15,
    backgroundColor: "#fff",
    alignContent: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },

  },
  spaceInput: {
    flex: 0,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "baseline",
  },
  input: {
    width: screenWidth * 0.8,
    borderWidth: 1,
    height: 40,
    borderColor: "orange",
    padding: 10,
    borderRadius: 5
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  alertcolor: {
    backgroundColor: "#82E0AA",
  },
  createColor: {
    backgroundColor: "#EAF2F8",
  },
  errorText: {
    fontSize: 10,
    color: "red",

  }

});

