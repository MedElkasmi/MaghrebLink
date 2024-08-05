import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/forgot-password', { email });
      setMessage('Password reset link has been sent to your email');
      setError('');
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setError('Failed to send password reset email');
      setMessage('');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="page-wraper vh-100">
      <div className="browse-job login-style3">
        <div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(images/background/bg6.jpg)', height: '100vh' }}>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white">
              <div className="login-form style-2">
                <div className="card-body">
                  <h3 className="form-title m-t0">Forget Password ?</h3>
                  <div className="dz-separator-outer m-b5">
                    <div className="dz-separator bg-primary style-liner"></div>
                  </div>
                  <p>Enter your e-mail address below to reset your password.</p>
                  <form className="dz-form" onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <input
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group clearfix text-left">
                      <button
                        className="btn btn-primary"
                        id="nav-personal-tab"
                        type="button"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button className="btn btn-primary float-end" type="submit">
                        Submit
                      </button>
                    </div>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
