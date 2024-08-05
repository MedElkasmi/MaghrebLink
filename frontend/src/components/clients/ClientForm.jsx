// src/components/clients/ClientForm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const ClientForm = () => {
  const [fullname, setfullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          
          const response = await axiosInstance.get(`/clients/${id}`);
          const client = response.data;
          setfullName(client.fullname);
          setWhatsapp(client.whatsapp);
          setCountry(client.country);
          setCity(client.city);
          setAddress(client.address);
        } catch (error) {
          console.error('Error fetching client:', error);
        }
      };

      fetchClient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/clients/${id}`, {
          fullname,
          whatsapp,
          country,
          city,
          address,
        });
        toast.success('Client updated successfully!');
      } else {
        await axiosInstance.post('/clients', {
          fullname,
          whatsapp,
          country,
          city,
          address,
        });
        toast.success('Client added successfully!');
      }
      navigate('/admin/clients');
    } catch (err) {
      console.error('Error saving client:', err);
      setError('Error saving client');
      toast.error('Error saving client');
    }
  };

  return (

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{id ? 'Edit Client' : 'Add Client'}</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="validationCustom01"
                        >
                          Full Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            id="validationCustom01"
                            placeholder="Enter a Name.."
                            type="text"
                            value={fullname}
                            onChange={(e) => setfullName(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter Full Name.
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="validationCustom02"
                        >
                          Whatsapp Number <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Your valid whatsapp number.."
                            type="phone"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a Whatsapp Number.
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="validationCustom03"
                        >
                          Country
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            id="validationCustom03"
                            placeholder="Please enter a phone number."
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter Country.
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="validationCustom03"
                        >
                          City
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            id="validationCustom03"
                            placeholder="Please enter a city."
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter an address
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="validationCustom03"
                        >
                          Address
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            id="validationCustom03"
                            placeholder="Please enter a phone number."
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter an address
                          </div>
                        </div>
                      </div>
                      {error && <p>{error}</p>}
                      <button type="submit" class="btn light btn-primary">{id ? 'Update' : 'Create'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

  );
};

export default ClientForm;
