import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RemovedShipmentList = () => {
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
                axiosInstance.get('/shipments/removed', {
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
    if (!id) return 'Unknown Driver';
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

  const handleRestore = async (id) => {
    try {
      await axiosInstance.patch(`/shipments/${id}/restore`);
      setShipments(shipments.filter(shipment => shipment.id !== id));
      toast.success('Shipment restored successfully!');
    } catch (error) {
      console.error('Error restoring shipment:', error);
    }
  };

  const handleForceDelete = async (id) => {
    try {
      await axiosInstance.delete(`/shipments/${id}/force-delete`);
      setShipments(shipments.filter(shipment => shipment.id !== id));
      toast.error('Shipment permanently deleted!');
    } catch (error) {
      console.error('Error permanently deleting shipment:', error);
    }
  };


  const exportToCSV = () => {
    const csvData = shipments.map(shipment => ({
      id: shipment.id,
      client_id: shipment.client_id,
      driver_id: shipment.driver_id,
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      tracking_number: shipment.tracking_number,
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
                <h4 className="heading mb-0">Removed Shipments</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search removed shipments"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink data={exportToCSV()} filename={"removed_shipments.csv"} className="btn btn-primary">
                    Export
                  </CSVLink>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}>
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                          <input type="checkbox" className="form-check-input" id="checkAll" required="" />
                          <label className="form-check-label" htmlFor="checkAll" />
                        </div>
                      </th>
                        <th><strong>ID</strong></th>
                        <th><strong>Tracking Number</strong></th>
                        <th><strong>Driver</strong></th>
                        <th><strong>Origin</strong></th>
                        <th><strong>Destination</strong></th>
                        <th><strong>Shipment Date</strong></th>
                        <th><strong>Arrive Date</strong></th>
                        <th><strong>Actions</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.length > 0 ? shipments.map((shipment) => (
                      <tr key={shipment.id}>
                        <td>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input type="checkbox" className="form-check-input" id={`customCheckBox${shipment.id}`} required="" />
                            <label className="form-check-label" htmlFor={`customCheckBox${shipment.id}`} />
                          </div>
                        </td>
                        <td><strong>{shipment.id}</strong></td>
                        <td>{shipment.tracking_number}</td>
                        <td>{getDriverName(shipment.driver_id)}</td>
                        <td>{shipment.origin}</td>
                        <td>{shipment.destination}</td>
                        <td>{shipment.shipment_date}</td>
                        <td>{shipment.arrived_date}</td>
                        <td>
                          <div className="d-flex">
                            <button onClick={() => handleRestore(shipment.id)} className="btn btn-primary shadow btn-xs sharp me-1">
                              <i className="fa fa-undo" />
                            </button>
                            <button onClick={() => handleForceDelete(shipment.id)} className="btn btn-danger shadow btn-xs sharp">
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="9">No removed shipments found.</td>
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
};

export default RemovedShipmentList;
