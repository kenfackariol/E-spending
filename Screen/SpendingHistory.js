import React, { useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { getExpenses } from "../utils/database";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get('window').width;

export default function SpendingHistory({navigation}) {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        getExpenses()
          .then(expenses => {
            setExpenses(expenses)
            
            
          })
          .catch(error => {
            console.error(error);
          });
        }, []);

    return (
        <View style={styles.contener}>
            <View>
            
            <View style={styles.container}>
                <View style={styles.row}>
                <Text style={[styles.cell, { backgroundColor:"#fff", textAlign:'center', fontWeight:"bold",color: "#fff"}]}></Text>
                    <Text style={[styles.cell, {backgroundColor:"#F7DC6F", textAlign:'center', fontWeight:"bold",}]}>Categorie</Text>
                    <Text style={[styles.cell, {backgroundColor:"#F8C471", textAlign:'center', fontWeight:"bold"}]}>Montant</Text>
                    <Text style={[styles.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Date</Text>
                    
                </View>
            </View>
            <ScrollView>
                {expenses.map(expense => (
                    
                <View key ={expense.id} style={styles.row}>
                    <TouchableOpacity 
                    style={[ styles.cell, {textAlign:"center", backgroundColor:"#ABB2B9", }]}
                    onPress={() => console.log('pressed')}>
                    <View>
                    <Text style={{color: "white"}}>{expense.id}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={[styles.cell, {backgroundColor:"#F7DC6F", textAlign: "center"}]}>{expense.categorie}</Text>
                    <Text style={[styles.cell, {textAlign: "center", backgroundColor:"#F8C471"}]}>{expense.montant} F</Text>
                    <Text  style={[styles.cell, {backgroundColor: "#F0B27A", textAlign: "center"}]}>{expense.date}</Text>
                </View>   
            ))}
        
            </ScrollView>
            <TouchableOpacity 
        style={{backgroundColor:"#F8C471", padding:20,marginBottom: 10,marginTop:5, width:screenWidth * 1, borderRadius:10, flexDirection:'row', justifyContent: "center"} }
        onPress={() => navigation.navigate('addExp')}>
            
            <Text text30 style={{fontStyle:"italic", fontWeight:"bold", fontSize: 17}}>Add Expense</Text>
            
        </TouchableOpacity>
        
            </View>
             
        </View>
    )
}
const styles = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        
        
    },
    container: {
        width: screenWidth * 1,
        borderColor: '#000',
        marginBottom: 5,
      },
      row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 1,
        
        
      },
      cell: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
      },
      cellone: {
        flex: 0,
        alignItems:"center",
        paddingVertical: 5,
      },

}
)