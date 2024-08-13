import React, { useEffect, useContext } from 'react'
import axiosInstance from '../../axiosConfig'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../Pagination'
import useDrivers from '../../hooks/useDrivers.jsx'
import { GlobalStateContext } from '../../context/GlobalState.jsx'
import DriverForm from './DriverForm.jsx'

const DriverList = () => {
  const { drivers, setDrivers, currentPage, setCurrentPage } =
    useContext(GlobalStateContext)

  const { loading, totalPages } = useDrivers(currentPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/drivers/${id}`)
      setDrivers(drivers.filter((name) => name.id !== id))
      toast.error('Driver Deleted successfully!')
    } catch (error) {
      console.error('Error deleting driver:', error)
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
                  gap: '20px',
                }}
              >
                <div>
                  <a
                    className="btn btn-primary"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                  >
                    + Add Drivers
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th>
                        <strong>ID</strong>
                      </th>
                      <th>
                        <strong>Full Name</strong>
                      </th>
                      <th>
                        <strong>Whatsapp Number</strong>
                      </th>
                      <th>
                        <strong>Status</strong>
                      </th>
                      <th>
                        <strong />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(drivers) &&
                      drivers.map((driver) => (
                        <tr key={driver.id}>
                          <td>
                            <strong>{driver.id}</strong>
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
                                {driver.fullname}
                              </span>
                            </div>
                          </td>
                          <td>{driver.whatsapp}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-circle text-success me-1" />{' '}
                              {driver.status}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to={`/admin/drivers/edit/${driver.id}`}
                                className="btn btn-primary shadow btn-xs sharp me-1"
                              >
                                <i className="fa fa-pencil" />
                              </Link>
                              <button
                                onClick={() => handleDelete(driver.id)}
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
        <DriverForm />
      </div>
    </div>
  )
}

export default DriverList
