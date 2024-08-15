import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import axiosInstance from '../api/axiosConfig';
import { Ionicons } from '@expo/vector-icons';

const GoodsListScreen = ({ navigation }) => {
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGoods();
  }, [page]);

  const fetchGoods = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/goods?page=${page}`);
      const newGoods = response.data.data;

      if (newGoods.length === 0) {
        setHasMore(false);
      } else {
        setGoods(prevGoods => [...prevGoods, ...newGoods]);
      }
    } catch (error) {
      console.error('Error fetching goods:', error);
      alert('Error fetching goods: ' + error.message);
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
    <TouchableOpacity onPress={() => navigation.navigate('GoodsDetails', { goodsId: item.id })}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={require('../../src/assets/truck.png')} style={styles.icon} />
          <View>
            <Text style={styles.cardTitle}>Product Code: {item.product_code}</Text>
            <Text style={styles.cardSubTitle}>Category: {item.category}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="scale-outline" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.cardText}>Weight: {item.weight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.cardText}>Storage Location: {item.storage_location}</Text>
          </View>
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
      <View style={styles.header}>
        <Image source={require('../../src/assets/truck.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Goods List</Text>
      </View>
      <FlatList
        data={goods}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  cardTitle: {
    fontSize: 14,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoIcon: {
    marginRight: 5,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default GoodsListScreen;
