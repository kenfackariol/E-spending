import React, { useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    Modal,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';
import { getExpenses, getExpense } from "../utils/database";
import { useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;

export default function SpendingHistory({navigation}) {
    const [expenses, setExpenses] = useState([]);
    const [exp, setExp] = useState({})
    const [isModalVisible, setIsModalVisible]=useState(false);
    const [inputVisible, setInputVisible]= useState(false)

    const closeModal = () => {
      setIsModalVisible(false)
      setInputVisible(false)
    }

    function editInput(){
      setInputVisible(true);
    }

    function displayExpense(id){
      setIsModalVisible(true)
      getExpense(id)
        .then(expense  => {
          setExp(expense)
          console.log(expense)
        })
        .catch(error => {
          console.error(error);
        })
    }

    function handleUpdate(){

    }

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
                    onPress={() => 
                      displayExpense(expense.id)
                    }>
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
            <View 
            >

              <Modal visible={isModalVisible}
                animationType="slide"
                onRequestClose={closeModal}
              
              >
                 <View 
                   style={{
                    flex:1,
                    alignItems: "center",
                    justifyContent:"center",
                    padding: 10
                  }}
            >

              <TextInput
              style={styles.input}
              value={exp.categorie}
              editable={inputVisible}
              />
               <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={exp.montant+""}
              editable={inputVisible}
              />

              
              
              <TextInput
              style={styles.input}
              value={exp.date}
              editable={inputVisible}/>

              <TextInput
              style={styles.input}
              value={exp.commentaire}
              editable={inputVisible}/>

              <Button title="Edit" 
               onPress={editInput}/>

              <TouchableOpacity onPress={closeModal}
                style={{backgroundColor:'#F1948A', width: screenWidth * 0.272, padding:5, marginBottom: 8}}>
                <Text style={{color:"white", textAlign: "center"}}>Close</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => console.log("updating.....") }
                style={{backgroundColor:'#48C9B0', width: screenWidth * 0.272, padding:5}}>
                <Text style={{color:"white", textAlign: "center"}}>Update</Text>
              </TouchableOpacity>
               </View>
              </Modal>
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
      input: {
        width: screenWidth * 0.785,
        borderWidth: 1,
        height: 40,
        borderColor: "orange",
        padding: 10,
        borderRadius: 5
      },

}
)