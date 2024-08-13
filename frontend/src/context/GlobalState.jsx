import React, { createContext, useState } from 'react'

// Create the context
export const GlobalStateContext = createContext()

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [clients, setClients] = useState([])
  const [goods, setGoods] = useState([])
  const [drivers, setDrivers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <GlobalStateContext.Provider
      value={{
        clients,
        setClients,
        goods,
        setGoods,
        drivers,
        setDrivers,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        loading,
        setLoading,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
