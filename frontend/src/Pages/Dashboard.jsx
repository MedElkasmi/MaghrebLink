import React from 'react'
import ShipmentsOverview from '../components/Dashboard/ShipmentsOverview'
import Project from '../components/Dashboard/Project'
import Earning from '../components/Dashboard/Earning'
import EarningsChart from '../charts/EarningsChart'

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-4">
          <Project />
        </div>
        <div className="col-xl-8">
          <EarningsChart />
        </div>
        <div className="col-xl-12">
          <ShipmentsOverview />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
