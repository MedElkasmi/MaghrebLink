import React, { useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';
import axiosInstance from './axiosConfig';

const LocationFetcher = () => {
  useEffect(() => {
    const fetchLocation = () => {
      console.log('Timer triggered');
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Location: latitude=${latitude}, longitude=${longitude}`);

          const data = {
            shipment_id: 301,
            latitude,
            longitude,
            status: "Active"
          };

          axiosInstance.post('/tracking/save', data)
          .then(response => {
            console.log('Location sent to server: ', response.data);
          })
          .catch(error => {
            console.log('Error sending location to server: ', error);
            if (error.response) {
              console.log('Server responded with status:', error.response.status);
              console.log('Response data:', error.response.data);
            } else if (error.request) {
              console.log('Request made but no response received:', error.request);
            } else {
              console.log('Error setting up request:', error.message);
            }
          });
        },
        (error) => {
          console.log('Error getting location: ', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    };

    // Start a timer that runs fetchLocation every 60 seconds
    const intervalId = BackgroundTimer.setInterval(fetchLocation, 60000);

    // Clean up interval on component unmount
    return () => BackgroundTimer.clearInterval(intervalId);
  }, []);

  return null;
};

export default LocationFetcher;
