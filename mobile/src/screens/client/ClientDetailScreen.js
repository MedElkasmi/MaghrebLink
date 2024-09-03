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

const ClientDetailScreen = ({ route }) => {
  const { clientId } = route.params
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axiosInstance.get(`/clients/${clientId}`)
        const clientData = response.data
        setClient(clientData)
      } catch (error) {
        console.error('Error fetching client details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchClientDetails()
  }, [clientId])

  if (!client) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="people" size={64} color="#fff" />
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{client.fullname}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>WhatsApp</Text>
        <Text style={styles.value}>{client.whatsapp}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.value}>{client.country}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>City</Text>
        <Text style={styles.value}>{client.city}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{client.address}</Text>
      </View>
    </ScrollView>
  )
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
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 15,
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
  qrCode: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
})

export default ClientDetailScreen
