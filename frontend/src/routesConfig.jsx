// routesConfig.jsx
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('./Pages/Login'))
const Register = lazy(() => import('./Pages/Register'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))
const ForgetPassword = lazy(() => import('./Pages/ForgetPassword'))
const ClientPage = lazy(() => import('./Pages/ClientPage'))
const ShipmentPage = lazy(() => import('./Pages/ShipmentPage'))
const DriverPage = lazy(() => import('./Pages/DriverPage'))
const GoodsPage = lazy(() => import('./Pages/GoodsPage'))
const TrackingPage = lazy(() => import('./Pages/TrackingPage'))
const DeliveryPage = lazy(() => import('./Pages/DeliveryPage'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const Layout = lazy(() => import('./components/Layout'))

const routes = (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients/*" element={<ClientPage />} />
          <Route path="shipments/*" element={<ShipmentPage />} />
          <Route path="drivers/*" element={<DriverPage />} />
          <Route path="goods/*" element={<GoodsPage />} />
          <Route path="tracking/*" element={<TrackingPage />} />
          <Route path="deliveries/*" element={<DeliveryPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['Client']} />}>
        <Route path="/client" element={<Layout />}>
          <Route path="tracking/*" element={<TrackingPage />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>
)

export default routes
