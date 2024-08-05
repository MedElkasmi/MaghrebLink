import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Registration request
      const response = await axiosInstance.post('/register', {
        fullname: fullname,
        username: username,
        password: password,
        whatsapp: whatsapp
      });

      if (response.data) {
        setSuccess('Registration successful. You can now log in.');
        setError('');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Error registering:', err);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  const handleloginRedirect = () => {
    navigate('/login');
  };

  const pageWrapperStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  };

  const cardStyle = {
    maxWidth: '400px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff'
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={cardStyle}>
        <div className="logo-header">
          <a href="/" className="logo">
            <img src="images/logo/logo-full.png" alt="" className="width-230 light-logo" />
          </a>
          <a href="/" className="logo">
            <img src="images/logo/logofull-white.png" alt="" className="width-230 dark-logo" />
          </a>
        </div>
        <h3 className="form-title m-t0">Sign Up</h3>
        <div className="dz-separator-outer m-b5">
          <div className="dz-separator bg-primary style-liner"></div>
        </div>
        <p>Enter your personal details below:</p>
        <form className="dz-form py-2" onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <input
              name="fullname"
              className="form-control"
              placeholder="Full Name"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%' }}
            />
          </div>
          <div className="form-group mt-3">
            <input
              name="userame"
              className="form-control"
              placeholder="User Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%' }}
            />
          </div>
          <div className="form-group mt-3">
            <input
              name="password"
              className="form-control"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%' }}
            />
          </div>
          <div className="form-group mt-3 mb-3">
            <input
              name="confirmPassword"
              className="form-control"
              placeholder="Re-type Your Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%' }}
            />
          </div>
          <div className="form-group mt-3 mb-3">
            <input
              name="whatsapp"
              className="form-control"
              placeholder="Whatsapp Number"
              type="number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%' }}
            />
          </div>
          <div className="form-group clearfix text-left">
            <button className="btn btn-primary outline gray" type="button" onClick={handleloginRedirect}>Back</button>
            <button className="btn btn-primary float-end" type="submit">Submit</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
