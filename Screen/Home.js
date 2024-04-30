import { StyleSheet, Text, 
    View,Alert,
    BackHandler,
    TouchableOpacity,
    SafeAreaView
    } from 'react-native';
    import React, {useEffect} from 'react';
    import { useNavigation, useFocusEffect } from '@react-navigation/native';
    
    import Ionicons from "@expo/vector-icons/Ionicons";

export function Home({navigation}) {
    
    // useFocusEffect(
    //     React.useCallback(()=>{
    //         return true
    //     })
    // )
    return(
        <SafeAreaView style={styles.contener} >
        <View >
            <Text style={{fontSize:30}}><Text style={{fontSize:60, color:'orange'}} >E</Text>-Spending</Text>
        </View>
        <TouchableOpacity 
        style={{backgroundColor:"#F8C471", padding:20, width:"90%", borderRadius:10, flexDirection:'row', justifyContent:"space-between"} }
        onPress={() => navigation.navigate("drawer")}>
            <Text text30 style={{fontStyle:"italic", fontWeight:"bold"}}>Let's go!!</Text>
            <Ionicons name='chevron-forward-outline' color={"black"} size={22}/>
        </TouchableOpacity>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create(
    {
        contener:{
            flex: 1,
            alignItems:"center",
            justifyContent:"center",
        }
    }
)