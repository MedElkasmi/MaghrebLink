import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import { MaterialIcons } from '@expo/vector-icons';

const ShipmentDetailsScreen = ({ route }) => {
  const { shipmentId } = route.params;
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await axiosInstance.get(`/shipments/${shipmentId}`);
        const shipmentData = response.data;
        setShipment(shipmentData);
      } catch (error) {
        console.error('Error fetching shipment details:', error);
      }
    };
    fetchShipmentDetails();
  }, [shipmentId]);

  if (!shipment) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shipment Details</Text>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="local-shipping" size={24} color="#333" />
          <Text style={styles.cardTitle}>Tracking Number</Text>
        </View>
        <Text style={styles.value}>{shipment.tracking_number}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="location-on" size={24} color="#333" />
          <Text style={styles.cardTitle}>Origin</Text>
        </View>
        <Text style={styles.value}>{shipment.origin}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="location-city" size={24} color="#333" />
          <Text style={styles.cardTitle}>Destination</Text>
        </View>
        <Text style={styles.value}>{shipment.destination}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="event" size={24} color="#333" />
          <Text style={styles.cardTitle}>Status</Text>
        </View>
        <Text style={styles.value}>{shipment.status}</Text>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(shipment.status) }]} />
          <Text style={styles.statusText}>{shipment.status}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="date-range" size={24} color="#333" />
          <Text style={styles.cardTitle}>Date of Shipment</Text>
        </View>
        <Text style={styles.value}>{shipment.shipment_date}</Text>
      </View>


    </ScrollView>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'in transit':
      return 'orange';
    case 'delivered':
      return 'green';
    case 'pending':
      return 'blue';
    case 'canceled':
      return 'red';
    default:
      return 'gray';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#555',
  },
  qrCode: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default ShipmentDetailsScreen;
