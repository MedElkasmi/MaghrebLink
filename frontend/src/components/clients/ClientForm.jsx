// src/components/clients/ClientForm.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { toast } from 'react-toastify'

const ClientForm = ({ onAddClient }) => {
  const [fullname, setfullName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const response = await axiosInstance.get(`/clients/${id}`)
          const client = response.data
          setfullName(client.fullname)
          setWhatsapp(client.whatsapp)
          setCountry(client.country)
          setCity(client.city)
          setAddress(client.address)
        } catch (error) {
          console.error('Error fetching client:', error)
        }
      }

      fetchClient()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ClientData = {
      fullname: fullname,
      whatsapp: whatsapp,
      country: country,
      city: city,
      address: address,
    }
    try {
      let newClient
      if (id) {
        await axiosInstance.put(`/clients/${id}`, ClientData)
        toast.success('Client updated successfully!')

        const response = await axiosInstance.get(`/clients/${id}`)
        newClient = response.data
      } else {
        const response = await axiosInstance.post('/clients/add', ClientData)
        toast.success('Client added successfully!')

        newClient = response.data
      }

      if (onAddClient) {
        onAddClient(newClient)
      }
      navigate('/admin/clients')
    } catch (err) {
      console.error('Error saving client:', err)
      setError('Error saving client')
      toast.error('Error saving client')
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
          Client insertion
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
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={fullname}
                  onChange={(e) => setfullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  whatsapp<span className="text-danger">*</span>
                </label>
                <input
                  type="phone"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder=""
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
                <select
                  className="default-select style-1 form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option data-display="Select">Please select</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  City<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput4"
                  placeholder=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-12 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  Address<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput4"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
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

export default ClientForm
