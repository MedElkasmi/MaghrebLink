import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import axiosInstance from '../../services/axiosConfig' // Ensure this is correctly set up

const StartShipment = () => {
  const [isGo, setIsGo] = useState(true) // Initial state is "Go"

  const createShipment = async () => {
    if (isGo) {
      try {
        const ongoingShipment = await axiosInstance.get('/shipments/active')

        // Check if there's already an active shipment
        if (ongoingShipment.data && ongoingShipment.data.length > 0) {
          Alert.alert('Active Shipment', 'You already have an active shipment.')
          setIsGo(false)
          return
        }

        // Confirm to start a new shipment
        Alert.alert(
          'Confirm Shipment Start',
          'Are you sure you want to start a new shipment?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Start Shipment',
              onPress: async () => {
                try {
                  const response = await axiosInstance.post(
                    '/shipments/store',
                    {
                      driver_id: 2,
                      shipment_date: new Date().toISOString().split('T')[0], // Date in 'YYYY-MM-DD' format
                      status: 'In-Transit',
                    }
                  )
                  console.log('Shipment created:', response.data)
                  setIsGo(false)
                } catch (error) {
                  console.error('Error creating shipment:', error)
                  Alert.alert(
                    'Error',
                    'Failed to create shipment. Please try again.'
                  )
                }
              },
            },
          ]
        )
      } catch (error) {
        console.error('Error checking for ongoing shipment:', error)
        Alert.alert(
          'Error',
          'Failed to check for ongoing shipments. Please try again.'
        )
      }
    } else {
      finishShipment() // Call the function to finish the shipment
    }
  }

  const finishShipment = async () => {
    try {
      const ongoingShipment = await axiosInstance.get('/shipments/active')

      // Check if there's an active shipment to finish
      if (ongoingShipment.data && ongoingShipment.data.length > 0) {
        const shipmentId = ongoingShipment.data[0].id
        const arrived_date = new Date().toISOString().split('T')[0]

        // Confirm to finish the current shipment
        Alert.alert(
          'Confirm Shipment Finish',
          'Are you sure you want to finish the current shipment?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Finish Shipment',
              onPress: async () => {
                try {
                  const response = await axiosInstance.put(
                    `/shipments/finish/${shipmentId}`,
                    {
                      driver_id: 2,
                      arrived_date: arrived_date,
                      status: 'Arrived',
                    }
                  )
                  console.log('Shipment finished:', response.data)
                  setIsGo(true) // Reset the button to "Go"
                } catch (error) {
                  console.error('Error finishing shipment:', error)
                  Alert.alert(
                    'Error',
                    'Failed to finish shipment. Please try again.'
                  )
                }
              },
            },
          ]
        )
      } else {
        Alert.alert(
          'No Active Shipment',
          'There is no active shipment to finish.'
        )
      }
    } catch (error) {
      console.error('Error checking for ongoing shipment:', error)
      Alert.alert(
        'Error',
        'Failed to check for ongoing shipments. Please try again.'
      )
    }
  }

  return (
    <TouchableOpacity onPress={createShipment} style={styles.container}>
      <View style={styles.track}>
        <Text style={styles.text}>
          {isGo ? 'Start Tracking' : 'Finish Tracking'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  track: {
    backgroundColor: '#cb422d',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    padding: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default StartShipment
