import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tracking from '../components/Tracking/Tracking'
import TrackingForm from '../components/Tracking/TrackingForm'

const TrackingPage = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
              <Routes>
                  <Route path=":tracking_number" element={<Tracking />} />
                  <Route path="/" element={<TrackingForm />} />
              </Routes>
            </div>
        </div>
    </div>
  )
}

export default TrackingPage
