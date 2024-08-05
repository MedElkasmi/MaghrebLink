import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeliveryList = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axiosInstance.get('/deliveries', {
                    params: { page: currentPage, search: searchQuery },
                });
                setDeliveries(response.data);
                setTotalPages(response.data.last_page);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching deliveries:', error);
                setLoading(false);
            }
        };
        fetchDeliveries();
    }, [currentPage, searchQuery]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/deliveries/${id}`);
            setDeliveries(deliveries.filter(delivery => delivery.id !== id));
            toast.error('Delivery deleted successfully!');
        } catch (error) {
            console.error('Error deleting delivery:', error);
        }
    };

    const exportToCSV = () => {
        const csvData = deliveries.map(delivery => ({
            id: delivery.id,
            shipment_id: delivery.shipment_id,
            received_by: delivery.received_by,
            signature: delivery.signature,
            proof_of_delivery: delivery.proof_of_delivery,
            created_at: delivery.created_at,
            updated_at: delivery.updated_at,
        }));
        return csvData;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive active-projects style-1">
                            <div className="tbl-caption" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 className="heading mb-0">Deliveries</h4>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Search deliveries"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="form-control"
                                        style={{ maxWidth: '300px' }}
                                    />
                                    <CSVLink data={exportToCSV()} filename={"deliveries.csv"} className="btn btn-primary">
                                        Export
                                    </CSVLink>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Shipment ID</th>
                                            <th>Received By</th>
                                            <th>Signature</th>
                                            <th>Proof of Delivery</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveries.map((delivery) => (
                                            <tr key={delivery.id}>
                                                <td>{delivery.id}</td>
                                                <td>{delivery.shipment_id}</td>
                                                <td>{delivery.received_by}</td>
                                                <td>{delivery.signature}</td>
                                                <td>{delivery.proof_of_delivery}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`/admin/deliveries/edit/${delivery.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                                            <i className="fa fa-pencil" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(delivery.id)} className="btn btn-danger shadow btn-xs sharp">
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
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
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
};

export default DeliveryList;
