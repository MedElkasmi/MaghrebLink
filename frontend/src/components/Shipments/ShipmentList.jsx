import React, { useEffect, useContext, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../Pagination'
import { GlobalStateContext } from '../../context/GlobalState.jsx'
import ShipmentForm from './ShipmentForm.jsx'

const ShipmentList = () => {
  const {
    shipments,
    setShipments,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    drivers,
    setDrivers,
    totalPages,
    setTotalPages,
  } = useContext(GlobalStateContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axiosInstance.get('/shipments', {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        })
        setShipments(response.data.data)
        setTotalPages(response.data.meta.last_page)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching shipments:', error)
        setLoading(false)
      }
    }

    fetchShipments()
  }, [currentPage, searchQuery, setShipments])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/shipments/${id}`)
      setShipments(shipments.filter((shipment) => shipment.id !== id))
      toast.error('Shipment Deleted successfully!')
    } catch (error) {
      console.error('Error deleting shipment:', error)
    }
  }

  const exportToCSV = () => {
    const csvData = shipments.map((shipment) => ({
      id: shipment.id,
      driver: shipment.driver_id,
      status: shipment.status,
    }))
    return csvData
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Arrived':
        return <span className="badge light badge-success">Arrived</span>
      case 'In-Transit':
        return <span className="badge light badge-primary">In-Transit</span>
      case 'Pending':
        return <span className="badge light badge-warning">Pending</span>
      case 'Available':
        return <i className="fa fa-circle text-success me-1" />
      case 'Not Available':
        return <i className="fa fa-circle text-danger me-1" />
      default:
        return <span>{status}</span>
    }
  }

  if (loading) {
    return <div>Loading...</div>
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
                    placeholder="Search shipments"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink
                    data={exportToCSV()}
                    filename={'shipments.csv'}
                    className="btn btn-primary"
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
                    + Schedule Shipment
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th>
                        <strong>Tracking Number</strong>
                      </th>
                      <th>
                        <strong>Driver</strong>
                      </th>
                      <th>
                        <strong>Shipment Date</strong>
                      </th>
                      <th>
                        <strong>Arrive Date</strong>
                      </th>
                      <th>
                        <strong>Status</strong>
                      </th>
                      <th>
                        <strong></strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id}>
                        <td>{shipment.tracking_number}</td>
                        <td>
                          {getStatusBadge(shipment.driver_id.status)}{' '}
                          {shipment.driver_id.fullname}
                        </td>
                        <td>{shipment.shipment_date}</td>
                        <td>{shipment.arrived_date}</td>
                        <td>{getStatusBadge(shipment.status)}</td>
                        <td>
                          <div className="d-flex">
                            <Link
                              to={`/admin/shipments/edit/${shipment.id}`}
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fa fa-pencil" />
                            </Link>
                            <button
                              onClick={() => handleDelete(shipment.id)}
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
        </div>
        <ShipmentForm />
      </div>
    </div>
  )
}

export default ShipmentList
