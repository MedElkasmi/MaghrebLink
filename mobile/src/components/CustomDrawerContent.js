import React, { memo } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'

// Extracted constant styles for color and sizes
const COLORS = {
  primary: '#2E91A4',
  white: '#fff',
  black: '#000',
  lightGray: '#ddd',
}

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    try {
      props.navigation.navigate('Login')
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <Header handleLogout={handleLogout} />
      <DrawerMenuItems navigation={props.navigation} />
    </DrawerContentScrollView>
  )
}

// Separated Header as a sub-component for better readability and reusability
const Header = ({ handleLogout }) => (
  <View style={styles.header}>
    <MaterialIcons name="" size={30} color={COLORS.white} />
    <Text style={styles.title}>User Name</Text>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  </View>
)

// Separated Drawer Items into a sub-component
const DrawerMenuItems = ({ navigation }) => (
  <View style={styles.drawerItemList}>
    <DrawerItem
      label="Statistics"
      icon={({ color, size }) => (
        <MaterialIcons
          name="dashboard"
          size={20}
          color={COLORS.primary}
          style={styles.icon}
        />
      )}
      onPress={() => navigation.navigate('Dashboard')}
    />

    <DrawerItem
      label="Settings"
      icon={({ color, size }) => (
        <MaterialIcons
          name="settings"
          size={20}
          color={COLORS.primary}
          style={styles.icon}
        />
      )}
      onPress={() => navigation.navigate('Dashboard')}
    />
    <DrawerItem
      label="Scanner"
      icon={({ color, size }) => (
        <AntDesign name="barcode" size={20} color={COLORS.primary} />
      )}
      onPress={() => navigation.navigate('BarcodeScanner')}
    />
  </View>
)

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logoutButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  drawerItemList: {
    marginTop: 20,
  },
})

export default memo(CustomDrawerContent)
