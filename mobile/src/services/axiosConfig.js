import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.104:8000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercept requests to include the Bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
