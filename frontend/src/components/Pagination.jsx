// src/components/Pagination.js
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    const pages = []

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav>
      <ul className="pagination pagination-sm">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i className="la la-angle-left" />
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <i className="la la-angle-right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
