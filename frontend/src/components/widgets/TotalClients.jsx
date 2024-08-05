import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust the path based on your project structure

const TotalClients = () => {
    const [totalClients, setTotalClients] = useState(0);

    useEffect(() => {
        const fetchTotalClients = async () => {
            try {
                const response = await axiosInstance.get('/clients/total');
                setTotalClients(response.data.total); // Adjust based on the actual API response structure
            } catch (error) {
                console.error('Error fetching total clients:', error);
            }
        };

        fetchTotalClients();
    }, []);

    return (
        <div className="widget-stat card">
            <div className="card-body p-4">
                <h4 className="card-title">Total Clients</h4>
                <h3>{totalClients}</h3>
                <div className="progress mb-2">
                    <div className="progress-bar progress-animated bg-primary" style={{ width: '80%' }}></div>
                </div>
                <small>80% Increase in 20 Days</small>
            </div>
        </div>
    );
};

export default TotalClients;
