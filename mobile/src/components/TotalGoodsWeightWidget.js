import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axiosInstance from '../api/axiosConfig';

const TotalGoodsWeightWidget = ({ driverId }) => {
  const [totalWeight, setTotalWeight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalWeight = async () => {
      try {
        const response = await axiosInstance.get(`/drivers/${driverId}/weight`);
        setTotalWeight(response.data.total_weight);
      } catch (error) {
        console.error('Error fetching total weight:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalWeight();
  }, [driverId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.widget}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="scale" size={40} color="#4CAF50" />
      </View>
      <Text style={styles.title}>Total Weight</Text>
      <Text style={styles.weight}>{totalWeight} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    widget: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
        width: '48%', // Adjust width for grid layout
      },
      iconContainer: {
        marginBottom: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
      weight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default TotalGoodsWeightWidget;
