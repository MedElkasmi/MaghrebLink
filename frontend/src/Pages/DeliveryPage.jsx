import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DeliveryList from '../components/Deliveries/DeliveryList';
import DeliveryForm from '../components/Deliveries/DeliveryForm';

const DeliveryPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <Routes>
                        <Route path="/" element={<DeliveryList />} />
                        <Route path="/store" element={<DeliveryForm />} />
                        <Route path="/edit/:id" element={<DeliveryForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
