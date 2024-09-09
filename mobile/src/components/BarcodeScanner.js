import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert, // Import Alert component
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import axiosInstance from '../services/axiosConfig'

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState('') // State to store scanned barcode
  const [shipmentData, setShipmentData] = useState(null) // State to store fetched shipment data
  const [isCameraAuthorized, setIsCameraAuthorized] = useState(false)

  // Function to request camera permission
  async function requestCameraPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan barcodes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted')
          setIsCameraAuthorized(true)
        } else {
          console.log('Camera permission denied')
        }
      } else {
        // iOS permissions handled differently; assume permission is granted for simplicity
        setIsCameraAuthorized(true)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // Check camera permission on component mount
  useEffect(() => {
    requestCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`Barcode data: ${data}`)
    setScannedData(data)
    fetchShipmentDetails(data)
  }

  const fetchShipmentDetails = async (trackingNumber) => {
    try {
      const response = await axiosInstance.get(`shipments/${trackingNumber}`)
      const shipmentData = response.data
      setShipmentData(shipmentData) // Store fetched data in state

      // Show an alert with the fetched shipment data
      Alert.alert(
        'Shipment Details Fetched',
        `Tracking Number: ${shipmentData.tracking_number}\n
        Status: ${shipmentData.status}\n
        Driver ID: ${shipmentData.driver_id}\n
        Shipment Date: ${shipmentData.shipment_date}\n
        Arrived Date: ${shipmentData.arrived_date}`,

        [{ text: 'OK' }]
      )

      console.log(shipmentData)
    } catch (error) {
      console.error('Error fetching shipment details:', error)
    }
  }

  if (!isCameraAuthorized) {
    return (
      <View style={styles.container}>
        <Text>Camera not authorized</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  resultContainer: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 18,
  },
})

export default BarcodeScanner
