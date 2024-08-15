// src/screens/AddClientScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from '../api/axiosConfig';

const AddClientScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleAddClient = async () => {
    try {
      const response = await axiosInstance.post('/clients', {
        fullname,
        whatsapp,
        country,
        city,
        address,
      });
      if (response.status === 201) {
        alert('Client added successfully!');
        navigation.goBack(); // Navigate back to the previous screen
      } else {
        alert('Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Client</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" style={styles.icon} />
        <TextInput
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="logo-whatsapp" size={20} color="#4A90E2" style={styles.icon} />
        <TextInput
          placeholder="WhatsApp"
          value={whatsapp}
          onChangeText={setWhatsapp}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="earth-outline" size={20} color="#4A90E2" style={styles.icon} />
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#4A90E2" style={styles.icon} />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="home-outline" size={20} color="#4A90E2" style={styles.icon} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4A90E2',
    textTransform: 'uppercase',
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
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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
});

export default AddClientScreen;
