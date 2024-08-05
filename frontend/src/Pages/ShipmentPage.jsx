import React from 'react'
import { Routes, Route} from 'react-router-dom'
import ShipmentList from '../components/Shipments/ShipmentList'
import ShipmentForm from '../components/Shipments/ShipmentForm'
import RemovedShipmentList from '../components/Shipments/RemovedShipmentList'

const ShipmentPage = () => {
    return (
        <div className="container">
                <div className="row">
                        <div className="col-xl-12">
                            <Routes>
                                    <Route path="/" element={<ShipmentList />} />
                                    <Route path="/edit/:id" element={<ShipmentForm/>} />
                                    <Route path="/store" element={<ShipmentForm />} />
                                    <Route path="/removed" element={<RemovedShipmentList />} />
                            </Routes>
                        </div>
                </div>
        </div>
    )
}

export default ShipmentPage