import React, {useState} from "react";
import { StyleSheet, Text, 
    View,Alert, 
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    } from 'react-native';

export function DashBoard({navigation}){
    return(
        <View style={Mystyle.contener}>
        <Text>DashBoard</Text>
        <TouchableOpacity style={Mystyle.press}
        onPress={() => navigation.navigate("Auth", {screen: "SignIn"})}
        >
            <Text text30>Log Out</Text>
        </TouchableOpacity>
        </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:'center',
        justifyContent:"center"
    }, 
    press:{
        borderWidth:1,
        borderRadius:2,
        backgroundColor:'#fa0000',
    }
}
)