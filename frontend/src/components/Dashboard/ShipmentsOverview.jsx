import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../axiosConfig';

const ShipmentsOverview = () => {
    const [chartData, setChartData] = useState({
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [
            { name: 'Number of Shipments', data: [] },
            { name: 'Active Shipments', data: [] },
            { name: 'Completed Shipments', data: [] },
        ]
    });
    const [totals, setTotals] = useState({
        totalShipments: 0,
        activeShipments: 0,
        completedShipments: 0,
        pendingShipments: 0
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axiosInstance.get('/shipments/overview');
                const data = response.data;

                setTotals({
                    totalShipments: data.totalShipments,
                    activeShipments: data.activeShipments,
                    completedShipments: data.completedShipments,
                    pendingShipments: data.pendingShipments
                });

                // Populate chart data
                const totalData = [];
                const activeData = [];
                const completedData = [];

                for (let i = 1; i <= 12; i++) {
                    totalData.push(data.monthlyData[i].total);
                    activeData.push(data.monthlyData[i].active);
                    completedData.push(data.monthlyData[i].completed);
                }

                setChartData(prevState => ({
                    ...prevState,
                    series: [
                        { name: 'Number of Shipments', data: totalData },
                        { name: 'Active Shipments', data: activeData },
                        { name: 'Completed Shipments', data: completedData },
                    ]
                }));
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    const chartOptions = {
        chart: {
            id: 'shipments-overview',
            type: 'line'
        },
        xaxis: {
            categories: chartData.categories
        },
        series: chartData.series
    };

    return (
        <div className="card overflow-hidden">
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">Shipments Overview</h4>
            </div>
            <div className="card-body p-0">
                <div id="overviewChart">
                    <Chart options={chartOptions} series={chartData.series} type="bar" height={350} />
                </div>
                <div className="ttl-project">
                    <div className="pr-data">
                        <h5>{totals.totalShipments}</h5>
                        <span>Total Shipments</span>
                    </div>
                    <div className="pr-data">
                        <h5 className="text-primary">{totals.activeShipments}</h5>
                        <span>Active Shipments</span>
                    </div>
                    <div className="pr-data">
                        <h5>{totals.completedShipments}</h5>
                        <span>Completed Shipments</span>
                    </div>
                    <div className="pr-data">
                        <h5 className="text-success">{totals.pendingShipments}</h5>
                        <span>Pending Shipments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentsOverview;
