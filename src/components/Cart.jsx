import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = ({ cart, onRemoveItem, onUpdateQuantity }) => {
  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);
  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h5">Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in the cart.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => onRemoveItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={`Price: $${item.price * item.quantity}`}
                />
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = Math.max(1, Number(e.target.value)); 
                    onUpdateQuantity(item.id, newQuantity);
                  }}
                  inputProps={{ min: 1 }} 
                  style={{ width: '60px', marginLeft: '16px' }}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" style={{ marginTop: '1rem' }}>
            Total Cart Value: ${totalCartValue.toFixed(2)}
          </Typography>
        </>
      )}
    </div>
  );
};

export default Cart;