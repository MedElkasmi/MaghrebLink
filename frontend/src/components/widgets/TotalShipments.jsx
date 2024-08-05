import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust the path based on your project structure

const TotalShipments = () => {
    const [totalShipments, setTotalShipments] = useState(0);

    useEffect(() => {
        const fetchTotalShipments = async () => {
            try {
                const response = await axiosInstance.get('/shipments/total');
                setTotalShipments(response.data.total); // Adjust based on the actual API response structure
            } catch (error) {
                console.error('Error fetching total Shipments:', error);
            }
        };

        fetchTotalShipments();
    }, []);

    return (
        <div className="widget-stat card">
            <div className="card-body p-4">
                <h4 className="card-title">Total Shipments</h4>
                <h3>{totalShipments}</h3>
                <div className="progress mb-2">
                    <div className="progress-bar progress-animated bg-primary" style={{ width: '80%' }}></div>
                </div>
                <small>80% Increase in 20 Days</small>
            </div>
        </div>
    );
};

export default TotalShipments;
