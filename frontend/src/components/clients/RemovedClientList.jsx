import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RemovedClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRemovedClients = async () => {
      try {
        const response = await axiosInstance.get(`/clients/removed`, {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        });
        setClients(response.data.data || []); // Handle cases where data is undefined
        setTotalPages(response.data.meta.last_page || 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching removed clients:', error);
        setLoading(false);
      }
    };

    fetchRemovedClients();
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
      await axiosInstance.patch(`/clients/${id}/restore`);
      setClients(clients.filter(client => client.id !== id));
      toast.success('Client restored successfully!');
    } catch (error) {
      console.error('Error restoring client:', error);
    }
  };

  const handleForceDelete = async (id) => {
    try {
      await axiosInstance.delete(`/clients/${id}/force-delete`);
      setClients(clients.filter(client => client.id !== id));
      toast.error('Client permanently deleted!');
    } catch (error) {
      console.error('Error permanently deleting client:', error);
    }
  };

  const exportToCSV = () => {
    const csvData = clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      status: client.status,
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
                <h4 className="heading mb-0">Removed Clients</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search removed clients"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink data={exportToCSV()} filename={"removed_clients.csv"} className="btn btn-primary">
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
                      <th><strong>Client Name</strong></th>
                      <th><strong>Whatsapp Number</strong></th>
                      <th><strong>Country</strong></th>
                      <th><strong>City</strong></th>
                      <th><strong>Address</strong></th>
                      <th><strong />Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.length > 0 ? clients.map((client) => (
                      <tr key={client.id}>
                        <td>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input type="checkbox" className="form-check-input" id={`customCheckBox${client.id}`} required="" />
                            <label className="form-check-label" htmlFor={`customCheckBox${client.id}`} />
                          </div>
                        </td>
                        <td><strong>{client.id}</strong></td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="images/avatar/1.jpg" className="rounded-lg me-2" width={24} alt="" />
                            <span className="w-space-no">{client.fullname}</span>
                          </div>
                        </td>
                        <td>{client.whatsapp} </td>
                        <td>{client.country}</td>
                        <td>{client.city}</td>
                        <td>{client.address}</td>
                        <td>
                          <div className="d-flex">
                            <button onClick={() => handleRestore(client.id)} className="btn btn-primary shadow btn-xs sharp me-1">
                              <i className="fa fa-undo" />
                            </button>
                            <button onClick={() => handleForceDelete(client.id)} className="btn btn-danger shadow btn-xs sharp">
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8">No removed clients found.</td>
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

export default RemovedClientList;
