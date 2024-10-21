import React, { useState } from 'react';
import axios from 'axios';

function PostProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`, 
        { name, description, price },
        { headers: { Authorization: `Bearer ${token}` } }  // Corrected syntax
      );
      alert('Product posted successfully!');
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error posting product:', error);
      alert('Failed to post product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post a Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Post Product</button>
      </form>
    </div>
  );
}

export default PostProduct;
