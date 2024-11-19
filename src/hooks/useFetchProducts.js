import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = (page, limit = 9, searchQuery = '') => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://dummyjson.com/products/search', {
          params: {
            skip: (page - 1) * limit, 
            limit, 
            q: searchQuery,
          },
        });

        setProducts(data.products);
        setTotal(data.total); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, searchQuery]);

  return { products, total, loading, error };
};

export default useFetchProducts;
