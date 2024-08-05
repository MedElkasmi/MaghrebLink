import React from 'react';
import { Routes, Route} from 'react-router-dom';
import DriverList from '../components/Drivers/DriverList';
import DriverForm from '../components/Drivers/DriverForm';

const DriverPage = () => {
    return (
        <div className="container-fluid">
                <div className="row">
                        <div className="col-xl-12">
                            <Routes>
                                    <Route path="/" element={<DriverList />} />
                                    <Route path="/store" element={<DriverForm />} />
                                    <Route path="/edit/:id" element={<DriverForm />} />
                            </Routes>
                        </div>
                </div>
        </div>
    );
};

export default DriverPage