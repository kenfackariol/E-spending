import React, {useState} from "react";
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
    import {getExpense} from '../utils/database';
    import { LineChart } from 'react-native-chart-kit';


    const screenWidth = Dimensions.get('window').width;
    
export function DashBoard({navigation}){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const data = {
        labels: ["Lun", "Mar", "Mer", "jeudi", "ven", "sam", "dim"],
        datasets : [
          {
            data : [500, 300, 1000, 500, 1000, 1500, 1400]
          }
         ]
  
      }
    return(
        <View style={Mystyle.contener}>
        

        <View style={{ alignItems: "center" }}>
            <LineChart
            data={data}
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
                    <Text style={[Mystyle.cell, {backgroundColor:"#F7DC6F", textAlign:'center', fontWeight:"bold",}]}>Lun</Text>
                    <Text style={[Mystyle.cell, {backgroundColor:"#F8C471", textAlign:'center', fontWeight:"bold"}]}>Mar</Text>
                    <Text style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Mer</Text>
                    <Text style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Jeu</Text>
                    <Text style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Ven</Text>
                    <Text style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Sam</Text>
                    <Text style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign:'center', fontWeight:"bold"}]}>Dim</Text>
                </View>
            </View>

             
                <View  style={Mystyle.row}>
                    <Text style={[Mystyle.cell, {color: "black", backgroundColor:"#F7DC6F"}]}>1000 F</Text>
                    <Text style={[Mystyle.cell, {backgroundColor:"#F8C471", textAlign: "center"}]}>2550 F</Text>
                    <Text style={[Mystyle.cell, {textAlign: "center", backgroundColor:"#F8C471"}]}>5050 F</Text>
                    <Text  style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign: "center"}]}>1450</Text>
                    <Text  style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign: "center"}]}>1000</Text>
                    <Text  style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign: "center"}]}>1670</Text>
                    <Text  style={[Mystyle.cell, {backgroundColor: "#F0B27A", textAlign: "center"}]}>140</Text>
                </View>   
            
        
        <TouchableOpacity 
        style={{backgroundColor:"#F8C471", padding:20, width:"90%", borderRadius:10,marginTop: 10,  flexDirection:'row', justifyContent: "center"} }
        onPress={() => navigation.navigate('addExp')}>
            <Ionicons name='logo-bitcoin' color={"black"} size={22}/>
            <Text text30 style={{fontStyle:"italic", fontWeight:"bold", fontSize: 22}}>New Expense</Text>
            <Ionicons name='logo-bitcoin' color={"black"} size={22}/>
        </TouchableOpacity>
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
}
)