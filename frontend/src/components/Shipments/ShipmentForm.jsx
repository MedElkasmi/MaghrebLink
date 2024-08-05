import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';

const ShipmentForm = () => {
    const [drivers, setDrivers] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [driverSearchQuery, setDriverSearchQuery] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [shipmentDate, setShipmentDate] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchShipment = async () => {
                try {
                    const response = await axiosInstance.get(`/shipments/${id}`);
                    const shipment = response.data;
                    setDriverId(shipment.driver_id);
                    setOrigin(shipment.origin);
                    setDestination(shipment.destination);
                    setShipmentDate(shipment.shipment_date);
                } catch (error) {
                    console.error('Error fetching shipment:', error);
                }
            };
            fetchShipment();
        }
    }, [id]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axiosInstance.get(`/drivers/search?query=${driverSearchQuery}`);
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };
        if (driverSearchQuery) {
            fetchDrivers();
        } else {
            setDrivers([]);
        }
    }, [driverSearchQuery]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const shipmentData = {
                driver_id: driverId,
                origin,
                destination,
                shipment_date: shipmentDate,
            };

            if (id) {
                await axiosInstance.put(`/shipments/${id}`, shipmentData);
                toast.success('Shipment updated successfully!');
                navigate('/admin/shipments');
            } else {
                await axiosInstance.post('/shipments', shipmentData);
                toast.success('Shipment added successfully!');
                navigate('/admin/shipments');
            }
        } catch (err) {
            console.error('Error saving shipment:', err);
            setError('Error saving shipment');
            toast.error('Error saving shipment');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{id ? 'Edit Shipment' : 'Add Shipment'}</h4>
            </div>
            <div className="card-body">
                <div className="form-validation">
                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="driver">
                                        Driver
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            id="driver"
                                            type="text"
                                            value={driverSearchQuery}
                                            onChange={(e) => setDriverSearchQuery(e.target.value)}
                                            placeholder="Search for drivers..."
                                            required
                                        />
                                        <ul className="list-group">
                                            {drivers.map((driver) => (
                                                <li
                                                    key={driver.id}
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => setDriverId(driver.id)}
                                                >
                                                    {driver.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="invalid-feedback">Please select a driver.</div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="origin">
                                        Origin
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            id="origin"
                                            type="text"
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter the origin.</div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="destination">
                                        Destination
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            id="destination"
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter the destination.</div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="shipmentDate">
                                        Shipment Date
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            id="shipmentDate"
                                            type="date"
                                            value={shipmentDate}
                                            onChange={(e) => setShipmentDate(e.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter the shipment date.</div>
                                    </div>
                                </div>
                                {error && <p>{error}</p>}
                                <button type="submit" className="btn light btn-primary">{id ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShipmentForm;
