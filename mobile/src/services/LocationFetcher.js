import React, { useEffect } from 'react'
import BackgroundTimer from 'react-native-background-timer'
import Geolocation from 'react-native-geolocation-service'
import axiosInstance from './axiosConfig'

const LocationFetcher = ({ isFetching }) => {
  useEffect(() => {
    let intervalId = null

    const fetchLocation = () => {
      console.log('Timer triggered')
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          console.log(`Location: latitude=${latitude}, longitude=${longitude}`)

          const data = {
            shipment_id: 301, // Example shipment_id, update accordingly
            latitude,
            longitude,
            status: 'Active',
          }

          axiosInstance
            .post('/tracking/save', data)
            .then((response) => {
              console.log('Location sent to server: ', response.data)
            })
            .catch((error) => {
              console.log('Error sending location to server: ', error)
            })
        },
        (error) => {
          console.log('Error getting location: ', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      )
    }

    if (isFetching) {
      intervalId = BackgroundTimer.setInterval(fetchLocation, 60000)
    } else if (intervalId) {
      BackgroundTimer.clearInterval(intervalId)
    }

    // Cleanup interval on component unmount or when isFetching changes
    return () => {
      if (intervalId) {
        BackgroundTimer.clearInterval(intervalId)
      }
    }
  }, [isFetching]) // Depend on isFetching to start or stop fetching

  return null // This component does not render anything
}

export default LocationFetcher
