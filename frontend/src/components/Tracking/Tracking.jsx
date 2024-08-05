import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Tracking = () => {
    const { tracking_number } = useParams();
    const [trackings, setTrackings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const response = await axiosInstance.get(`/tracking/${tracking_number}`);
                setTrackings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tracking data:', error);
                setLoading(false);
            }
        };
        fetchTrackingData();
    }, [tracking_number]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='row'>
            <div className='col-xl-12'>
                <div className='card'>
                    <div className='card-body'>
                        <h3 className='card-title'>Tracking Information for {tracking_number}</h3>
                        {trackings.length === 0 ? (
                            <p>No tracking information available.</p>
                        ) : (
                            <MapContainer center={[trackings[0].latitude, trackings[0].longitude]} zoom={13} style={{ height: "500px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {trackings.map(tracking => (
                                    <Marker key={tracking.id} position={[tracking.latitude, tracking.longitude]}>
                                        <Popup>
                                            Status: {tracking.status} <br />
                                            Date: {new Date(tracking.created_at).toLocaleString()}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </div>
                    <div className='card-body'>
                    <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackings.map(tracking => (
                                    <tr key={tracking.id}>
                                        <td>{tracking.id}</td>
                                        <td>{tracking.latitude}</td>
                                        <td>{tracking.longitude}</td>
                                        <td>{tracking.status}</td>
                                        <td>{new Date(tracking.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;
