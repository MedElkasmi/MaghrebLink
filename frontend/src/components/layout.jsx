import React from 'react';
import { Outlet } from "react-router";
import Header from '../components/common/Header';
import NavHeader from '../components/common/NavHeader';
import Sidebar from '../components/common/Sidebar';
import Widgets from './widgets';

const Layout = () => {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    // Check if the user has the 'Admin' role
    const isAdmin = roles.includes('Admin');

    return (
        <div>
            <NavHeader />
            <Header />
            {isAdmin && <Sidebar />}

            <div className="content-body" style={{ display: 'flex', flexDirection: 'column',minHeight: '100vh' }}>
                <div className="container-fluid">
                    <div className="row">
                        {isAdmin && <Widgets />}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
