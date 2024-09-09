import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import axiosInstance from '../../services/axiosConfig'
import { MaterialIcons } from '@expo/vector-icons'

const GoodsDetailsScreen = ({ route }) => {
  const { goodsId } = route.params
  const [goods, setGoods] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoodsDetails = async () => {
      try {
        const response = await axiosInstance.get(`/goods/${goodsId}`)
        const goodsData = response.data
        setGoods(goodsData)
      } catch (error) {
        console.error('Error fetching goods details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGoodsDetails()
  }, [goodsId])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!goods || !goods.client || !goods.receiver) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading data. Please try again later.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="inventory" size={64} color="#fff" />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="person" size={24} color="#2E91A4" />
          <Text style={styles.cardTitle}>Client Details</Text>
        </View>
        <Text style={styles.value}>
          <Text style={styles.label}>Name:</Text> {goods.client.fullname}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>WhatsApp:</Text> {goods.client.whatsapp}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Country:</Text> {goods.client.country}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>City:</Text> {goods.client.city}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Address:</Text> {goods.client.address}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="person" size={24} color="#2E91A4" />
          <Text style={styles.cardTitle}>Receiver Details</Text>
        </View>
        <Text style={styles.value}>
          <Text style={styles.label}>Name:</Text> {goods.receiver.fullname}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>WhatsApp:</Text> {goods.receiver.whatsapp}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Country:</Text> {goods.receiver.country}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>City:</Text> {goods.receiver.city}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Address:</Text> {goods.receiver.address}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="category" size={24} color="#2E91A4" />
          <Text style={styles.cardTitle}>Goods Details</Text>
        </View>
        <Text style={styles.value}>
          <Text style={styles.label}>Product Code:</Text> {goods.product_code}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Status</Text> {goods.status}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Weight:</Text> {goods.weight} Kg
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Price:</Text> ${goods.price}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Storage Location:</Text>{' '}
          {goods.storage_location}
        </Text>
      </View>
    </ScrollView>
  )
}

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
  header: {
    backgroundColor: '#2E91A4',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E91A4',
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
    fontWeight: '800',
    marginLeft: 10,
    color: '#2E91A4',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  label: {
    fontWeight: '800',
    color: '#2E91A4',
  },
})

export default GoodsDetailsScreen
