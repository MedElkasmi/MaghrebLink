import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ForgetPassword from './Pages/ForgetPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/layout.jsx';
import ClientPage from './Pages/ClientPage.jsx';
import ShipmentPage from './Pages/ShipmentPage.jsx';
import DriverPage from './Pages/DriverPage.jsx';
import GoodsPage from './Pages/GoodsPage.jsx';
import TrackingPage from './Pages/TrackingPage.jsx';
import DeliveryPage from './Pages/DeliveryPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
 
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />} >
              <Route path="/admin" element={<Layout />} >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="clients/*" element={<ClientPage />} />
                  <Route path="shipments/*" element={<ShipmentPage />} />
                  <Route path="drivers/*" element={<DriverPage />} />
                  <Route path="goods/*" element={<GoodsPage />} />
                  <Route path="tracking/*" element={<TrackingPage />} />
                  <Route path="deliveries/*" element={<DeliveryPage />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['Client']} />} >
              <Route path="/client" element={<Layout />} >
                  <Route path="tracking/*" element={<TrackingPage />} />
              </Route>
            </Route>
            {/* <Route exact path="/logout" element={<Logout />} /> */}
            {/* <Route exact path={"/*"} element={<NotFound />} /> */}

        </Routes>
        <ToastContainer />
    </Router>
  );
}

export default App;
