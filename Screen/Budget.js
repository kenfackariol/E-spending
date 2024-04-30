import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text,
    View, Alert,
    TextInput, Pressable,
    Image, ActivityIndicator,
    KeyboardAvoidingView,
    TouchableOpacity,Dimensions
} from 'react-native';
import { getBudgets, getBudget, deleteBudget, updateBudget } from "../utils/database";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;
export function Budget() {
    const [budgets, setBudgets] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    
    function refreshPage(){
        getBudgets()
        .then(budgets => {
            setBudgets(budgets)
            console.log(budgets)
          })
          .catch(error => {
            console.error(error);
          });
    }

    useEffect(()=> {
        refreshPage()
    }, [])
    return (
        <View style={styles.contener}>
            <View style={styles.container}>
          <View style={styles.row}>
            <Text style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: 'center', fontWeight: "bold", }]}>Categorie</Text>
            <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Montant</Text>
            <Text style={[styles.cell, { backgroundColor: "#F9B471", textAlign: 'center', fontWeight: "bold" }]}>Periode </Text>
          </View>
          <ScrollView>
         
            {
                budgets.map((budget, index) => (
                    <View key={budget.id} style={styles.row}>
                        <TouchableOpacity
                style={[styles.cell, { textAlign: "center", backgroundColor: "#ABB2B9", }]}
                onPress={() =>
                  console.log("getbudget")
                }>
                <View>
                  <Text style={{ color: "white" }}>{index + 1}</Text>
                </View>
              </TouchableOpacity>
                        <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Montant</Text>
                        <Text style={[styles.cell, { backgroundColor: "#F9B471", textAlign: 'center', fontWeight: "bold" }]}>Periode </Text>                        

                    </View>
                )

                )
            }
          
          </ScrollView>
          
        </View>
        <TouchableOpacity
               
                onPress={() =>
                  console.log("getbudget")
                }>
                <View style={styles.cercle}>
                  <Text style={{ color: "white", fontSize: 40, paddingBottom: 4 }}>+</Text>
                </View>
              </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    contener: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between"
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
      cercle:{
          
            position: "absolute",
            bottom: 40,
            left: screenWidth * 0.3,
            padding: 10,
            paddingHorizontal: 20,
            alignItems:'center',
            borderRadius: 50,
            backgroundColor: '#11F9B1',
      }
}
)