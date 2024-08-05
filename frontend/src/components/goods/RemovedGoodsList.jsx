import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';

const RemovedGoodsList = () => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const response = await axiosInstance.get('/goods/removed', {
                    params: { page: currentPage, search: searchQuery },
                });
                setGoods(response.data.data);
                setTotalPages(response.data.last_page);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchGoods();
    }, [currentPage, searchQuery]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleRestore = async (id) => {
        try {
            await axiosInstance.patch(`/goods/${id}/restore`);
            setGoods(goods.filter(good => good.id !== id));
            toast.success('Good restored successfully!');
        } catch (error) {
            console.error('Error restoring good:', error);
        }
    };

    const handleForceDelete = async (id) => {
        try {
            await axiosInstance.delete(`/goods/${id}/force-delete`);
            setGoods(goods.filter(good => good.id !== id));
            toast.error('Good permanently deleted!');
        } catch (error) {
            console.error('Error permanently deleting good:', error);
        }
    };

    const exportToCSV = () => {
        const csvData = goods.map(good => ({
            id: good.id,
            shipment_tracking_number: good.shipment ? good.shipment.tracking_number : 'N/A',
            product_code: good.product_code,
            description: good.description,
            quantity: good.quantity,
            weight: good.weight,
            category: good.category,
            price: good.price,
            storage_location: good.storage_location,
            status: good.status,        }));

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
                                <h4 className="heading mb-0">Removed Goods</h4>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Search Goods"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="form-control"
                                        style={{ maxWidth: '300px' }}
                                    />
                                    <CSVLink data={exportToCSV()} filename={"removed_goods.csv"} className="btn btn-primary">
                                        Export
                                    </CSVLink>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th><strong>ID</strong></th>
                                            <th><strong>Shipment Reference</strong></th>
                                            <th><strong>Product Code</strong></th>
                                            <th><strong>Client Sender</strong></th>
                                            <th><strong>Client Receiver</strong></th>
                                            <th><strong>Category</strong></th>
                                            <th><strong>Quantity</strong></th>
                                            <th><strong>Weight</strong></th>
                                            <th><strong>Price</strong></th>
                                            <th><strong>Storage Location</strong></th>
                                            <th><strong>Storage Date</strong></th>
                                            <th><strong /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {goods.length > 0 ? goods.map((good) => (
                                            <tr key={good.id}>
                                                <td><strong>{good.id}</strong></td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="w-space-no">{good.shipment ? good.shipment.tracking_number : 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td>{good.product_code}</td>
                                                <td>{good.client ? good.client.fullname : 'N/A'}</td>
                                                <td>{good.receiver ? good.receiver.fullname : 'N/A'}</td>
                                                <td>{good.category}</td>
                                                <td>{good.quantity}</td>
                                                <td>{good.weight} KG</td>
                                                <td>{good.price}</td>
                                                <td>{good.storage_location}</td>
                                                <td>{new Date(good.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button onClick={() => handleRestore(good.id)} className="btn btn-primary shadow btn-xs sharp me-1">
                                                            <i className="fa fa-undo" />
                                                        </button>
                                                        <button onClick={() => handleForceDelete(good.id)} className="btn btn-danger shadow btn-xs sharp">
                                                            <i className="fa fa-trash" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="12">No removed goods found.</td>
                                            </tr>
                                        )}
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
}

export default RemovedGoodsList;
