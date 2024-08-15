import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import { MaterialIcons } from '@expo/vector-icons';

const GoodsDetailsScreen = ({ route }) => {
  const { goodsId } = route.params;
  const [goods, setGoods] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [client, setClient] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    const fetchGoodsDetails = async () => {
      try {
        const response = await axiosInstance.get(`/goods/${goodsId}`);
        const goodsData = response.data;
        setGoods(goodsData);

        // Fetch shipment details
        const shipmentResponse = await axiosInstance.get(`/shipments/${goodsData.shipment_id}`);
        setShipment(shipmentResponse.data);

        // Fetch client details
        const clientResponse = await axiosInstance.get(`/clients/${goodsData.client_id}`);
        setClient(clientResponse.data);

        // Fetch receiver details
        const receiverResponse = await axiosInstance.get(`/clients/${goodsData.receiver_id}`);
        setReceiver(receiverResponse.data);
      } catch (error) {
        console.error('Error fetching goods details:', error);
      }
    };
    fetchGoodsDetails();
  }, [goodsId]);

  if (!goods || !shipment || !client || !receiver) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Goods Details</Text>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="local-shipping" size={24} color="#333" />
          <Text style={styles.cardTitle}>Shipment Details</Text>
        </View>
        <Text style={styles.value}>Tracking Number: {shipment.tracking_number}</Text>
        <Text style={styles.value}>Status: {shipment.status}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="person" size={24} color="#333" />
          <Text style={styles.cardTitle}>Client Details</Text>
        </View>
        <Text style={styles.value}>Name: {client.fullname}</Text>
        <Text style={styles.value}>Email: {client.whatsapp}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="person" size={24} color="#333" />
          <Text style={styles.cardTitle}>Receiver Details</Text>
        </View>
        <Text style={styles.value}>Name: {receiver.fullname}</Text>
        <Text style={styles.value}>Email: {receiver.whatsapp}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="category" size={24} color="#333" />
          <Text style={styles.cardTitle}>Goods Details</Text>
        </View>
        <Text style={styles.value}>Product Code: {goods.product_code}</Text>
        <Text style={styles.value}>Category: {goods.category}</Text>
        <Text style={styles.value}>Quantity: {goods.quantity}</Text>
        <Text style={styles.value}>Weight: {goods.weight}</Text>
        <Text style={styles.value}>Storage Location: {goods.storage_location}</Text>
      </View>
    </ScrollView>
  );
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
});

export default GoodsDetailsScreen;
