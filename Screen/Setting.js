import React, {useState} from "react";
import { StyleSheet, Text, 
    View,Alert, 
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    } from 'react-native';

export function Setting(){
    return(
        <View style={Mystyle.contener}>
        <Text>Setting</Text>
        </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:'center',
        justifyContent:"center"
    }
}
)