import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { GlobalStateProvider } from './context/GlobalState.jsx'

import routes from './routesConfig.jsx'

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <ErrorBoundary>
          {routes}
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </GlobalStateProvider>
  )
}

export default App
