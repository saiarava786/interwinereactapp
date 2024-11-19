import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    onPageChange(page - 1); 
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage + 1} 
      onChange={handlePageChange}
      color="primary"
    />
  );
};

export default Pagination;
