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
import { Ionicons } from '@expo/vector-icons'

const GoodsListScreen = ({ navigation }) => {
  const [goods, setGoods] = useState([])
  const [filteredGoods, setFilteredGoods] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchGoods(page)
  }, [page])

  const fetchGoods = async (pageNumber) => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(`/goods?page=${pageNumber}`)
      const newGoods = response.data.data

      if (newGoods.length === 0) {
        setHasMore(false)
      } else {
        setGoods((prevGoods) => [...prevGoods, ...newGoods])
        setFilteredGoods((prevFiltered) => [...prevFiltered, ...newGoods])
      }
    } catch (error) {
      alert('Error fetching goods: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearch(text)
    const filteredData = goods.filter(
      (item) =>
        item.product_code.toLowerCase().includes(text.toLowerCase()) ||
        item.storage_location.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredGoods(filteredData)
  }

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('GoodsDetails', { goodsId: item.id })}
      key={item.id.toString()}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="cube-outline" size={30} color="#fff" />
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.infoRow}>
            <Ionicons
              name="scale-outline"
              size={25}
              color="#2E91A4"
              style={styles.infoIcon}
            />

            <Text style={styles.cardText}> Weight: {item.weight} Kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={27}
              color="#2E91A4"
              style={styles.infoIcon}
            />
            <Text style={styles.cardText}>
              Storage Location: {item.storage_location}
            </Text>
          </View>
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
            placeholder="Search for any goods info"
            value={search}
            onChangeText={handleSearch}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewGoods')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Goods</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredGoods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
})

export default GoodsListScreen
