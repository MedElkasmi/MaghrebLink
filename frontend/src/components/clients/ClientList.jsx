import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get(`/clients`, {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        });
        setClients(response.data.data);  // Access the data field
        setTotalPages(response.data.meta.last_page);  // Access the meta field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
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
      await axiosInstance.delete(`/clients/${id}`);
      setClients(clients.filter(client => client.id !== id));
      toast.error('Client Deleted successfully!');
    } catch (error) {
      console.error('Error deleting client:', error);
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
                <h4 className="heading mb-0">Clients</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search clients"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                  />
                  <CSVLink data={exportToCSV()} filename={"clients.csv"} className="btn btn-primary">
                    Export
                  </CSVLink>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
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
                    {clients.map((client) => (
                      <tr key={client.id}>
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
                            <Link to={`/admin/clients/edit/${client.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                              <i className="fa fa-pencil" />
                            </Link>
                            <button onClick={() => handleDelete(client.id)} className="btn btn-danger shadow btn-xs sharp">
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
};

export default ClientList;
