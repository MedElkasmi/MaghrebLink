// src/ClientList.js
import React, { useContext } from 'react'
import axiosInstance from '../../axiosConfig'
import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../Pagination'
import useClients from '../../hooks/useClients.jsx'
import { GlobalStateContext } from '../../context/GlobalState.jsx'
import ClientForm from './ClientForm.jsx'

const ClientList = () => {
  const {
    clients,
    setClients,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  } = useContext(GlobalStateContext)

  const { loading, totalPages } = useClients(currentPage, searchQuery)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleAddClient = async (newClient) => {
    try {
      // Fetch the specific newly added good
      const response = await axiosInstance.get(`/clients/${newClient.id}`)
      const fetchedClient = response.data

      // Update the state with the new good at the top of the list
      setClients((prevGoods) => [fetchedClient, ...prevGoods])
    } catch (error) {
      console.error('Error fetching the new client:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/clients/${id}`)
      setClients(clients.filter((client) => client.id !== id))
      toast.success('Client deleted successfully!')
    } catch (error) {
      toast.error('Error deleting client: ' + error.message)
    }
  }

  const exportToCSV = () => {
    return clients.map((client) => ({
      id: client.id,
      name: client.fullname,
      email: client.email,
      phone: client.phone,
      address: client.address,
      status: client.status,
    }))
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive active-projects style-1">
              <div
                className="tbl-caption"
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search clients"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink
                    data={exportToCSV()}
                    filename={'clients.csv'}
                    className="btn btn-info"
                  >
                    Export
                  </CSVLink>
                </div>
                <div>
                  <a
                    className="btn btn-primary"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                  >
                    + Add Client
                  </a>
                </div>
              </div>
              <table
                className="table table-responsive-md"
                style={{ textAlign: 'center' }}
              >
                <thead>
                  <tr>
                    <th>
                      <strong>Client Name</strong>
                    </th>
                    <th>
                      <strong>Whatsapp Number</strong>
                    </th>
                    <th>
                      <strong>Country</strong>
                    </th>
                    <th>
                      <strong>City</strong>
                    </th>
                    <th>
                      <strong>Address</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="images/avatar/1.jpg"
                            className="rounded-lg me-2"
                            width={24}
                            alt=""
                          />
                          <span className="w-space-no">{client.fullname}</span>
                        </div>
                      </td>
                      <td>{client.whatsapp}</td>
                      <td>{client.country}</td>
                      <td>{client.city}</td>
                      <td>{client.address}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            to={`/admin/clients/edit/${client.id}`}
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fa fa-pencil" />
                          </Link>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        <ClientForm onAddClient={handleAddClient} />
      </div>
    </div>
  )
}

export default ClientList
