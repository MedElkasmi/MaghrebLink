import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosInstance from '../services/axiosConfig'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      })

      if (response.status === 200) {
        const { token } = response.data // Assuming the token is returned in response.data.token

        // Store the token securely
        await AsyncStorage.setItem('authToken', token)

        // Navigate to the main app screen
        navigation.navigate('Drawer')
      } else {
        alert('Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed: ' + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/car_shipment.png')} // Replace with your logo path
        style={styles.logo}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Forgot Password?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa', // Light background color
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,

    // Adjust these dimensions based on your logo size
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker text color for better readability
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc', // Subtle border color
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // White background for input fields
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2E91A4', // Blue color for the button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff', // White text for the button
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    color: '#4a90e2', // Matching the button color for the footer text
    marginTop: 15,
  },
})

export default LoginScreen
