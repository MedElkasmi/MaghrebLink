import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.11.104:8000/api', // Update with your Laravel backend URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
