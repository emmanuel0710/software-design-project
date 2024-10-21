import React, { useState } from 'react';
// import { register } from '../services/api';
import {register} from '../../public/server'

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const result = await register(firstname, lastname, email, password);
      console.log(result);
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };

  <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
  <option value="">Select User Type</option>
  <option value="buyer">Buyer</option>
  <option value="seller">Seller</option>
</select>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="Firstname"
        required
      />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Lastname"
        required
      />
      <input
        type="email"
 value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;