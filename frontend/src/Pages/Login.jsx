import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosConfig'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('roles', JSON.stringify(response.data.roles))

        if (response.data.roles.includes('Admin')) {
          navigate('/admin/dashboard')
        } else if (response.data.roles.includes('Client')) {
          navigate('/client/tracking')
        } else {
          navigate('/home')
        }
      } else {
        setError('Login failed: Invalid token received')
      }
    } catch (err) {
      console.error('Error logging in:', err)
      setError('Invalid credentials')
    }
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }

  const handleForgetPasswordRedirect = () => {
    navigate('/forget-password')
  }

  return (
    <div
      style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <div className="text-center">
            <h3 className="title">Sign In</h3>
            <p>Sign in to your account to start using MaghrebLink</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 text-dark">Username</label>
              <input
                type="email"
                className="form-control form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4 position-relative">
              <label className="mb-1 text-dark">Password</label>
              <input
                type="password"
                id="dz-password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="show-pass eye">
                <i className="fa fa-eye-slash" />
                <i className="fa fa-eye" />
              </span>
            </div>
            <div className="form-row d-flex justify-content-between mt-4 mb-2">
              <div className="mb-4">
                <div className="form-check custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox1"
                  />
                  <label className="form-check-label" htmlFor="customCheckBox1">
                    Remember my preference
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  className="btn-link text-primary"
                  onClick={handleForgetPasswordRedirect}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <div className="text-center mb-4">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
            <p className="text-center">
              Not registered?
              <button
                type="button"
                className="btn-link text-primary"
                onClick={handleRegisterRedirect}
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
      <div
        style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src="../src/assets/images/listing_shipment.png"
            alt=""
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
