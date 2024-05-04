import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity, Dimensions
} from 'react-native';
import { getUser, updateUser } from "../utils/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB } from 'react-native-paper';


const screenWidth = Dimensions.get('window').width;

export function Account() {
    const [user, setUser] = useState({})
    const [letter, setLetter] = useState({})
    const [l, setL] = useState("")
    const [update, setUpdate] = useState(false)
    const [pass, setPass] = useState("")
    const [verifPass, setVerifPass] = useState(false)
    const [cpass, setCpass] = useState("")
    const [verifCpass, setVerifCpass] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [vOldPass, setVoldPass] = useState(false)

    function handlename(e) {
        //const catVar = e.nativeEvent.text;
        //exp.categorie = catVar
        //destitution de l'objet exp de la depense
        const newobj = { ...user }
        newobj.nom = e
        setUser(newobj)
    }

    function handlenumero(e) {
        //const catVar = e.nativeEvent.text;
        //exp.categorie = catVar
        //destitution de l'objet exp de la depense
        const newobj = { ...user }
        newobj.numero = e
        setUser(newobj)
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


    function handleAncienMdp(e) {
        //const catVar = e.nativeEvent.text;
        //exp.categorie = catVar
        //destitution de l'objet exp de la depense
        console.log(e);
        const newobj = { ...user }
        setOldPass(e)
        if (user.mot_de_passe == e) {
            newobj.mot_de_passe = e
            setUser(newobj)
            setVoldPass(true)
        }
        else setVoldPass(false)
    }



    function userGet() {
        getUser(1)
            .then(user => {
                console.log(user)
                setLetter(user)
                setUser(user)
                setL(user.nom.charAt(0).toUpperCase())
                console.log(user.nom.charAt(0).toUpperCase())
            })
            .catch(error => {
                console.error(error);
            })
    }

    function handleUpdate(){
        if(/[6]{1}[0-9]{8}/.test(user.numero) && user.nom != "" && verifCpass){
            updateUser(user.id, user.nom, user.email, user.numero, pass)
            .then(userUp => {
                userGet()
                console.log("user updated succesfully")
                setUpdate(false)
                setVoldPass(false)
                setVerifCpass(false)
                setVerifPass(false)
            })
            .catch(error => {
                console.error(error);
            })
        }
        else Alert.alert("Une information n'as pas ete bien renseigné")
    }
    useEffect(() => {
        userGet();
        console.log(user)
    }, []);


    return (

        <View style={styles.contener}>
              <FAB
        icon={({ size, color }) => (
            <Ionicons name="log-out-sharp" size={size} color={color} />
          )}
        onPress={() =>
          setModalVisible(true)
        }
        style={styles.fabLogOut}
      />
            <View
                style={styles.arealetter}
            >
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>{l}</Text>
            </View>
            <Text style={styles.text}>{letter.email}</Text>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}
                style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ marginTop: 30 }}>Nom d'utilisateur</Text>
                    <TextInput
                        style={styles.input}
                        value={user.nom}
                        onChangeText={handlename}
                        editable={update}
                    />
                    <Text style={{ marginTop: 10 }}>Numero</Text>
                    <TextInput
                        style={styles.input}
                        value={user.numero + ""}

                        editable={update}
                    />

                    {
                        update == true ? (
                            <View >
                                <Text style={{ marginTop: 10 }}>Ancien Mot de passe</Text>
                                <View style={[styles.input, {flexDirection: "row", justifyContent: "space-between"}]}>
                                <TextInput
                                    
                                    style={{width: 280}}
                                    onChangeText={handleAncienMdp}
                                    editable={update}
                                />
                                {
                                    oldPass < 1? null :
                                        vOldPass? (
                                            <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />)
                                            : (<Ionicons name='close-circle-sharp' color={"red"} size={20} />)
                                }
                                </View>

                                <Text style={{ marginTop: 10 }}>Nouveau Mot de passe</Text>
                                <View style={[styles.input, {flexDirection: "row", justifyContent: "space-between"}]}>
                                <TextInput
                                    
                                    style={{width: 280}}
                                    onChange={handlePass}
                                    editable={vOldPass}
                                />
                                {
                                    pass < 1? null :
                                        verifPass? (
                                            <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />)
                                            : (<Ionicons name='close-circle-sharp' color={"red"} size={20} />)
                                }
                                </View>
                                <Text style={{ marginTop: 10 }}>Confirmer</Text>
                                <View style={[styles.input, {flexDirection: "row", justifyContent: "space-between"}]}>
                                <TextInput
                                    
                                    style={{width: 280}}
                                    onChange={handleCpass}
                                    editable={verifPass}
                                />
                                {
                                    cpass < 1? null :
                                        verifCpass? (
                                            <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />)
                                            : (<Ionicons name='close-circle-sharp' color={"red"} size={20} />)
                                }
                                </View>
                               
                               
                                
                                <View
                                    style={styles.spaceInput}
                                >
                                    <TouchableOpacity onPress={handleUpdate}
                                        style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.374, padding: 10, borderRadius: 10 }}>
                                        <Text style={{ color: "white", textAlign: "center" }}>Valider</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { setUpdate(false)
                                    setVerifCpass(false)
                                    setVoldPass(false)
                                    setVerifPass(false) }}
                                        style={{ backgroundColor: '#F1948A', width: screenWidth * 0.373, padding: 10, marginLeft: 15, borderRadius: 10 }}>
                                        <Text style={{ color: "white", textAlign: "center" }}>Annuler</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        ) : (
                            <View
                                style={{ flexDirection: "row", marginBottom: 15 }}
                            >
                                <TouchableOpacity onPress={() => { setUpdate(true) }}
                                    style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.79, padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: "white", textAlign: "center" }}>Modifier</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                

                   
                </ScrollView>
                
            </KeyboardAvoidingView>
          
       <TouchableOpacity onPress={() => console.log('pressed')}
        style={[styles.fab, {}]}
       >  
                    <Text text30>Delete Account</Text> 
                    </TouchableOpacity>

        </View>
        
    )
}
const styles = StyleSheet.create({
    contener: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: screenWidth * 0.785,
        borderWidth: 1,
        height: 40,
        borderColor: "orange",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    arealetter: {
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 49,
        backgroundColor: '#808B96',
        height: 80,
        width: 80,
        marginTop: 150,
        marginBottom: 10,
    },
    spaceInput: {
        flex: 0,
        marginTop: 25,
        flexDirection: "row",
        alignItems: "baseline",
      },
      fab: {
        backgroundColor: '#CF5151',
        position: 'absolute',
        bottom: 30,
        right: 0,
         padding: 10,
          borderWidth: 4,
           borderColor: "red"
      },
      fabLogOut: {
        backgroundColor: '#D45151',
        position: 'absolute',
       right: 1,
        top: 0,
      }
}
)