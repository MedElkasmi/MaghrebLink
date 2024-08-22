import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import axiosInstance from '../../services/axiosConfig'

const ShipmentListScreen = ({ navigation }) => {
  const [shipments, setShipments] = useState([])
  const [filteredShipments, setFilteredShipments] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchShipments(page)
  }, [page])

  const fetchShipments = async (pageNumber) => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(`/shipments?page=${pageNumber}`)
      const newShipments = response.data.data

      if (newShipments.length === 0) {
        setHasMore(false)
      } else {
        setShipments((prevShipments) => [...prevShipments, ...newShipments])
        setFilteredShipments((prevFiltered) => [
          ...prevFiltered,
          ...newShipments,
        ])
      }
    } catch (error) {
      console.error('Error fetching shipments:', error)
      alert('Error fetching shipments: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearch(text)
    const filteredData = shipments.filter((item) =>
      item.tracking_number.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredShipments(filteredData)
  }

  const loadMoreShipments = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShipmentDetails', { shipmentId: item.id })
      }
      key={item.id.toString()}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>
            {item.tracking_number.substring(0, 2)}
          </Text>
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.tracking_number}</Text>
          <Text style={styles.itemSubtitle}>Status: {item.status}</Text>
          <Text style={styles.itemSubtitle}>Date: {item.shipment_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderFooter = () => {
    if (!loading) return null
    return (
      <ActivityIndicator
        size="large"
        color="#4A90E2"
        style={styles.loadingIndicator}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/listing_shipment.png')} // Replace with your logo path
          style={styles.logo}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search for any shipment info"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredShipments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreShipments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 170,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
})

export default ShipmentListScreen
