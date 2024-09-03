import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axiosInstance from '../../services/axiosConfig'
import { Picker } from '@react-native-picker/picker'

const AddGoodScreen = ({ navigation }) => {
  const [senderClients, setSenderClients] = useState('')
  const [receiverClients, setReceiverClients] = useState('')
  const [selectedSenderId, setSelectedSenderId] = useState(null)
  const [selectedReceiverId, setSelectedReceiverId] = useState(null)
  const [weight, setWeight] = useState('')
  const [storageLocation, setStorageLocation] = useState('Alhoceima') // Default value
  const [senderSuggestions, setSenderSuggestions] = useState([])
  const [receiverSuggestions, setReceiverSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchSender = async (query) => {
    if (query.length > 1) {
      setLoading(true)
      try {
        const response = await axiosInstance.get(`/clients/search?q=${query}`)
        setSenderSuggestions(response.data)
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSearchReceiver = async (query) => {
    if (query.length > 1) {
      setLoading(true)
      try {
        const response = await axiosInstance.get(`/clients/search?q=${query}`)
        setReceiverSuggestions(response.data)
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSelectSenderClient = (client) => {
    setSenderClients(client.fullname)
    setSelectedSenderId(client.id)
    setSenderSuggestions([])
  }

  const handleSelectReceiverClient = (client) => {
    setReceiverClients(client.fullname)
    setSelectedReceiverId(client.id)
    setReceiverSuggestions([])
  }

  const handleAddGood = async () => {
    try {
      const response = await axiosInstance.post('/goods/store', {
        client_id: selectedSenderId,
        receiver_id: selectedReceiverId,
        weight: weight,
        storage_location: storageLocation,
        status: 'unshipped',
      })
      if (response.status === 201) {
        alert('Goods added successfully!')
        navigation.goBack()
      } else {
        alert('Failed to add goods')
      }
    } catch (error) {
      console.error('Error adding goods:', error)
      alert('Error adding goods: ' + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/loading_goods.png')}
        style={styles.logo}
      />

      {/* Client Sender Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#4A90E2"
          style={styles.icon}
        />
        <TextInput
          placeholder="Client Sender"
          value={senderClients}
          onChangeText={(text) => {
            setSenderClients(text)
            handleSearchSender(text)
          }}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Sender Suggestions Dropdown */}
      {senderSuggestions.length > 0 && (
        <FlatList
          data={senderSuggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSenderClient(item)}>
              <Text style={styles.suggestionItem}>{item.fullname}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.suggestionsContainer}
        />
      )}

      {/* Client Receiver Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#4A90E2"
          style={styles.icon}
        />
        <TextInput
          placeholder="Client Receiver"
          value={receiverClients}
          onChangeText={(text) => {
            setReceiverClients(text)
            handleSearchReceiver(text)
          }}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Receiver Suggestions Dropdown */}
      {receiverSuggestions.length > 0 && (
        <FlatList
          data={receiverSuggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectReceiverClient(item)}>
              <Text style={styles.suggestionItem}>{item.fullname}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.suggestionsContainer}
        />
      )}

      {/* Weight Input - Numbers Only */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="scale-outline"
          size={20}
          color="#4A90E2"
          style={styles.icon}
        />
        <TextInput
          placeholder="Weight (Kg)"
          value={weight}
          onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))} // Only accept numbers
          style={styles.input}
          keyboardType="numeric" // Show numeric keyboard
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Storage Location Dropdown */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#4A90E2"
          style={styles.icon}
        />
        <Picker
          selectedValue={storageLocation}
          onValueChange={(itemValue) => setStorageLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Alhoceima" value="Alhoceima" />
          <Picker.Item label="Nador" value="Nador" />
          <Picker.Item label="Granada" value="Granada" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddGood}>
        <Text style={styles.buttonText}>Add Goods</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  logo: {
    width: 270,
    height: 270,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  suggestionsContainer: {
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: -10,
    marginBottom: 20,
    paddingHorizontal: 10,
    elevation: 3,
    zIndex: 1,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
})

export default AddGoodScreen
