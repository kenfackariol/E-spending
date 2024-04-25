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
        
        
        <TouchableOpacity 
        style={{backgroundColor:"#F8C471", padding:20, width:"90%", borderRadius:10, flexDirection:'row', justifyContent: "center"} }
        onPress={() => navigation.navigate('addExp')}>
            <Ionicons name='logo-bitcoin' color={"black"} size={22}/>
            <Text text30 style={{fontStyle:"italic", fontWeight:"bold", fontSize: 22}}>New Expense</Text>
            <Ionicons name='logo-bitcoin' color={"black"} size={22}/>
        </TouchableOpacity>



        <View style={Mystyle.footer}>
                    <TouchableOpacity 
                    style={Mystyle.pressIcon }
                    onPress={() => setIsModalVisible(false)}>
                    <Ionicons name='person-outline' color={"#34495E"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={Mystyle.pressIcon }
                    onPress={() => setIsModalVisible(false)}>
                    <Ionicons name='settings-outline' color={"black"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={Mystyle.pressIcon }
                    onPress={() => setIsModalVisible(false)}>
                    <Ionicons name='home' color={"#34495E"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={Mystyle.pressIcon }
                    onPress={() => setIsModalVisible(false)}>
                    <Ionicons name='chatbubble-ellipses-outline' color={"black"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={Mystyle.pressIcon }
                    onPress={() => setIsModalVisible(false)}>
                    <Ionicons name='cash-outline' color={"black"} size={30}/>
                </TouchableOpacity>
        </View>
    </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:"center",
        justifyContent: "space-between",
        
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
    }}
)