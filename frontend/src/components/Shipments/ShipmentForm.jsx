import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { toast } from 'react-toastify'
import Select from 'react-select'

const ShipmentForm = () => {
  const [drivers, setDrivers] = useState([])
  const [driverId, setDriverId] = useState('')
  const [driverSearchQuery, setDriverSearchQuery] = useState('')
  const [shipmentDate, setShipmentDate] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosInstance.get(
          `/drivers/search?query=${driverSearchQuery}`
        )

        const options = response.data.map((driver) => ({
          value: driver.id,
          label: `${driver.fullname} | (${driver.status})`,
        }))
        setDrivers(options)
      } catch (error) {
        console.error('Error fetching drivers:', error)
      }
    }
    if (driverSearchQuery) {
      fetchDrivers()
    }
  }, [driverSearchQuery])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const shipmentData = {
        driver_id: driverId,
        shipment_date: shipmentDate,
        status: 'Pending',
      }

      if (id) {
        await axiosInstance.put(`/shipments/${id}`, shipmentData)
        toast.success('Shipment updated successfully!')
        navigate('/admin/shipments')
      } else {
        await axiosInstance.post('/shipments', shipmentData)
        toast.success('Shipment added successfully!')
        navigate('/admin/shipments')
      }
    } catch (err) {
      console.error('Error saving shipment:', err)
      setError('Error saving shipment')
      toast.error('Error saving shipment')
    }
  }

  return (
    <div
      className="offcanvas offcanvas-end customeoff"
      tabIndex={-1}
      id="offcanvasExample"
    >
      <div className="offcanvas-header">
        <h5 className="modal-title" id="#gridSystemModal">
          Schedule Shipment
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="offcanvas-body">
        <div className="container-fluid">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Shipment Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Shipment Date"
                  value={shipmentDate}
                  onChange={(e) => setShipmentDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Driver<span className="text-danger">*</span>
                </label>
                <Select
                  id="driver"
                  options={drivers}
                  value={
                    drivers.find((driver) => driver.value === driverId) || null
                  }
                  onInputChange={(value) => setDriverSearchQuery(value)}
                  onChange={(selected) =>
                    setDriverId(selected ? selected.value : '')
                  }
                  placeholder="Search for drivers..."
                  isClearable
                  required
                />
                <div className="invalid-feedback">Please select a Driver.</div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary me-1" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShipmentForm
