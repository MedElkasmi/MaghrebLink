import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { toast } from 'react-toastify'

const DriverForm = () => {
  const [fullname, setfullName] = useState('')
  const [whatsapp, setwhatsapp] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchDriver = async () => {
        try {
          const { data: driver } = await axiosInstance.get(`/drivers/${id}`)
          setfullName(driver.name)
          setwhatsapp(driver.whatsapp)
        } catch (error) {
          console.error('Error fetching driver:', error)
        }
      }
      fetchDriver()
    }
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        fullname,
        whatsapp,
        status: id ? undefined : 'Pending',
      }
      const method = id ? axiosInstance.put : axiosInstance.post
      const url = id ? `/drivers/${id}` : '/drivers/new'

      await method(url, payload)
      toast.success(`Driver ${id ? 'updated' : 'added'} successfully!`)
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'adding'} driver:`, error)
      toast.error(`Error ${id ? 'updating' : 'adding'} driver`)
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
          Driver Information
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
                  onChange={(e) => setwhatsapp(e.target.value)}
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
export default DriverForm
