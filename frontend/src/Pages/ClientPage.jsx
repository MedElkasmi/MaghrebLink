import React from 'react'
import { Routes, Route} from 'react-router-dom'
import ClientList from '../components/clients/ClientList'
import ClientForm from '../components/clients/ClientForm'
import RemovedClientList from '../components/clients/RemovedClientList'

const ClientPage = () => {
  return (

    <div className="container">
        <div className="row">
            <div className="col-xl-12">
              <Routes>
                  <Route path="/" element={<ClientList />} />
                  <Route path="/store" element={<ClientForm />} />
                  <Route path="/edit/:id" element={<ClientForm />} />
                  <Route path="/removed" element={<RemovedClientList />} />
              </Routes>
            </div>
        </div>
    </div>
  )
}

export default ClientPage
