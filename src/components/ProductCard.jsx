import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';

const ProductCard = ({ product, onAddToCart, cart = {} }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  
  useEffect(() => {
    setIsAddedToCart(Boolean(cart[product.id]));
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      onAddToCart(product, 1);
      toast.success(`${product.title} added to cart!`, { position: 'top-right' });
      setIsAddedToCart(true);
    }
  };

  const handleIncrementQuantity = () => {
    onAddToCart(product, 1);
  };

  const currentQuantity = cart[product.id]?.quantity || 0;

  return (
    <Card style={{ height: '360px', marginTop: '10px' }}>
      <CardContent>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '10px' }}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ))}
        </div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">{product.description}</Typography>

        {!isAddedToCart ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{ marginTop: '10px' }}
          >
            Add to Cart
          </Button>
        ) : (
          <>
            <Typography style={{ marginTop: '10px' }}>
              Quantity: {currentQuantity}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleIncrementQuantity}
              style={{ marginTop: '10px' }}
            >
              Add More
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
