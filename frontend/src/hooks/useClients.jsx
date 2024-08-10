// hooks/useClients.jsx
import { useEffect, useContext, useState } from 'react'
import axiosInstance from '../axiosConfig'
import { GlobalStateContext } from '../context/GlobalState'

const useClients = (currentPage, searchQuery) => {
  const { clients, setClients } = useContext(GlobalStateContext)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients', {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        })
        setClients(response.data.data)
        setTotalPages(response.data.meta.last_page)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching clients:', error)
        setLoading(false)
      }
    }

    fetchClients()
  }, [currentPage, searchQuery, setClients])

  return { clients, loading, totalPages }
}

export default useClients
