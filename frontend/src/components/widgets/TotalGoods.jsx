import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust the path based on your project structure

const TotalGoods = () => {
    const [totalGoods, setTotalGoods] = useState(0);

    useEffect(() => {
        const fetchTotalGoods = async () => {
            try {
                const response = await axiosInstance.get('/goods/total');
                setTotalGoods(response.data.total); // Adjust based on the actual API response structure
            } catch (error) {
                console.error('Error fetching total Goods:', error);
            }
        };

        fetchTotalGoods();
    }, []);

    return (
        <div className="widget-stat card">
            <div className="card-body p-4">
                <h4 className="card-title">Total Goods</h4>
                <h3>{totalGoods}</h3>
                <div className="progress mb-2">
                    <div className="progress-bar progress-animated bg-primary" style={{ width: '80%' }}></div>
                </div>
                <small>80% Increase in 20 Days</small>
            </div>
        </div>
    );
};

export default TotalGoods;