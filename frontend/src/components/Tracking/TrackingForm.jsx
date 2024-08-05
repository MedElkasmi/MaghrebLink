import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TrackingForm = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trackingNumber.trim()) {
            // Redirect to the tracking page with the tracking number
            navigate(`/admin/tracking/${trackingNumber.trim()}`);
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                .form-group {
                    margin-bottom: 15px;
                }
                .form-group label {
                    font-weight: bold;
                    margin-bottom: 5px;
                    display: block;
                }
                .form-control {
                    width: 100%;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }
                .btn-primary {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: #fff;
                    cursor: pointer;
                }
                .btn-primary:hover {
                    background-color: #0056b3;
                }
                .map-container {
                    height: 500px;
                    width: 100%;
                }
                `}
            </style>
            <div className="row">
                <div className="col-xl-9">
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title'>Track Shipment Location In Real Time</h4>
                            <MapContainer center={[35.7672700, -5.7997500]} zoom={8} className="map-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[34.0522, -118.2437]}>
                            <Popup>
                                Default Location
                            </Popup>
                        </Marker>
                    </MapContainer>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Track Shipment</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="trackingNumber">Tracking Number</label>
                                    <input
                                        type="text"
                                        id="trackingNumber"
                                        className="form-control"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Track</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
    },
};

export default TrackingForm;
