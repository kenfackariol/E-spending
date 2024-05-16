import React, {useEffect, useState} from "react";
import { StyleSheet, Text, 
    View,Alert, 
    TextInput, Pressable,
    Image, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    } from 'react-native';
import { getNotifications } from "../api/api";
import { FAB } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get('window').width;
export function Notification(){
    const [notifications, setNotifications] = useState([]);
    
    function refreshPage(){
        getNotifications()
            .then((notifs)=> {
               
                setNotifications(notifs)
            })
            .catch((err)=>{
                console.log(err);
                
            })
    }
    useEffect(() => {
        refreshPage()
    }, [])

    return(
        <View style={Mystyle.contener}>
            <ScrollView>
        {
            notifications.map((note, index)=> (
                <View key={note.id_message}>
                    <View  style={Mystyle.cadre}>
                        <Text style={note.statut == "Depassé"? [Mystyle.cell, {backgroundColor: "#E74C3C",textAlign: "center"}]:
                        note.statut == "Expiré"? [Mystyle.cell, {backgroundColor: "grey",textAlign: "center"}]: 
                        [Mystyle.cell, {backgroundColor: "#27AE60",textAlign: "center"}]}>
                            Notif {index + 1}</Text>
                        <Text style={[Mystyle.cell,]}>  {note.notifs}</Text>
                        <Text style={Mystyle.cell}>  Le : {note.createdAt}</Text>
                        <View style={{position: "relative", right: 0}}>
                        <TouchableOpacity style={{alignItems: "flex-end", marginLeft: screenWidth * 0.8,marginRight: 10}} onPress={() => console.log('Delete')}>
                        <Ionicons name="trash-bin-sharp" size={35} color={"red"} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
             ) )
        }
        </ScrollView>
            <FAB
              icon={({ size, color }) => (
                <Ionicons name="reload" size={size} color={color} />
              )}
              onPress={()=> refreshPage()}
              style={[Mystyle.fab, { backgroundColor:"#E74C3C", position:"absolute", bottom: 30, right: 10, backgroundColor: "#f5f5f5"}]}
            />
        </View>
    )
}
const Mystyle = StyleSheet.create({
    contener: {
        flex:1,
        alignItems:'center',
    },
    areaMsg: {
      
        borderWidth: 1,
        margin: 5,
    }, 
    cell: {
        alignItems: "center",
        paddingVertical: 5,
      },
      cadre: {
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#F5E5E5"
      },
      fab: {
        backgroundColor: '#2ECC71',
        marginLeft: screenWidth * 0.8,
        position:'relative',
        
      },
}
)