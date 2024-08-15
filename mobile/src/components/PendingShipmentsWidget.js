import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import axiosInstance from '../api/axiosConfig'
import { MaterialIcons } from '@expo/vector-icons'

const PendingShipmentsWidget = ({ driverId }) => {
  const [pendingCount, setPendingount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/shipments/${driverId}/pending`
        )
        setPendingount(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pending shipments count:', error)
        setLoading(false)
      }
    }
    fetchPendingCount()
  }, [driverId])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.widget}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="pending-actions" size={40} color="#4CAF50" />
      </View>
      <Text style={styles.title}>Pending</Text>
      <Text style={styles.count}>{pendingCount}</Text>
    </View>
  )
}

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
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PendingShipmentsWidget
