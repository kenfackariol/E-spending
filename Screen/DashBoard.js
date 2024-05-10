import React, {useEffect, useState} from "react";
import { StyleSheet, Text, 
    View,Alert, 
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    Modal, 
    } from 'react-native';
    import Ionicons from "@expo/vector-icons/Ionicons";
    import {getLimitExpense} from '../utils/database';
    import { LineChart } from 'react-native-chart-kit';
    import { FAB } from 'react-native-paper';


    const screenWidth = Dimensions.get('window').width;

    
export function DashBoard({navigation}){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dates, setDates]= useState([])
    const [datas, setdatas] = useState([])
    const [donnees, setDonnes] = useState([])
    
    const fetchData = async () => {
        try {
          const result = await getLimitExpense();
  
          // Créez les tableaux de données pour le graphique
          const labels = result.map(item => item.date.substr(-5));
          const values = result.map(item => item.somme_motant);
  
          setChartData({ labels, values });
        } catch (error) {
          console.error('Erreur lors de la récupération des données : ', error);
        }
      };
   
      const [chartData, setChartData] = useState({ labels: [], values: [] });

     
      function refreshPage(){
        getLimitExpense()
            .then(expenses =>{
                console.log(expenses);
                setDonnes(expenses)
            })
            .catch((error)=>{
                console.error(error)
            })
      }
      
       useEffect(() => {
        [fetchData(), refreshPage()];
      }, []);
      
      
    return(
        <View style={Mystyle.contener}>
            
            
        <View style={{ justifyContent: "center" }}>
        
            <LineChart
             data={{
                labels: chartData.labels,
                datasets: [{ data: chartData.values }]
              }}
            width={screenWidth * 1}
            height={300}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom : "#28B463",
              backgroundGradientTo : "#ffa726",
              decimalPlaces: 0,
              color : (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
            }}
            />
            </View>

            <View style={Mystyle.container}>
                <View style={Mystyle.row}>
                
                    <Text style={[Mystyle.cell, {backgroundColor:"#48B463", textAlign:'center', fontWeight:"bold",color: "#fff"}]}>Date</Text>
                    <Text style={[Mystyle.cell, {backgroundColor:"#F8C471", textAlign:'center', fontWeight:"bold"}]}>Depense Total</Text>
                   
                </View>
            </View>
            {
                donnees.map((donnee, index) => (
                    <View key={donnee.id}  style={Mystyle.row}>
                        
                    <Text style={[Mystyle.cell, {color: "black",backgroundColor:"#48B463", textAlign:"center", color: "#fff"}]}>{donnee.date}</Text>
                    <Text style={[Mystyle.cell, {backgroundColor:"#F8C471", textAlign: "center"}]}>{donnee.somme_motant} F</Text>
                </View>  

                ))
            }
               
                <View style={{marginHorizontal: 20,padding:10, flexDirection: "row", }}>   
                <Ionicons name='help-circle' color={"orange"} size={40} />
                <Text style={{textAlign:"justify"}}>Le graphe et le tableau ci-dessus vous illustre vos depenses total quodienne par jour pour les 5 deniers Pour plus de datail voir l'historique de vos depense</Text>
                </View>   
                <View style={{marginHorizontal: 20,padding:10, flexDirection: "row", }}>   
                <Ionicons name='information-circle' color={"orange"} size={40} />
                <Text style={{textAlign:"justify"}}>Opter pour un meilleur suivie en definant un budget pour chacune de vos categories de depense</Text>
                </View>  
                
                <View> 
        <TouchableOpacity 
        style={{backgroundColor:"#48B463", padding:20, width:screenWidth * 0.8, borderRadius:10,marginTop: 20,zIndex: 2,  flexDirection:'row', justifyContent: "center"} }
        onPress={() => navigation.navigate('addExp')}>
           
            <Text text30 style={{ fontWeight:"bold", fontSize: 22}}>Nouvelle dépense</Text>
            
        </TouchableOpacity>
        </View> 
        <FAB
          icon={({ size, color }) => (
            <Ionicons name="reload" size={size} color={color} />
          )}
          onPress={() => {refreshPage(), fetchData()}}
          style={[Mystyle.fab, {bottom: 110, backgroundColor:"#F2F3F4"}]}
        />
    </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:"center",
        justifyContent: "justify",
    }, 
    press:{
        borderRadius:2,
        backgroundColor:'#fa0000',
        width: screenWidth * 0.9,
    }, 
    pressIcon: {
        backgroundColor:"#fff", 
        paddingHorizontal:25,  
        flexDirection:'row', 
        justifyContent: "center"
    },
    footer: {
        width: screenWidth * 1.01,
        justifyContent: "flex-end",
        paddingTop: 5,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingBottom: 35,
    },
    container: {
        width: screenWidth * 1,
        borderColor: '#000',
        marginBottom: 2,
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
      fab: {
        backgroundColor: '#2ECC71',
        marginLeft: screenWidth * 0.8,
        position: 'relative',
        bottom: 20,
        right: 16,
      },
}
)