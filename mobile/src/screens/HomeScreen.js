import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import StartShipment from '../components/widgets/StartShipment'
import LocationFetcher from '../services/LocationFetcher'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Image
          source={require('../assets/images/car_shipment.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>Turn your location on</Text>
        <Text style={styles.subText}>
          Your location info is needed to track shipments and ensure accurate
          delivery.
        </Text>

        <StartShipment />
        <LocationFetcher />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 70,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
})

export default HomeScreen
