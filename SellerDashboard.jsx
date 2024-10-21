import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellerDashboard() {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    // Fetch seller's products
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/seller/products`, {
          headers: { Authorization: `Bearer ${token}` } // Corrected the use of template literals and added quotes around 'Bearer'
        });
        setMyProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <h2>My Products</h2>
      <ul>
        {myProducts.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
      <button>Add New Product</button>
      {/* Add more seller-specific features like:
          - View sales statistics
          - Manage inventory
          - Handle orders
      */}
    </div>
  );
}

export default SellerDashboard;