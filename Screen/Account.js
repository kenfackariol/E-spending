import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity, Dimensions
} from 'react-native';
import { getUser, updateUser } from "../api/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB } from 'react-native-paper';
import { UserContext } from "../contexts/UserContext";

const screenWidth = Dimensions.get('window').width;

export function Account({ navigation }) {
    const { user, logout } = useContext(UserContext);
    const [toupdateUser, setUser] = useState(user);
    const [pass, setPass] = useState("");
    const [verifPass, setVerifPass] = useState(false);
    const [cpass, setCpass] = useState("");
    const [verifCpass, setVerifCpass] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [vOldPass, setVoldPass] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        setUser(user);
    }, [user]);

    function handlename(e) {
        const newobj = { ...toupdateUser };
        newobj.nom = e;
        setUser(newobj);
    }

    function handlenumero(e) {
        const newobj = { ...toupdateUser };
        newobj.numero = e;
        setUser(newobj);
    }

    function handlePass(e) {
        const passVar = e.nativeEvent.text;
        setPass(passVar);
        setVerifPass(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(passVar));
    }

    function handleCpass(e) {
        const cpassVar = e.nativeEvent.text;
        setCpass(cpassVar);
        setVerifCpass(cpassVar === pass && verifPass);
    }

    function handleAncienMdp(e) {
        const oldPassInput = e.nativeEvent.text;
        setOldPass(oldPassInput);
        setVoldPass(oldPassInput === user.mot_de_passe);
    }

    function handleUpdate() {
        if (/[6]{1}[0-9]{8}/.test(toupdateUser.numero) && toupdateUser.nom !== "" && verifCpass) {
            updateUser(toupdateUser.id, toupdateUser.nom, toupdateUser.email, toupdateUser.numero, pass)
                .then(userUp => {
                    console.log("User updated successfully");
                    setUpdate(false);
                    setVoldPass(false);
                    setVerifCpass(false);
                    setVerifPass(false);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            Alert.alert("Une information n'a pas été bien renseignée");
        }
    }
   

    if (!user || Object.keys(user).length === 0) {
        return (
            <View style={styles.message}>
                <Text style={styles.text}>You are now logged out.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.button}>Log in</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FAB
                icon={({ size, color }) => (
                    <Ionicons name="log-out-sharp" size={size} color={color} />
                )}
                onPress={logout}
                style={styles.fabLogOut}
            />
            <View style={styles.arealetter}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
                    {user.nom.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text style={styles.text}>{user.email}</Text>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text>User name</Text>
                    <TextInput
                        style={styles.input}
                        value={toupdateUser.nom}
                        onChangeText={handlename}
                        editable={update}
                    />
                    <Text style={{ marginTop: 10 }}>Number</Text>
                    <TextInput
                        style={styles.input}
                        value={toupdateUser.numero + ""}
                        onChangeText={handlenumero}
                        editable={update}
                    />

                    {update ? (
                        <View>
                            <Text style={{ marginTop: 10 }}>Ancien Mot de passe</Text>
                            <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between" }]}>
                                <TextInput
                                    style={{ width: 280 }}
                                    value={oldPass}
                                    onChangeText={setOldPass}
                                    onEndEditing={(e) => handleAncienMdp(e)}
                                    secureTextEntry
                                    editable={update}
                                />
                                {oldPass.length < 1 ? null : (
                                    vOldPass ? (
                                        <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />
                                    ) : (
                                        <Ionicons name='close-circle-sharp' color={"red"} size={20} />
                                    )
                                )}
                            </View>

                            <Text style={{ marginTop: 10 }}>Nouveau Mot de passe</Text>
                            <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between" }]}>
                                <TextInput
                                    style={{ width: 280 }}
                                    value={pass}
                                    onChange={(e) => handlePass(e)}
                                    secureTextEntry
                                    editable={vOldPass}
                                />
                                {pass.length < 1 ? null : (
                                    verifPass ? (
                                        <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />
                                    ) : (
                                        <Ionicons name='close-circle-sharp' color={"red"} size={20} />
                                    )
                                )}
                            </View>

                            <Text style={{ marginTop: 10 }}>Confirmer</Text>
                            <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between" }]}>
                                <TextInput
                                    style={{ width: 280 }}
                                    value={cpass}
                                    onChange={(e) => handleCpass(e)}
                                    secureTextEntry
                                    editable={verifPass}
                                />
                                {cpass.length < 1 ? null : (
                                    verifCpass ? (
                                        <Ionicons name='checkmark-circle' color={"#28B463"} size={15} />
                                    ) : (
                                        <Ionicons name='close-circle-sharp' color={"red"} size={20} />
                                    )
                                )}
                            </View>

                            <View style={styles.spaceInput}>
                                <TouchableOpacity
                                    onPress={handleUpdate}
                                    style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.374, padding: 10, borderRadius: 10 }}
                                >
                                    <Text style={{ color: "white", textAlign: "center" }}>Valider</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setUpdate(false);
                                        setVerifCpass(false);
                                        setVoldPass(false);
                                        setVerifPass(false);
                                    }}
                                    style={{ backgroundColor: '#F1948A', width: screenWidth * 0.373, padding: 10, marginLeft: 15, borderRadius: 10 }}
                                >
                                    <Text style={{ color: "white", textAlign: "center" }}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={{ flexDirection: "row", marginBottom: 15 }}>
                            <TouchableOpacity
                                onPress={() => setUpdate(true)}
                                style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.79, padding: 10, borderRadius: 10 }}
                            >
                                <Text style={{ color: "white", textAlign: "center" }}>Modifier</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={() => console.log('pressed')}
                style={[styles.fab, {}]}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: "center",
        paddingTop:40
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
        marginTop: 50,
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
    },
    message: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f8', // Light background color
        borderRadius: 10,
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        margin: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: '#4CAF50', // Green color for the button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        textAlign: 'center',
        overflow: 'hidden',
    },
}
)