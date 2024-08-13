import React, { useContext } from 'react'
import axiosInstance from '../../axiosConfig'
import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../Pagination'
import useGoods from '../../hooks/useGoods.jsx'
import GoodsForm from './GoodsForm.jsx'
import { GlobalStateContext } from '../../context/GlobalState.jsx'

const GoodsList = () => {
  const {
    goods,
    setGoods,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  } = useContext(GlobalStateContext)

  const { loading, totalPages } = useGoods(currentPage, searchQuery)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleAddGood = async (newGood) => {
    try {
      // Fetch the specific newly added good
      const response = await axiosInstance.get(`/goods/${newGood.id}`)
      const fetchedGood = response.data

      // Update the state with the new good at the top of the list
      setGoods((prevGoods) => [fetchedGood, ...prevGoods])
    } catch (error) {
      console.error('Error fetching the new good:', error)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/goods/${id}`)
      setGoods(goods.filter((good) => good.id !== id))
      toast.error('Good Deleted successfully!')
    } catch (error) {
      console.error('Error deleting good:', error)
    }
  }

  const exportToCSV = () => {
    const csvData = goods.map((good) => ({
      id: good.id,
      shipment_tracking_number: good.shipment
        ? good.shipment.tracking_number
        : 'N/A',
      product_code: good.product_code,
      client_id: good.client_id,
      receiver_client_id: good.receiver_client_id,
      weight: good.weight,
      price: good.price,
      storage_location: good.storage_location,
    }))

    return csvData
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
                    placeholder="Search Goods"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink
                    data={exportToCSV()}
                    filename={'goods.csv'}
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
                    + Add Goods
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
                        <strong>Shipment Reference</strong>
                      </th>
                      <th>
                        <strong>Product Code</strong>
                      </th>
                      <th>
                        <strong>Client Sender</strong>
                      </th>
                      <th>
                        <strong>Client Receiver</strong>
                      </th>
                      <th>
                        <strong>Weight (KG)</strong>
                      </th>
                      <th>
                        <strong>Price (MAD)</strong>
                      </th>
                      <th>
                        <strong>Storage Location</strong>
                      </th>
                      <th>
                        <strong>Storage Date</strong>
                      </th>
                      <th>
                        <strong />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {goods.map((good) => (
                      <tr key={good.id}>
                        <td>
                          <strong>{good.id}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="w-space-no">
                              {good.shipment
                                ? good.shipment.tracking_number
                                : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td>{good.product_code}</td>
                        <td>{good.client ? good.client.fullname : 'N/A'}</td>
                        <td>
                          {good.receiver ? good.receiver.fullname : 'N/A'}
                        </td>
                        <td>{good.weight}</td>
                        <td>{good.price}</td>
                        <td>{good.storage_location}</td>
                        <td>
                          {new Date(good.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link
                              to={`/admin/goods/edit/${good.id}`}
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fa fa-pencil" />
                            </Link>
                            <button
                              onClick={() => handleDelete(good.id)}
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
        <GoodsForm onAddGood={handleAddGood} />
      </div>
    </div>
  )
}

export default GoodsList
