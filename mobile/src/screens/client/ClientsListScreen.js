import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import axiosInstance from '../../services/axiosConfig'
import { MaterialIcons } from '@expo/vector-icons'

const ClientListScreen = ({ navigation }) => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchClients(page)
  }, [page])

  const fetchClients = async (pageNumber) => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(`/clients?page=${pageNumber}`)
      const newClients = response.data.data

      if (newClients.length === 0) {
        setHasMore(false)
      } else {
        setClients((prevClients) => [...prevClients, ...newClients])
        setFilteredClients((prevFiltered) => [...prevFiltered, ...newClients])
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
      alert('Error fetching clients: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearch(text)
    const filteredData = clients.filter(
      (item) =>
        item.fullname.toLowerCase().includes(text.toLowerCase()) ||
        item.whatsapp.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredClients(filteredData)
  }

  const loadMoreClients = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ClientDetails', { clientId: item.id })
      }
      key={item.id.toString()}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={30} color="#fff" />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.fullname}</Text>
          <Text style={styles.itemSubtitle}>Whatsapp: {item.whatsapp}</Text>
          <Text style={styles.itemSubtitle}>Country: {item.country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderFooter = () => {
    if (!loading) return null
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#2E91A4"
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.searchAddContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for clients"
            value={search}
            onChangeText={handleSearch}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewClient')}
          >
            <MaterialIcons name="add" color="#fff" />
            <Text style={styles.addButtonText}>Add Client</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreClients}
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
  },
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  searchAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E91A4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
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
    backgroundColor: '#2E91A4',
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

export default ClientListScreen
