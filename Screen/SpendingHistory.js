import React, { useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';

export default function SpendingHistory() {
    return (
        <View style={Mystyle.contener}>
            <Text>History</Text>
        </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    }
}
)