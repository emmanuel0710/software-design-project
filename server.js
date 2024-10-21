require('dotenv').config(); // Add this to use environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
// Example of a login function in api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Ensure this is correctly imported

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/login`, { email, password });
  return response.data;
};

export const register = async (firstname, lastname, email, password) => {
  const response = await axios.post(`${API_URL}/api/register`, { firstname, lastname, email, password });
  return response.data;
};

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User model (create a separate file for this in practice)
const User = mongoose.model('User', new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
}));

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    // Input validation
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    // Input validation
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error logging in' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password, userType } = req.body;
    // ... existing validation ...
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      userType
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    // ... error handling ...
  }
});

app.post('/api/login', async (req, res) => {
  try {
    // ... existing authentication logic ...
    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
    res.send({ token, userType: user.userType });
  } catch (error) {
    // ... error handling ...
  }
});