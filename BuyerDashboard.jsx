import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuyerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch available products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <h2>Available Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
      {/* Add more buyer-specific features like:
          - Search/filter products
          - View order history
          - Manage shopping cart
      */}
    </div>
  );
}

export default BuyerDashboard;
