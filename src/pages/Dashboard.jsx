import React, { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import { TextField, Grid, CircularProgress, Container } from '@mui/material';

const Dashboard = ({ cart, setCart }) => {
  const [page, setPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 9;

  
  const { products, total, loading } = useFetchProducts(page, itemsPerPage, searchTerm);
  

  const addToCart = (product) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[product.id]?.quantity || 0;
      return {
        ...prevCart,
        [product.id]: { ...product, quantity: currentQuantity + 1 },
      };
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page on search
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <Container>
    
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} onAddToCart={addToCart} cart={cart} />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            currentPage={page - 1} 
            totalItems={total}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setPage(newPage + 1)} 
          />
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
