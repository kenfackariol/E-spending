import React, { useEffect, useState } from "react";
import {
  StyleSheet, Text,
  View, Alert,
  TextInput, Pressable,
  Image, Button,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity, Dimensions
} from 'react-native';
import { getBudgets, getBudget, deleteBudget, updateBudget } from "../utils/database";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { getCategories } from "../utils/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;
export function Budget() {
  const [selectedValue, setSelectedValue] = useState(7);
  const [budgets, setBudgets] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [elementPicker, setElementPicker] = useState([])
  const [montant, setMontant] = useState("")
  const [selected, setSelected] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Jour', value: 1 },
    { label: 'Semaine', value: 2 },
    { label: "Mois", value: 3 },
  ]);
  const fetchCategories = async () => {
    try {

      let cats = await getCategories();
      console.log(cats);
      setElementPicker(cats)
    }
    catch (error) {
      console.log(error);
    }
  }

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
    fetchCategories()
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
          setModalVisible(true)
        }
        style={styles.fab}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={()=> setModalVisible(false)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Button title={"cancel"} onPress={() => setModalVisible(false)} />
          <Button title={"Save"} onPress={() => console.log("save...")} color={'green'}/>
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={{fontSize: 20, marginBottom: 10, }}><Text style={{color:'orange', fontStyle:"italic", fontSize: 30}}>S</Text>et <Text style={{color:'orange', fontStyle:"italic", fontSize: 30}}>a</Text> Bu<Text style={{color:'orange', fontStyle:"italic", fontSize: 30}}>D</Text>get</Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
              style={styles.picker}
            >
              {
                elementPicker.map(cat => (
                  <Picker.Item key={cat.id} label={cat.nom} value={cat.id} />
                ))
              }
            </Picker>
            <View style={styles.spaceInput}>
              <Ionicons name='logo-usd' color={"orange"} size={40} />
              <TextInput style={styles.input}
                value={montant}
                onChangeText={setMontant}
                /*onChangeText={()} */
                placeholder="Enter the Amount" />
            </View>
           
        
          <View style={styles.DropDownPicker}>
          <Ionicons name='today' color={"orange"} size={40} />
          <DropDownPicker
              open={open}
              value={value}
              items={items}
              placeholder="Choice Periode"
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{borderColor: "orange"}}
            />
            </View>
        </View>
      </Modal>
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
  },
  picker: {
    height: 190,
    width: screenWidth * 0.9,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  input: {
    width: screenWidth * 0.8,
    borderWidth: 1,
    height: 40,
    borderColor: "orange",
    padding: 10,
    borderRadius: 5
  },
  spaceInput: {
    flex: 0,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  DropDownPicker:{
    marginVertical: 15,
    flexDirection: "row",
    alignItems:'baseline',
    width: screenWidth * 0.7,
    borderColor: "orange"
  }
}
)