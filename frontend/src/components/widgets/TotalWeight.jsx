import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const TotalWeight = () => {
    const [totalWeight, setTotalWeight] = useState(0);

    useEffect(() => {
        const fetchTotalWeight = async () => {
            try {
                const response = await axiosInstance.get('/goods/weight');
                const { total } = response.data;
                setTotalWeight(total.toFixed(2)); // Adjust the number of decimal places as needed
            } catch (error) {
                console.error('Error fetching total weight:', error);
            }
        };
        fetchTotalWeight();
    }, []);

    return (
        <div className="widget-stat card">
            <div className="card-body p-4">
                <h4 className="card-title">Total Weight</h4>
                <h3>{totalWeight} KG</h3>
                <div className="progress mb-2">
                    <div className="progress-bar progress-animated bg-primary" style={{ width: '80%' }}></div>
                </div>
                <small>80% Increase in 20 Days</small>
            </div>
        </div>
    );
};

export default TotalWeight;
