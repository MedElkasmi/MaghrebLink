import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DeliveredShipmentsWidget from '../components/DeliveredShipmentsWidget';
import PendingShipmentsWidget from '../components/PendingShipmentsWidget';
import TotalGoodsWeightWidget from '../components/TotalGoodsWeightWidget';

const HomeScreen = () => {
  const driverId = 2; // Replace with the actual driver ID

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>MaghrebExpress</Text>
      
      <View style={styles.widgetContainer}>
        <DeliveredShipmentsWidget driverId={driverId} />
        <PendingShipmentsWidget driverId={driverId} />
        <TotalGoodsWeightWidget driverId={driverId} />
        <PendingShipmentsWidget driverId={driverId} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
