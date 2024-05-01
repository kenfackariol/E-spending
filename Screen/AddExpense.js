import {
  StyleSheet, Text,
  View, Alert,
  TextInput,
  Image, ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { createExpense } from '../utils/database';
import { getCategories } from '../utils/database';
import { initCategories } from '../utils/categories_seed';






const screenWidth = Dimensions.get('window').width;

export function AddExpense({ navigation }) {
  const [selectedValue, setSelectedValue] = useState(7);
  const [montant, setMontant] = useState("")
  const [verifMontant, setVerifMontant] = useState(false)
  const [comment, setComment] = useState("")
  const [verifComment, setVerifComment] = useState(false)
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString();
  const [elementPicker, setElementPicker] = useState([])
  const [catSelected, setCatSelected] = useState("")

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

  function handleSubmit() {
    if (/^\d+(\.\d{1,2})?$/.test(montant)) {
      const user = 1;
      const dateString = moment(currentDate).format('YYYY-MM-DD');
      console.log(user, " ", selectedValue, " ", montant, " ", dateString, " ", comment)
      createExpense(user, selectedValue, montant, dateString, comment)
        .then(insertId => {
          // L'insertion de l'utilisateur a réussi
          console.log('Depense insérée avec succès, ID d insertion :', insertId);

          Alert.alert("Successfull", "New Expense?", [
            {
              text: 'No',
              onPress: () => navigation.navigate("history")
            },
            {
              text: "Yes",
              onPress: () => {
                setMontant("")
                setComment("")
                
              }
            }
          ])
          
        })
        .catch(error => {
          // Une erreur s'est produite lors de l'insertion de l'utilisateur
          console.error('Erreur lors de l insertion de la depense :', error);
        });
    }
    else Alert.alert("Invalid Amount")
    setMontant("")
    setComment("")
    
  }
  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}
      style={styles.contener}>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.formulaire}>


          <View style={{ alignItems: "justify" }}>

            <View style={styles.spaceInput}>
              <Ionicons name='list-sharp' color={"orange"} size={40} />
              <Text style={{ color: "orange", fontSize: 20 }}>Choice Category</Text>
            </View>

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
            <Text text30>Selected : {selectedValue}</Text>
            {
              //console.log(selectedValue)
            }
          </View>

          <View style={styles.spaceInput}>
            <Ionicons name='logo-usd' color={"orange"} size={40} />

            <TextInput style={styles.input}
              value={montant}
              onChangeText={setMontant}
              /*onChangeText={()} */
              placeholder='Enter the Amount' />

          </View>
         

          <View style={[styles.spaceInput]}>
            <Ionicons name='today' color={"orange"} size={40} />
            <TextInput style={[styles.input, { backgroundColor: "#f2f2f2" }]}
              value={formatDate}
              editable={false}
            />

          </View>

          <View style={styles.spaceInput}>
            <Ionicons name='document-text' color={"orange"} size={40} />
            <TextInput style={[styles.input, { height: 80 }]}
              value={comment}
              onChangeText={setComment}
              /*onChangeText={()} */
              placeholder='Enter a comment'
              multiline={true}
              numberOfLines={3}

            />

          </View>
          <View style={styles.spaceInput}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F1948A', width: screenWidth * 0.272, marginRight: 10 }]}
              onPress={() => { navigation.goBack() }}>
              <Text style={{ color: 'white' }} >Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#48C9B0', width: screenWidth * 0.6, }]}
              onPress={handleSubmit}>
              <Text style={{ color: "white" }} >ADD</Text>
            </TouchableOpacity>

          </View>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}










const styles = StyleSheet.create(
  {
    contener: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    picker: {
      height: 190,
      width: screenWidth * 0.9,
      borderRadius: 20,
      backgroundColor: "#f2f2f2",
    },
    button: {
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 10,
      marginVertical: 15,
    },
    formulaire: {
      flex: 1,
      marginTop: 15,
      backgroundColor: "#fff",
      alignContent: "center",
      padding: 20,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2
      },

    },
    spaceInput: {
      flex: 0,
      marginTop: 25,
      flexDirection: "row",
      alignItems: "baseline",
    },
    input: {
      width: screenWidth * 0.8,
      borderWidth: 1,
      height: 40,
      borderColor: "orange",
      padding: 10,
      borderRadius: 5
    },
    button: {
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 10,
      marginVertical: 15,
    },
    alertcolor: {
      backgroundColor: "#82E0AA",
    },
    errorText: {
      fontSize: 10,
      color: "red",

    }

  }
)