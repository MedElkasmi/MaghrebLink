import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const CustomTabBar = (props) => {
  return (
    <View style={styles.container}>
      <BottomTabBar {...props} style={styles.tabBar} />
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => {
          // Handle FAB press here (for example, opening a modal or navigation)
          props.navigation.navigate('AddOptions') // Example navigation
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fabButton: {
    position: 'absolute',
    bottom: 30, // Adjust as needed
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
  },
})

export default CustomTabBar
