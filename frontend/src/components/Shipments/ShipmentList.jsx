import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShipmentList = () => {
    const [shipments, setShipments] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shipmentResponse, driverResponse] = await Promise.all([
                    axiosInstance.get('/shipments', {
                        params: { page: currentPage, search: searchQuery },
                    }),
                    axiosInstance.get('/drivers')
                ]);

                setShipments(shipmentResponse.data.data);
                setTotalPages(shipmentResponse.data.last_page);
                setDrivers(driverResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, searchQuery]);

    const getDriverName = (id) => {
        const driver = drivers.find(driver => driver.id === id);
        return driver ? driver.fullname : 'Unknown Driver';
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/shipments/${id}`);
            setShipments(shipments.filter(shipment => shipment.id !== id));
            toast.error('Shipment Deleted successfully!');
        } catch (error) {
            console.error('Error deleting shipment:', error);
        }
    };

    const exportToCSV = () => {
        const csvData = shipments.map(shipment => ({
            id: shipment.id,
            driver: getDriverName(shipment.driver_id),
            origin: shipment.origin,
            destination: shipment.destination,
            status: shipment.status,
        }));
        return csvData;
    };

    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const pages = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            let endPage = startPage + maxPagesToShow - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - maxPagesToShow + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Arrived':
                return <span className="badge light badge-success">Arrived</span>;
            case 'Active':
                return <span className="badge light badge-primary">Active</span>;
            case 'Cancelled':
                return <span className="badge light badge-warning">Cancelled</span>;
            default:
                return <span>{status}</span>;
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive active-projects style-1">
                            <div className="tbl-caption" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 className="heading mb-0">Shipments List</h4>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Search shipments"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="form-control"
                                        style={{ maxWidth: '300px' }}
                                    />
                                    <CSVLink data={exportToCSV()} filename={"shipments.csv"} className="btn btn-primary">
                                        Export
                                    </CSVLink>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th><strong>ID</strong></th>
                                            <th><strong>Tracking Number</strong></th>
                                            <th><strong>Driver</strong></th>
                                            <th><strong>Origin</strong></th>
                                            <th><strong>Destination</strong></th>
                                            <th><strong>Shipment Date</strong></th>
                                            <th><strong>Arrive Date</strong></th>
                                            <th><strong>Status</strong></th>
                                            <th><strong>Actions</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(shipments) && shipments.map((shipment) => (
                                            <tr key={shipment.id}>
                                                <td><strong>{shipment.id}</strong></td>
                                                <td>{shipment.tracking_number}</td>
                                                <td>{getDriverName(shipment.driver_id)}</td>
                                                <td>{shipment.origin}</td>
                                                <td>{shipment.destination}</td>
                                                <td>{shipment.shipment_date}</td>
                                                <td>{shipment.arrived_date}</td>
                                                <td>{getStatusBadge(shipment.status)}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`/admin/shipments/edit/${shipment.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                            <i className="fa fa-pencil" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(shipment.id)} className="btn btn-danger shadow btn-xs sharp">
                                                            <i className="fa fa-trash" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <br />
                                <nav>
                                    <ul className="pagination pagination-sm">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                <i className="la la-angle-left" />
                                            </a>
                                        </li>
                                        {getPageNumbers().map(page => (
                                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                <a className="page-link" href="#" onClick={() => handlePageChange(page)}>
                                                    {page}
                                                </a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                                <i className="la la-angle-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShipmentList;
