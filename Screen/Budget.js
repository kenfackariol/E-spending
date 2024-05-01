import React, { useEffect, useState } from "react";
import {
  StyleSheet, Text,
  View, Alert,
  TextInput, Pressable,
  Image, ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity, Dimensions
} from 'react-native';
import { getBudgets, getBudget, deleteBudget, updateBudget } from "../utils/database";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
export function Budget() {
  const [budgets, setBudgets] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  function refreshPage() {
    getBudgets()
      .then(budgets => {
        setBudgets(budgets)
        console.log(budgets)
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
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
                <FAB
                  icon="plus"
                  onPress={() => console.log('Bouton flottant appuyé')}
                  style={styles.fab}
                />
                <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Montant</Text>
                <Text style={[styles.cell, { backgroundColor: "#F9B471", textAlign: 'center', fontWeight: "bold" }]}>Periode </Text>

              </View>
            )

            )
          }

        </ScrollView>

      </View>
      
    
      <FAB
        icon="plus"
        onPress={() =>
          console.log("getbudget")
        }
        style={styles.fab}
      />
    
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
  boutonAdd: {
    flex: 1,
   
  },
  fab: {
    backgroundColor: '#58D68D',
    position: 'absolute',
    bottom: 30,
    right: 16,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  cercle: {

    position: "absolute",
    bottom: 40,
    left: screenWidth * 0.3,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#11F9B1',
  }
}
)