import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import axiosInstance from '../api/axiosConfig';

const ShipmentListScreen = ({ navigation }) => {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchShipments();
  }, [page]);

  const fetchShipments = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/shipments?page=${page}`);
      const newShipments = response.data.data;

      if (newShipments.length === 0) {
        setHasMore(false);
      } else {
        setShipments(prevShipments => [...prevShipments, ...newShipments]);
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
      alert('Error fetching shipments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ShipmentDetails', { shipmentId: item.id })}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={require('../../src/assets/truck.png')} style={styles.icon} />
          <View>
            <Text style={styles.cardTitle}>{item.tracking_number}</Text>
            <Text style={styles.cardSubTitle}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Origin: {item.origin}</Text>
          <Text style={styles.cardText}>Destination: {item.destination}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#4A90E2" />;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={shipments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 20, // Make the icon circular
    backgroundColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default ShipmentListScreen;
