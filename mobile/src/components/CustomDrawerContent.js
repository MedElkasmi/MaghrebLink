import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={require('../../src/assets/truck.png')} style={styles.logo} />
        <Text style={styles.title}>MaghrebExpress</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemList}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <Ionicons name="home" size={20} color="#4A90E2" style={styles.icon} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Shipments"
          icon={({ color, size }) => (
            <Ionicons name="boat-sharp" size={20} color="#4A90E2" style={styles.icon} />
          )}
          onPress={() => props.navigation.navigate('Shipments')}
        />
        <DrawerItem
          label="Clients"
          icon={({ color, size }) => (
            <Ionicons name="person" size={20} color="#4A90E2" style={styles.icon} />
          )}
          onPress={() => props.navigation.navigate('New Client')}
        />

        <DrawerItem
          label="Goods"
          icon={({ color, size }) => (
            <Ionicons name="list" size={20} color="#4A90E2" style={styles.icon} />
          )}
          onPress={() => props.navigation.navigate('Goods')}
        />
        {/* Add more drawer items as needed */}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2', // Base color
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    shadowColor: '#000',
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
    backgroundColor: '#fff', // Adding a white background to make the logo stand out
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  drawerItemList: {
    marginTop: 20,
  },
});

export default CustomDrawerContent;
