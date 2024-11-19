import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import { Container, Button } from '@mui/material';

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const removedItemName = updatedCart[id]?.title || 'Item'; 
      delete updatedCart[id];
  
      toast.error(`${removedItemName} removed from the cart!`, { position: 'top-right' });
  
      return updatedCart;
    });
  };
  

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id]) {
        updatedCart[id].quantity = newQuantity;
      }
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) {
      
      toast.error('Your cart is empty! Please add items before checking out.', {
        position: 'top-right',
      });
    } else {
      
      toast.success('Your order is booked!', { position: 'top-right' });
      setCart({});
      navigate('/'); 
    }
  };


  const handleClearCart = () => {

    if (Object.keys(cart).length === 0) {
      toast.error('Your cart is already empty!', {
        position: 'top-right',
      });
    }
    else{
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart({});
      toast.success("Cart has been cleared!", { position: 'top-right' });
    }

  }

  };
  

  return (
    <Container>
      <Cart 
        cart={cart} 
        onRemoveItem={handleRemoveItem} 
        onUpdateQuantity={handleUpdateQuantity} 
      />
      <div>
      <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginRight: '1rem', marginTop: '1rem' }}>
        Checkout
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleClearCart} style={{ marginRight: '1rem', marginTop: '1rem' }}
        
      >
        Clear Cart
      </Button>
      </div>
    </Container>
  );
};

export default CartPage;