import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet, Text,
  View, Alert,
  TextInput, Pressable,
  Image, Button,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity, Dimensions
} from 'react-native';
import { getBudgets, getBudget, deleteBudget, updateBudget, createBudget } from "../utils/database";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { getCategories } from "../utils/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { text } from '@fortawesome/fontawesome-svg-core';
import { UserContext } from "../contexts/UserContext";

const screenWidth = Dimensions.get('window').width;
export function Budget() {
  const [selectedValue, setSelectedValue] = useState(7);
  const [budgets, setBudgets] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [elementPicker, setElementPicker] = useState([])
  const [montant, setMontant] = useState("");
  const [periode, setPeriode] = useState("");
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString();
  const [bud, setBud] = useState([])
  const [displayPick, setDisplayPick] = useState(true)
  const budAlready = []
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  const [open, setOpen] = useState(false);
  const [idperiode, setidperiode] = useState(null);
  const [items, setItems] = useState([
    { label: 'Day', value: 1 },
    { label: 'Week', value: 2 },
    { label: "Month", value: 3 },
  ]);
  const { user } = useContext(UserContext);

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
  //fonction pour les modicfications
  function handleMontant(e) {
    //const catVar = e.nativeEvent.text;
    //exp.categorie = catVar
    //destitution de l'objet exp de la depense
        const newobj = { ...bud }
        newobj.montant = e
        setBud(newobj)
        return true
      
  }

  function handlePeriode(e) {
    //const catVar = e.nativeEvent.text;
    //exp.categorie = catVar
    //destitution de l'objet exp de la depense
   
      const newobj = { ...bud }
    newobj.periode = e
    setBud(newobj)
    return true 
  }


  function compareDates(dateString) {
    // Convertir la saisie en objet Date
    const dateInput = new Date(dateString);
  
    // Obtenir la date d'aujourd'hui
    const today = new Date();
  
    // Comparer les dates
    if (dateInput < today) {
      return false;
    }  else {
      return true;
    }
  }
  function getbudgetbyid(id){
    setDisplayPick(false)
    setModalVisible(true)
    getBudget(id)
      .then((bud) => {
        console.log(bud)
        setBud(bud)
      } )
      .catch ((error) => {
        console.error(error)
      })
  }

  //methode pour supprimer
  function deleteBud() {
    Alert.alert("suppression", "Est-vous sûr?", [
      {
        text: 'Non',
        onPress: () => null
      },
      {
        text: "Oui",
        onPress: () => deleteBudget(bud.id)
          .then(expDel => {
            Alert.alert(`Budget Supprimé!`);
            refreshPage()
            setModalVisible(false)
          })
          .catch(error => {
            console.error(error);
          })
      },
    ])
  }
//methode pour modifier un budget
  function handleUpdate(){
    if(/^\d+(\.\d{1,2})?$/.test(bud.montant) && regex.test(bud.periode)){
      if(compareDates(bud.periode)){
        // let user = 1
        Alert.alert("Modification", "Êtes-vous sûr?", [
          {
            text: "No",
            onPress: () => null
          }, 
          {
            text: "Oui",
            onPress: () => updateBudget(bud.id, user.id, bud.id_categorie, bud.montant, bud.periode)
            .then(()=> {
              console.log(`budget modifié`)
              Alert.alert("Modifié avec succès")
              refreshPage()
            })
            .catch((err)=>{
              console.error(err)
            })
          }
        ])
      }
     else Alert.alert("Veuiller Entrer une date superieur à celle d'aujourd'hui")
      
    }
    else Alert.alert("veillez-vous rassurer d'avoir un montant et une date valide")
  }


  function handleSubmit() {

    console.log(periode);
    // let user = 1
    if (/^\d+(\.\d{1,2})?$/.test(montant) && regex.test(periode) ) {
      if (compareDates(periode)) {
        createBudget(user.id, selectedValue, montant, periode)
        .then(insertId => {
          // L'insertion de l'utilisateur a réussi
          console.log('Budget Inserer :', insertId);

          refreshPage()
          Alert.alert("Successfull", "New Budget?", [
            {
              text: 'No',
              onPress: () => {setModalVisible(false), setMontant("")}
            },
            {
              text: "Yes",
              onPress: () => {
                setMontant("")
              }
            }
          ])

        })
        .catch(error => {
          // Une erreur s'est produite lors de l'insertion de l'utilisateur
          console.error('Erreur lors de l insertion de la depense :', error);
        });
      }
      else Alert.alert("La date unserer est invalide Entrer une date superieur a la date d'aujourd'hui")
  
     
    }
    else Alert.alert('Montant ou date invalide\nLe montant doit etre un nombre;\net le format de la date\n AAAA-MM-JJ')
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
          <Text style={[styles.cell, { backgroundColor: "#D5DBDB", textAlign: 'center', fontWeight: "bold", }]}>N°</Text>
          <Text style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: 'center', fontWeight: "bold", }]}>Categorie</Text>
          <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Montant</Text>
          <Text style={[styles.cell, { backgroundColor: "#F9B471", textAlign: 'center', fontWeight: "bold" }]}>Periode </Text>
        </View>
        <ScrollView style={{marginTop: 5}}>
          {
            budgets.map((budget, index) => (
              <View key={budget.id} style={styles.row}>
                <TouchableOpacity onPress={() => getbudgetbyid(budget.id)} style={[styles.cell, { backgroundColor: "#D5DBDB", textAlign: 'center', fontWeight: "bold" }]}>
                <Text >{index + 1}</Text>
                </TouchableOpacity>
                <Text style={[styles.cell, { backgroundColor: "#F7DC6F", textAlign: 'center',  }]}>{budget.nom}</Text>
                <Text style={[styles.cell, { backgroundColor: "#F8C471", textAlign: 'center', }]}>{budget.montant} F</Text>
                <Text style={[styles.cell, { backgroundColor: "#F9B471", textAlign: 'center',  }]}>{budget.createdAt.split(" ")[0]} {budget.periode} </Text>
              </View>
            )
            )
          }
        </ScrollView>
      </View>
      <FAB
        icon="plus"
        onPress={() =>{
          setModalVisible(true)
          setDisplayPick(true)
        }
        }
        style={styles.fab}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {setModalVisible(false)
          setDisplayPick(true)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Button title={"cancel"} onPress={() => setModalVisible(false)} />
          {
            displayPick ? (<Button title={"Save"} onPress={handleSubmit} color={'green'} />) :
            (<Button title={"Save"} onPress={handleUpdate} color={'green'} />)
          }
          
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          {
            displayPick == true? (<Text style={{ fontSize: 20, marginBottom: 10, }}><Text style={{ color: 'orange', fontStyle: "italic", fontSize: 30 }}>S</Text>et <Text style={{ color: 'orange', fontStyle: "italic", fontSize: 30 }}>a</Text> Bu<Text style={{ color: 'orange', fontStyle: "italic", fontSize: 30 }}>D</Text>get</Text>
          ): (<Text text30>Vous pouvez modifier</Text>)
          }
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={150}>
            <ScrollView>
              {
                displayPick ? (
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
                ) : (<View style={styles.spaceInput}>
                  <Ionicons name='list-sharp' color={"orange"} size={40} />
                  <TextInput style={[styles.input, {width: screenWidth * 0.78}]}
                    value={bud.nom}
                    editable={false}
                    />
                </View>)
              }
              <View style={styles.spaceInput}>
                <Ionicons name='logo-usd' color={"orange"} size={40} />
                <TextInput style={[styles.input, {width: screenWidth * 0.78}]}
                  value={displayPick? montant : bud.montant+""}
                  onChangeText={displayPick? setMontant: handleMontant}
                  /*onChangeText={()} */
                  placeholder="Enter the Amount" />
              </View>
              <Text text30>definir une periode</Text>
              <View style={[styles.spaceInput,]}>
                <Text text30>Du </Text>
                <TextInput style={[styles.input, { backgroundColor: "#f5f5f5" }]}
                  value={displayPick ? formatDate + " (date d'aujourd'hui)": bud.createdAt}
                  editable={false}
                />
              </View>
              <Text text30>↓</Text>
              <View style={[styles.spaceInput,]}>
                <Text text30>Au </Text>
                <TextInput style={styles.input}
                  value={displayPick? periode: bud.periode}
                  onChangeText={displayPick?setPeriode: handlePeriode}
                  placeholder="Enter the Amount" />
              </View>
              <Text style={{color: "red"}}>NB: format de la periode : AAAA-MM-JJ</Text>
            </ScrollView>
            {
              displayPick ? null : (<FAB
                icon={({ size, color }) => (
                  <Ionicons name="trash-bin-sharp" size={size} color={color} />
                )}
                onPress={deleteBud}
                style={[styles.fab2, { backgroundColor: "red" }]}
              />)
            }
          </KeyboardAvoidingView>
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
    marginBottom: 10,
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
  DropDownPicker: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: 'baseline',
    width: screenWidth * 0.7,
    borderColor: "orange"
  },
  fab: {
    backgroundColor: '#2ECC71',
    position: 'absolute',
    bottom: 30,
    right: 16,
  },
  fab2: {
    backgroundColor: '#2ECC71',
    position: 'absolute',
    bottom: 100,
    right: 0,
  },
}
)
