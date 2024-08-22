import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native'
import axiosInstance from '../../services/axiosConfig'
import { MaterialIcons } from '@expo/vector-icons'

const ShipmentDetailsScreen = ({ route }) => {
  const { shipmentId } = route.params
  const [shipment, setShipment] = useState(null)

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await axiosInstance.get(`/shipments/${shipmentId}`)
        const shipmentData = response.data
        setShipment(shipmentData)
      } catch (error) {
        console.error('Error fetching shipment details:', error)
      }
    }
    fetchShipmentDetails()
  }, [shipmentId])

  if (!shipment) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="local-shipping" size={64} color="#fff" />
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Tracking Number</Text>
        <Text style={styles.value}>{shipment.tracking_number}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Driver</Text>
        <Text style={styles.value}>{shipment.driver_id}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(shipment.status) },
            ]}
          />
          <Text style={styles.value}>{shipment.status}</Text>
        </View>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Date of Shipment</Text>
        <Text style={styles.value}>{shipment.shipment_date}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Date of Arrive</Text>
        <Text style={styles.value}>{shipment.shipment_date}</Text>
      </View>

      <Image
        style={styles.qrCode}
        source={{ uri: `https://example.com/${shipment.qr_code}` }} // Replace with your actual QR code URL
      />
    </ScrollView>
  )
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'In-Transit':
      return 'blue'
    case 'Arrived':
      return 'green'
    case 'Pending':
      return 'yellow'
    default:
      return 'gray'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailSection: {
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  qrCode: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
})

export default ShipmentDetailsScreen
