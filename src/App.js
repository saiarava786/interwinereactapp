// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div style={{minHeight: '90vh'}}>
      <AppBar position="static">
        <Toolbar className="toolbar" > 
          <div>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
          </div>
         
      
        </Toolbar>
        
      </AppBar>
      <ToastContainer />
      
      <Routes>
      
        <Route path="/" element={<Dashboard cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
      </div>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body2" color="inherit">
          © 2024 Interwine Technologies / saiarava786
        </Typography>
      </Toolbar>
    
    </Router>
    
  );
};

export default App;
