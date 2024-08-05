import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DriverList = () => {

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axiosInstance.get('/drivers', {
                    params: {
                      page: currentPage,
                      search: searchQuery,
                    },
                  });
                setDrivers(response.data.data);
                setTotalPages(response.data.last_page);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                setLoading(false);
            }
        };
        fetchDrivers();
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
            await axiosInstance.delete(`/drivers/${id}`);
            setDrivers(drivers.filter(name => name.id !== id));
            toast.error('Driver Deleted successfully!');
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    const exportToCSV = () => {
        const csvData = drivers.map(name => ({
            id: name.id,
            name: name.name,
            age: name.age,
            phone: name.phone,
            license: name.license,
            status: name.status,
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
        return <p>Loading...</p>
    }

    return (
        <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive active-projects style-1">
                <div className="tbl-caption" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="heading mb-0">drivers</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Search drivers"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="form-control"
                      style={{ maxWidth: '300px' }}
                    />
                    <CSVLink data={exportToCSV()} filename={"drivers.csv"} className="btn btn-primary">
                      Export
                    </CSVLink>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th><strong>ID</strong></th>
                        <th><strong>Full Name</strong></th>
                        <th><strong>Whatsapp Number</strong></th>
                        <th><strong>Status</strong></th>
                        <th><strong /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(drivers) && drivers.map((driver) => (
                        <tr key={driver.id}>
                          <td><strong>{driver.id}</strong></td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src="images/avatar/1.jpg" className="rounded-lg me-2" width={24} alt="" />
                              <span className="w-space-no">{driver.fullname}</span>
                            </div>
                          </td>
                          <td>{driver.whatsapp}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-circle text-success me-1" /> {driver.status}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <Link to={`/admin/drivers/edit/${driver.id}`} className="btn btn-primary shadow btn-xs sharp me-1">
                                <i className="fa fa-pencil" />
                              </Link>
                              <button onClick={() => handleDelete(driver.id)} className="btn btn-danger shadow btn-xs sharp">
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

export default DriverList