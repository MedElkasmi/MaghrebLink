// FloatingActionButton.js

import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

const FloatingActionButton = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <View style={styles.container}>
      {/* Background overlay */}
      {isOpen && <View style={styles.overlay} />}

      {/* Buttons to add Clients or Goods */}
      {isOpen && (
        <Animatable.View animation="bounceIn" style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonLeft]}
            onPress={() => {
              setIsOpen(false)
              navigation.navigate('NewClient') // Navigate to Add Client Screen
            }}
          >
            <Ionicons name="person-add" size={24} color="#fff" />
            <Text style={styles.buttonText}>Add Client</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonRight]}
            onPress={() => {
              setIsOpen(false)
              navigation.navigate('NewGoods') // Navigate to Add Goods Screen
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Add Goods</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Main Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.7}
      >
        <Ionicons name={isOpen ? 'close' : 'add'} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  buttonLeft: {
    marginRight: 20,
  },
  buttonRight: {
    marginLeft: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
})

export default FloatingActionButton
