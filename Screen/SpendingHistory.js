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
import { getExpenses, getExpense, getExpenseByCatId, getCategories, } from "../api/api";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import { updateExpense } from "../api/api";
import { deleteExpense } from "../api/api";
import { Dropdown } from 'react-native-element-dropdown';
import { FAB } from 'react-native-paper';





const screenWidth = Dimensions.get('window').width;

export default function SpendingHistory({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [exp, setExp] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [valeur, setValeur] = useState(null);
  
  const handleChange = (value) => {
    setValeur(value.label)
    
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
      })
      .catch(error => {
        console.error(error);
      });
  }
  //methode pour refraiche la page
  function refreshPage() {

    getExpenses()
      .then(expenses => {
        setValeur(null)
        console.log(expenses);
        setExpenses(expenses)
      })
      .catch(error => {
        console.error(error);
      });

    //getcategorie pour inserer pour le dropdown et les updateExp
    getCategories()
      .then(cats => {
        console.log(cats);
        setCategories(cats)
        
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
      Alert.alert("modification", "Êtes-vous-sûr?", [
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
    Alert.alert("suppression", "Est-vous sûr?", [
      {
        text: 'Non',
        onPress: () => null
      },
      {
        text: "Oui",
        onPress: () => deleteExpense(exp.id)
          .then(expDel => {
            refreshPage();
            Alert.alert(`Supprimé !`);
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
        <ScrollView >
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

              <Text key={expense.id} style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: "center" }]}>{ expense.nom }
              </Text>
              <Text style={[styles.cell, { textAlign: "center", backgroundColor: "#F8C471" }]}>{expense.montant} F</Text>

            </View>
          ))}


        </ScrollView>

        <FAB
          icon={({ size, color }) => (
            <Ionicons name="reload" size={size} color={color} />
          )}
          onPress={refreshPage}
          style={[styles.fab, {bottom: 110, backgroundColor:"#F2F3F4"}]}
        />

        <FAB
          icon="plus"
          onPress={() => navigation.navigate('addExp')}
          style={styles.fab}
        />


      </View>

      <View
        style={{ width: screenWidth * 1, }}
      >

        <Modal visible={isModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
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
                backgroundColor: '#fff',
                flexDirection: 'row',
                width: screenWidth * 1, alignItems: "center",
                justifyContent: "space-between",
              }}
            >

              <Button title="Cancel" onPress={closeModal} />

              <Button title="Edit" onPress={editInput} color={inputVisible ? "white" : ""} />



            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ textAlign: "center" }}>From {exp.date}</Text>
              <Text style={{ marginTop: 30 }}>Categorie</Text>
              <TextInput
                style={[styles.input, { backgroundColor: "#f5f5F5" }]}
                value={exp.nom}
                onChangeText={handleCategorie}
                editable={false}
              />
              <Text >Montant</Text>
              <TextInput
                style={
                  inputVisible ? [styles.input] : [styles.input, { backgroundColor: "#f5f5F5", }]
                }
                onChangeText={handleMontant}
                value={exp.montant + ""}
                editable={inputVisible}

              />

              <Text >Commentaire</Text>
              <TextInput
                style={
                  inputVisible ? [styles.input, { marginBottom: 20, height: 80, }] :
                    [styles.input, { backgroundColor: "#f5f5F5", marginBottom: 20, height: 80 }]
                }
                value={exp.commentaire}
                onChangeText={handleComment}
                multiline={true}
                numberOfLines={3}
                editable={inputVisible} />

              <View
                style={{ flexDirection: "row", marginBottom: 15 }}
              >
              </View>

              {
                inputVisible == false ? null : (
                  <TouchableOpacity onPress={handleUpdate}
                    style={{ backgroundColor: '#48C9B0', width: screenWidth * 0.78, padding: 10, borderRadius: 10 }}>
                    <Text style={{ textAlign: "center" }}>Update</Text>
                  </TouchableOpacity>
                )
              }
            </ScrollView>

          </View>

          <View
            style={{ backgroundColor: '#AEB6BF', height: 50, width: screenWidth * 1, alignItems: "center", justifyContent: "center" }}
          >
            
            <FAB
              icon={({ size, color }) => (
                <Ionicons name="trash-bin-sharp" size={size} color={color} />
              )}
              onPress={deleteExp}
              style={[styles.fab, { backgroundColor: "red" }]}
            />
            <Text>@e.spending.cm</Text>
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
    justifyContent: "justify",


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
  fab: {
    backgroundColor: '#2ECC71',
    marginLeft: screenWidth * 0.8,
    position: 'absolute',
    bottom: 30,
    right: 16,
  },

}
)