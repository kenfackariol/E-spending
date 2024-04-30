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
import { getExpenses, getExpense, getExpenseByCatId, getCategories,  } from "../utils/database";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import { updateExpense } from "../utils/database";
import { deleteExpense } from "../utils/database";
import { Dropdown } from 'react-native-element-dropdown';





const screenWidth = Dimensions.get('window').width;

export default function SpendingHistory({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [exp, setExp] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [numSort, setNumSort] = useState();
  
  




  const [valeur, setValeur] = useState(null);
  const handleChange = (value) => {
    setValeur(value.label)
    setNumSort(value.value)
    sortCategorie(value.value)
  }



  function closeModal() {
    
      setIsModalVisible(false)
      setInputVisible(false)
    
  }


  //methode pour affichage trier
  function sortCategorie(id) {

    getExpenseByCatId(id)
      .then(expenses => {
        setExpenses(expenses)
        console.log(expenses)
      })
      .catch(error => {
        console.error(error);
      });
  }
  //methode pour refraiche la page
  function refreshPage() {

    getExpenses()
      .then(expenses => {
        setExpenses(expenses)
      })
      .catch(error => {
        console.error(error);
      });

    //getcategorie pour inserer pour le dropdown et les updateExp
    getCategories()
      .then(cats => {
        setCategories(cats)
        console.log(cats)
      })
      .catch(error => {
        console.error(error);
      });
  }

  function editInput() {
    setInputVisible(true);
  }

  function displayExpense(id) {
    setIsModalVisible(true)
    getExpense(id)
      .then(expense => {
        setExp(expense)
      })
      .catch(error => {
        console.error(error);
      })

  }
  //controle des champ pour le update

  function handleCategorie(e) {
    //const catVar = e.nativeEvent.text;
    //exp.categorie = catVar
    //destitution de l'objet exp de la depense
    const newobj = { ...exp }
    newobj.categorie = e
    setExp(newobj)
  }

  function handleMontant(e) {
    //const catVar = e.nativeEvent.text;
    //exp.categorie = catVar
    //destitution de l'objet exp de la depense
    const newobj = { ...exp }
    newobj.montant = e
    setExp(newobj)
  }

  function handleComment(e) {
    //const catVar = e.nativeEvent.text;
    //exp.categorie = catVar
    //destitution de l'objet exp de la depense
    const newobj = { ...exp }
    newobj.commentaire = e
    setExp(newobj)
  }
  // methode pour la modification d'une depense
  function handleUpdate() {
    console.log(exp);
    if (/^\d+(\.\d{1,2})?$/.test(exp.montant) && exp.montant > 0) {
      Alert.alert("Valider la modification?", "", [
        {
          text: 'Non',
          onPress: () => null
        },
        {
          text: "Oui",
          onPress: () => updateExpense(exp.id, exp.id_utilisateur, exp.id_categorie, exp.montant, exp.date, exp.commentaire)
          
            .then(expUpt => {
              console.log(exp.id, exp.id_utilisateur, exp.montant, exp.commentaire, exp.categorie)
              refreshPage();
              console.log(expUpt)
              Alert.alert(`Depense\nmodifiée`);
            })
            .catch(error => {
              console.error(error);
            })
        }
      ])
    }
    else Alert.alert("Le montant doit être\nun nombre")
  }

  //methode pour la suppression
  function deleteExp() {
    Alert.alert("Voulez-vous vraiment\supprimer?", "", [
      {
        text: 'Non',
        onPress: () => null
      },
      {
        text: "Oui",
        onPress: () => deleteExpense(exp.id)
          .then(expDel => {
            refreshPage();
            Alert.alert(`Depense\nSupprimée`);
            refreshPage()
            setIsModalVisible(false)
          })
          .catch(error => {
            console.error(error);
          })
      },
    ])


  }
  useEffect(() => {
    refreshPage();
    console.log(expenses)
  }, []);

  /*  useEffect(() => {
      sortCategorie(numSort);
      }, []);*/
  //pour refresh la page 

  return (
    <View style={styles.contener}>
      <View>

        <View style={styles.container}>
          <View style={styles.row}>
            <Dropdown
              style={[styles.dropdown, styles.cell]}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.inputSearch}
              iconStyle={styles.iconStyle}
              data={categories.map(item => ({ label: item.nom, value: item.id }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                valeur != null ? valeur :
                  "Trier par"
              }
              search
              value={valeur}
              onChange={handleChange}

            />

            <Text style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: 'center', fontWeight: "bold", }]}>Categorie</Text>
            <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Montant</Text>


          </View>
        </View>
        <ScrollView>
          {expenses.map((expense, index) => (

            <View key={expense.id} style={styles.row}>

              <TouchableOpacity
                style={[styles.cell, { textAlign: "center", backgroundColor: "#ABB2B9", }]}
                onPress={() =>
                  displayExpense(expense.id)
                }>
                <View>
                  <Text style={{ color: "white" }}>{index + 1}</Text>
                </View>
              </TouchableOpacity>

              <Text key={expense.id} style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: "center" }]}>

                {
                  expense.nom
                }

              </Text>
              <Text style={[styles.cell, { textAlign: "center", backgroundColor: "#F8C471" }]}>{expense.montant} F</Text>

            </View>
          ))}

        </ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: "#F8C471", padding: 20, marginBottom: 10, marginTop: 5, width: screenWidth * 1, borderRadius: 10, flexDirection: 'row', justifyContent: "center" }}
          onPress={() => navigation.navigate('addExp')}>

          <Text text30 style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 17 }}>Add Expense</Text>

        </TouchableOpacity>

      </View>
      <View
        style={{ width: screenWidth * 1, }}
      >

        <Modal visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "justify",
              padding: 10,
            }}
          >
            <View
              style={{
                backgroundColor: '#fff', height: 100,
                flexDirection: 'row',
                width: screenWidth * 1, alignItems: "center",
                justifyContent: "space-between", paddingTop: 60,
              }}
            >
              <TouchableOpacity onPress={closeModal}
                style={{ backgroundColor: '#F1948A', width: screenWidth * 0.272, padding: 5, marginBottom: 8, }}>
                <Text style={{ textAlign: "center", }}> Cancel</Text>
              </TouchableOpacity>


            </View>

            <ScrollView>
              <Text style={{ marginTop: 30 }}>Categorie</Text>
              <TextInput
                style={styles.input}
                value={exp.nom}
                onChangeText={handleCategorie}
                editable={false}
              />
              <Text >Montant</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleMontant}
                value={exp.montant + ""}
                editable={inputVisible}
              />
              <Text >Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: "#f5f5F5" }]}
                value={exp.date}
                editable={false} />
              <Text >Commentaire</Text>
              <TextInput
                style={[styles.input, { marginBottom: 20, height: 80 }]}
                value={exp.commentaire}
                onChangeText={handleComment}
                multiline={true}
                numberOfLines={3}
                editable={inputVisible} />

              <View
                style={{ flexDirection: "row", marginBottom: 15 }}
              >
                <TouchableOpacity onPress={editInput}
                  style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.374, padding: 10, borderRadius: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteExp}
                  style={{ backgroundColor: '#F1948A', width: screenWidth * 0.373, padding: 10, marginLeft: 15, borderRadius: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>Delete</Text>
                </TouchableOpacity>

              </View>

              {
                inputVisible == false ? null : (
                  <TouchableOpacity onPress={handleUpdate}
                    style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.78, padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
                  </TouchableOpacity>
                )
              }
            </ScrollView>
          </View>

          <View
            style={{ backgroundColor: 'orange', height: 50, width: screenWidth * 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text >Text goes here</Text>
          </View>
        </Modal>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  contener: {
    flex: 1,
    alignItems: "center",
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
    alignItems: "center",
    paddingVertical: 5,
  },
  input: {
    width: screenWidth * 0.785,
    borderWidth: 1,
    height: 40,
    borderColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdown: {
    height: 38,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  placeholder: {
    fontSize: 15,
    textAlign: "center",

    fontVariant: ["small-caps", "lining-nums"],
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: screenWidth * 0.1,
    height: 30,
  },
  inputSearch: {
    height: 100,
    width: 30,
    fontSize: 10,
  },

}
)