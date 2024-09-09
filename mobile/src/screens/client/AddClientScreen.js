import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image, // Import Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axiosInstance from '../../services/axiosConfig'
import { Picker } from '@react-native-picker/picker'

const AddClientScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')

  const handleAddClient = async () => {
    try {
      const response = await axiosInstance.post('/clients/add', {
        fullname,
        whatsapp,
        country,
        city,
        address,
      })
      if (response.status === 201) {
        alert('Client added successfully!')
        navigation.goBack() // Navigate back to the previous screen
      } else {
        alert('Failed to add client')
      }
    } catch (error) {
      console.error('Error adding client:', error)
      alert('Error adding client: ' + error.message)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo at the top */}
      <Image
        source={require('../../assets/images/happy_client.png')} // Replace with the actual path to your logo image
        style={styles.logo}
      />
      {/* Form Input Fields */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#2E91A4"
          style={styles.icon}
        />
        <TextInput
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="logo-whatsapp"
          size={20}
          color="#2E91A4"
          style={styles.icon}
        />
        <TextInput
          placeholder="WhatsApp"
          value={whatsapp}
          onChangeText={(text) => setWhatsapp(text.replace(/[^0-9]/g, ''))}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="earth-outline"
          size={20}
          color="#2E91A4"
          style={styles.icon}
        />
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Morocco" value="Morocco" />
          <Picker.Item label="Spain" value="Spain" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#2E91A4"
          style={styles.icon}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="home-outline"
          size={20}
          color="#2E91A4"
          style={styles.icon}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddClient}>
        <Text style={styles.buttonText}>Add Client</Text>
      </TouchableOpacity>
    </ScrollView>
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
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    marginBottom: 30, // Space between logo and form
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2E91A4',
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
  picker: {
    flex: 1,
    height: 40,
    color: '#333',
  },
})

export default AddClientScreen
