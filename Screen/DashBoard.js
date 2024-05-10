import React, { useEffect, useState } from "react";
import {
  StyleSheet, Text, View, Alert, TextInput, Pressable,
  Image, ActivityIndicator, ScrollView, KeyboardAvoidingView,
  TouchableOpacity, Dimensions, Modal,
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { getLimitExpense } from '../utils/database';
import { LineChart } from 'react-native-chart-kit';
import { FAB } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export function DashBoard({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [donnees, setDonnes] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  const fetchData = async () => {
    try {
      const result = await getLimitExpense();
      const labels = result.map(item => item.date.substr(-5));
      const values = result.map(item => item.somme_motant);
      console.log(`labels, values: `, labels, values);
      setChartData({ labels, values });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const refreshPage = async () => {
    try {
      const expenses = await getLimitExpense();
      setDonnes(expenses);
    } catch (error) {
      console.error('Error refreshing page: ', error);
    }
  };

  useEffect(() => {
    fetchData();
    refreshPage();
  }, []);

  return (
    <View style={Mystyle.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LineChart
          data={{
            labels: chartData.labels.length > 0 ? chartData.labels : ["No Data"],
            datasets: [
              { data: chartData.values.length > 0 ? chartData.values : [0] }
            ]
          }}
          width={screenWidth}
          height={300}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#28B463",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // Consider if this is appropriate for your data
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View style={Mystyle.tableContainer}>
        <View style={Mystyle.row}>
          <Text style={[Mystyle.cell, { backgroundColor: "#48B463", textAlign: 'center', fontWeight: "bold", color: "#fff" }]}>Date</Text>
          <Text style={[Mystyle.cell, { backgroundColor: "#F8C471", textAlign: 'center', fontWeight: "bold" }]}>Depense Total</Text>
        </View>
        {donnees.map((donnee, index) => (
          <View key={index} style={Mystyle.row}>
            <Text style={[Mystyle.cell, { backgroundColor: "#48B463", textAlign: "center", color: "#fff" }]}>{donnee.date}</Text>
            <Text style={[Mystyle.cell, { backgroundColor: "#F8C471", textAlign: "center" }]}>{donnee.somme_motant} F</Text>
          </View>
        ))}
      </View>

      <View style={{ marginHorizontal: 20, padding: 10, flexDirection: "row", }}>
        <Ionicons name='help-circle' color={"orange"} size={40} />
        <Text style={{ textAlign: "justify" }}>Le graphe et le tableau ci-dessus vous illustre vos depenses total quodienne par jour pour les 5 deniers Pour plus de datail voir l'historique de vos depense</Text>
      </View>
      <View style={{ marginHorizontal: 20, padding: 10, flexDirection: "row", }}>
        <Ionicons name='information-circle' color={"orange"} size={40} />
        <Text style={{ textAlign: "justify" }}>Opter pour un meilleur suivie en definant un budget pour chacune de vos categories de depense</Text>
      </View>

      <View>
        <TouchableOpacity
          style={{ backgroundColor: "#48B463", padding: 20, width: screenWidth * 0.8, borderRadius: 10, marginTop: 20, zIndex: 2, flexDirection: 'row', justifyContent: "center" }}
          onPress={() => navigation.navigate('addExp')}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Nouvelle dépense</Text>
        </TouchableOpacity>
      </View>

      <FAB
        icon={({ size, color }) => (
          <Ionicons name="reload" size={size} color={color} />
        )}
        onPress={() => { refreshPage(); fetchData(); }}
        style={[Mystyle.fab, { bottom: 110, backgroundColor: "#F2F3F4" }]}
      />
    </View>
  );
}

const Mystyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    width: screenWidth,
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
    paddingVertical: 10,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});