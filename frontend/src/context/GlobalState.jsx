import React, { createContext, useState } from 'react'

// Create the context
export const GlobalStateContext = createContext()

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [clients, setClients] = useState([])
  const [goods, setGoods] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <GlobalStateContext.Provider
      value={{
        clients,
        setClients,
        goods,
        setGoods,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
