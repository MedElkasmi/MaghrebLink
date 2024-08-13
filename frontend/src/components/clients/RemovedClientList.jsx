import React, { useEffect, useContext } from 'react'
import axiosInstance from '../../axiosConfig'
import { toast } from 'react-toastify'
import Pagination from '../Pagination'
import { GlobalStateContext } from '../../context/GlobalState.jsx'
const RemovedClientList = () => {
  const {
    clients,
    setClients,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    totalPages,
    setTotalPages,
  } = useContext(GlobalStateContext)

  useEffect(() => {
    const fetchRemovedClients = async () => {
      try {
        const response = await axiosInstance.get(`/clients/removed`, {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        })
        setClients(response.data.data || [])
        setTotalPages(response.data.meta.last_page || 1)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching removed clients:', error)
        setLoading(false)
      }
    }

    fetchRemovedClients()
  }, [currentPage, searchQuery, setClients])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleRestore = async (id) => {
    try {
      await axiosInstance.patch(`/clients/${id}/restore`)
      setClients(clients.filter((client) => client.id !== id))
      toast.success('Client restored successfully!')
    } catch (error) {
      console.error('Error restoring client:', error)
    }
  }

  const handleForceDelete = async (id) => {
    try {
      await axiosInstance.delete(`/clients/${id}/force-delete`)
      setClients(clients.filter((client) => client.id !== id))
      toast.success('Client permanently deleted!')
    } catch (error) {
      console.error('Error permanently deleting client:', error)
    }
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
                }}
              >
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search removed clients"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-responsive-md"
                  style={{ textAlign: 'center' }}
                >
                  <thead>
                    <tr>
                      <th>
                        <strong>ID</strong>
                      </th>
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
                    {clients.length > 0 ? (
                      clients.map((client) => (
                        <tr key={client.id}>
                          <td>
                            <strong>{client.id}</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="images/avatar/1.jpg"
                                className="rounded-lg me-2"
                                width={24}
                                alt=""
                              />
                              <span className="w-space-no">
                                {client.fullname}
                              </span>
                            </div>
                          </td>
                          <td>{client.whatsapp} </td>
                          <td>{client.country}</td>
                          <td>{client.city}</td>
                          <td>{client.address}</td>
                          <td>
                            <div className="d-flex">
                              <button
                                onClick={() => handleRestore(client.id)}
                                className="btn btn-primary shadow btn-xs sharp me-1"
                              >
                                <i className="fa fa-undo" />
                              </button>
                              <button
                                onClick={() => handleForceDelete(client.id)}
                                className="btn btn-danger shadow btn-xs sharp"
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No removed clients found.</td>
                      </tr>
                    )}
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
        </div>
      </div>
    </div>
  )
}

export default RemovedClientList
