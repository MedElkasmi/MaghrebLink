import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'

const GoodsForm = () => {
  const [shipments, setShipments] = useState([])
  const [clients, setClients] = useState([])
  const [shipmentId, setShipmentId] = useState('')
  const [senderClientId, setSenderClientId] = useState('')
  const [receiverClientId, setReceiverClientId] = useState('')
  const [searchShipmentQuery, setSearchShipmentQuery] = useState('')
  const [searchSenderClientQuery, setSearchSenderClientQuery] = useState('')
  const [searchReceiverClientQuery, setSearchReceiverClientQuery] = useState('')
  const [weight, setWeight] = useState(0)
  const [storageLocation, setStorageLocation] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id: goodId } = useParams()

  useEffect(() => {
    if (goodId) {
      const fetchGood = async () => {
        try {
          const response = await axiosInstance.get(`/goods/${goodId}`)
          const good = response.data
          setShipmentId(good.shipment_id)
          setSenderClientId(good.client_id)
          setReceiverClientId(good.receiver_client_id)
          setWeight(good.weight)
          setStorageLocation(good.storage_location)
        } catch (error) {
          console.error('Error fetching good:', error)
        }
      }
      fetchGood()
    }
  }, [goodId])

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axiosInstance.get(`/shipments/search`, {
          params: { query: searchShipmentQuery },
        })
        const options = response.data.map((shipment) => ({
          value: shipment.id,
          label: `${shipment.origin} to ${shipment.destination}`,
        }))
        setShipments(options)
      } catch (error) {
        console.error('Error fetching shipments:', error)
      }
    }
    fetchShipments()
  }, [searchShipmentQuery])

  useEffect(() => {
    const fetchClients = async (query, setClientsFunction) => {
      try {
        const response = await axiosInstance.get(`/clients/search`, {
          params: { query },
        })
        const options = response.data.map((client) => ({
          value: client.id,
          label: `${client.fullname} (${client.country})`,
        }))
        setClientsFunction(options)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }

    if (searchSenderClientQuery) {
      fetchClients(searchSenderClientQuery, setClients)
    }

    if (searchReceiverClientQuery) {
      fetchClients(searchReceiverClientQuery, setClients)
    }
  }, [searchSenderClientQuery, searchReceiverClientQuery])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const goodData = {
        shipment_id: shipmentId,
        client_id: senderClientId,
        receiver_id: receiverClientId,
        weight,
        storage_location: storageLocation,
      }

      if (goodId) {
        await axiosInstance.put(`/goods/${goodId}`, goodData)
        toast.success('Good updated successfully!')
      } else {
        await axiosInstance.post('/goods/store', goodData)
        toast.success('Good added successfully!')
      }
      navigate('/admin/goods')
    } catch (err) {
      console.error('Error saving good:', err)
      setError('Error saving good')
      toast.error('Error saving good')
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
          Good insertion
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
                <label className="form-label">
                  Client Sender<span className="text-danger">*</span>
                </label>
                <Select
                  id="senderClient"
                  options={clients}
                  value={
                    clients.find((client) => client.value === senderClientId) ||
                    null
                  }
                  onInputChange={setSearchSenderClientQuery}
                  onChange={(selected) =>
                    setSenderClientId(selected ? selected.value : '')
                  }
                  placeholder="Search for sender clients..."
                  isClearable
                  required
                />
                <div className="invalid-feedback">
                  Please select a sender client.
                </div>
              </div>

              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Client Receiver<span className="text-danger">*</span>
                </label>
                <Select
                  id="receiverClient"
                  options={clients}
                  value={
                    clients.find(
                      (client) => client.value === receiverClientId
                    ) || null
                  }
                  onInputChange={setSearchReceiverClientQuery}
                  onChange={(selected) =>
                    setReceiverClientId(selected ? selected.value : '')
                  }
                  placeholder="Search for receiver clients..."
                  isClearable
                  required
                />
                <div className="invalid-feedback">
                  Please select a receiver client.
                </div>
              </div>

              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Shipment<span className="text-danger">*</span>
                </label>
                <Select
                  id="shipment"
                  options={shipments}
                  value={
                    shipments.find(
                      (shipment) => shipment.value === shipmentId
                    ) || null
                  }
                  onInputChange={setSearchShipmentQuery}
                  onChange={(selected) =>
                    setShipmentId(selected ? selected.value : '')
                  }
                  placeholder="Search for shipments..."
                  isClearable
                  required
                />
                <div className="invalid-feedback">
                  Please select a shipment.
                </div>
              </div>

              <div className="col-xl-6 mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  required
                />
              </div>

              <div className="col-xl-6 mb-3">
                <label htmlFor="storageLocation" className="form-label">
                  Storage Location <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  id="storageLocation"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                  required
                >
                  <option value="">Select Storage Location</option>
                  <option value="Alhoceima">Alhoceima</option>
                  <option value="Nador">Nador</option>
                </select>
              </div>
            </div>
            <div>
              {error && <p>{error}</p>}
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

export default GoodsForm
