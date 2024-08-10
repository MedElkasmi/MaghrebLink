import React from 'react'
import { Outlet } from 'react-router'
import Header from './common/Header'
import NavHeader from './common/NavHeader'
import Sidebar from './common/Sidebar'
import Widgets from './widgets'

const Layout = () => {
  const roles = JSON.parse(localStorage.getItem('roles')) || []

  // Check if the user has the 'Admin' role
  const isAdmin = roles.includes('Admin')

  return (
    <div id="main-wrapper">
      <NavHeader />
      <Header />
      {isAdmin && <Sidebar />}

      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            {isAdmin && <Widgets />}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
