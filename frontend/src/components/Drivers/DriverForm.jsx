import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const DriverForm = () => {
    const [fullname, setfullName] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchDriver = async () => {
                try {
                    const response = await axiosInstance.get(`/drivers/${id}`);
                    setfullName(response.data.name);
                    setwhatsapp(response.data.whatsapp);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching driver:', error);
                    setLoading(false);
                }
            };
            fetchDriver();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (id) {
            try {
                await axiosInstance.put(`/drivers/${id}`, {
                    fullname,
                    whatsapp,
                });
                toast.success('Driver updated successfully!');
            } catch (error) {
                console.error('Error updating driver:', error);
                toast.error('Error updating driver');
            }
        } else {
            try {
                await axiosInstance.post('/drivers', {
                  fullname,
                  whatsapp,
                });
                toast.success('Driver added successfully!');
                navigate('/admin/drivers');
            } catch (error) {
                console.error('Error adding driver:', error);
                toast.error('Error adding driver');
            }
        }    
        setLoading(false);
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
                        type="text"
                        value={fullname}
                        onChange={(e) => setfullName(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a username.
                      </div>
                    </div>
                  </div>


                  <div className="mb-3 row">
                    <label
                      className="col-lg-4 col-form-label"
                      htmlFor="validationCustom03"
                    >
                      Whatsapp Number
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="validationCustom03"
                        type="text"
                        value={whatsapp}
                        onChange={(e) => setwhatsapp(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a Whatsapp number.
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
export default DriverForm;