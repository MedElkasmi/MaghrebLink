import { useEffect, useContext, useState } from 'react'
import axiosInstance from '../axiosConfig'
import { GlobalStateContext } from '../context/GlobalState'

const useDrivers = (currentPage) => {
  const { drivers, setDrivers } = useContext(GlobalStateContext)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosInstance.get('/drivers', {
          params: {
            page: currentPage,
          },
        })
        setDrivers(response.data.data)
        setTotalPages(response.data.last_page)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching drivers:', error)
        setLoading(false)
      }
    }
    fetchDrivers()
  }, [currentPage, setDrivers])

  return { drivers, loading, totalPages }
}

export default useDrivers
