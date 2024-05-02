import React, {useState} from "react";
import { StyleSheet, Text, 
    View,Alert, 
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    } from 'react-native';

export function AddBudget(){
    return(
        <View style={Mystyle.contener}>
        <Text>AddBud</Text>
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