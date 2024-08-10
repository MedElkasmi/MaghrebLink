import { useEffect, useContext, useState } from 'react'
import axiosInstance from '../axiosConfig'
import { GlobalStateContext } from '../context/GlobalState'

const useGoods = (currentPage, searchQuery) => {
  const { goods, setGoods } = useContext(GlobalStateContext)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axiosInstance.get('/goods', {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        })
        setGoods(response.data.data)
        setTotalPages(response.data.meta.last_page)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching goods:', error)
        setLoading(false)
      }
    }

    fetchGoods()
  }, [currentPage, searchQuery, setGoods])

  return { goods, loading, totalPages }
}

export default useGoods
